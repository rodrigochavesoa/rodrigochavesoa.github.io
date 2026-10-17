/**
 * Lê o RSS do Substack e devolve só posts.
 * Notes (URL /note ou categoria note) ficam de fora.
 */

const SUMMARY_LIMIT = 320;

const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

export const FEED_URL = "https://rodrigocoa.substack.com/feed";

export function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, body) => {
    if (body[0] === "#") {
      const hex = body[1] === "x" || body[1] === "X";
      const code = hex ? Number.parseInt(body.slice(2), 16) : Number.parseInt(body.slice(1), 10);
      if (!Number.isFinite(code)) return entity;
      try {
        return String.fromCodePoint(code);
      } catch {
        return entity;
      }
    }
    return NAMED_ENTITIES[body.toLowerCase()] ?? entity;
  });
}

export function plainText(html) {
  const withoutBlocks = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  const text = decodeEntities(withoutBlocks).replace(/\s+/g, " ").trim();
  if (text.length <= SUMMARY_LIMIT) return text;
  const cut = text.slice(0, SUMMARY_LIMIT);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > 200 ? cut.slice(0, lastSpace) : cut;
  return `${base.trimEnd()}…`;
}

export function canonicalLink(href) {
  const url = new URL(String(href).trim());
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Link inválido");
  }
  url.hash = "";
  url.search = "";
  const pathname = url.pathname.replace(/\/+$/, "");
  if (!pathname) throw new Error("Link inválido");
  return `${url.origin}${pathname}`;
}

function unwrapCdata(raw) {
  const trimmed = raw.trim();
  const cdata = trimmed.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  return cdata ? cdata[1].trim() : trimmed;
}

function tagValue(block, tag) {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i");
  const match = block.match(re);
  if (!match) return "";
  return unwrapCdata(match[1]);
}

function attrValue(source, name) {
  const match = source.match(new RegExp(`${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"));
  if (!match) return "";
  return decodeEntities(match[1] ?? match[2] ?? "");
}

function categoriesOf(block) {
  const categories = [];
  const re = /<category\b[^>]*>([\s\S]*?)<\/category>/gi;
  for (const match of block.matchAll(re)) {
    const value = decodeEntities(unwrapCdata(match[1])).trim();
    if (value) categories.push(value);
  }
  return categories;
}

function enclosureOf(block) {
  const match = block.match(/<enclosure\b([^>]*)\/?>/i);
  if (!match) return null;
  const url = attrValue(match[1], "url");
  if (!url) return null;
  return { url, type: attrValue(match[1], "type").toLowerCase() };
}

function isImageRef(url, type = "") {
  if (type.startsWith("image/")) return true;
  return /\.(avif|gif|jpe?g|png|webp)(?:$|\?)/i.test(url);
}

function dimension(tag, name) {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:"(\\d+)"|'(\\d+)'|(\\d+))`, "i"),
  );
  if (!match) return null;
  return match[1] ?? match[2] ?? match[3];
}

function isTrackingPixel(tag) {
  return dimension(tag, "width") === "1" && dimension(tag, "height") === "1";
}

function firstImageSrc(html) {
  const re = /<img\b[^>]*?\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)')[^>]*>/gi;
  for (const match of html.matchAll(re)) {
    const src = decodeEntities(match[1] ?? match[2] ?? "").trim();
    if (!src || src.startsWith("data:")) continue;
    if (isTrackingPixel(match[0])) continue;
    return src;
  }
  return null;
}

function imageOf(block, description, content) {
  const enclosure = enclosureOf(block);
  if (enclosure && isImageRef(enclosure.url, enclosure.type)) return enclosure.url;
  return firstImageSrc(content) ?? firstImageSrc(description);
}

function isoDate(pubDate) {
  const time = Date.parse(pubDate);
  if (Number.isNaN(time)) return null;
  return new Date(time).toISOString().slice(0, 10);
}

export function isSubstackPost(item) {
  const hrefs = `${item.link} ${item.guid ?? ""}`;
  if (/\/notes?(?:\/|$)/i.test(hrefs)) return false;
  if ((item.categories ?? []).some((category) => /^notes?$/i.test(category.trim()))) {
    return false;
  }
  try {
    const url = new URL(item.link);
    return /^\/p\/[^/]+$/.test(url.pathname.replace(/\/+$/, ""));
  } catch {
    return false;
  }
}

function parseItem(block) {
  const title = plainText(tagValue(block, "title"));
  const linkRaw = tagValue(block, "link");
  const description = tagValue(block, "description");
  const content = tagValue(block, "content:encoded");
  const date = isoDate(tagValue(block, "pubDate"));
  let link = "";
  try {
    link = canonicalLink(linkRaw);
  } catch {
    link = "";
  }
  return {
    title,
    link,
    guid: tagValue(block, "guid"),
    categories: categoriesOf(block),
    date,
    resumo: plainText(description) || plainText(content),
    image: imageOf(block, description, content),
  };
}

export function parseFeed(xml) {
  if (typeof xml !== "string" || !/<(rss|feed)\b/i.test(xml)) {
    throw new Error("A resposta não é um feed RSS.");
  }
  const blocks = xml.match(/<item\b[^>]*>[\s\S]*?<\/item>/gi) ?? [];
  const posts = [];
  const seen = new Set();
  for (const block of blocks) {
    const item = parseItem(block);
    if (!item.title || !item.link || !item.date) continue;
    if (!isSubstackPost(item)) continue;
    if (seen.has(item.link)) continue;
    seen.add(item.link);
    posts.push({
      title: item.title,
      resumo: item.resumo,
      date: item.date,
      link: item.link,
      image: item.image,
    });
  }
  posts.sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.link.localeCompare(b.link);
  });
  return posts;
}

export function findNewPosts(previous, fresh) {
  const known = new Set();
  for (const post of previous ?? []) {
    if (!post || typeof post.link !== "string") continue;
    try {
      known.add(canonicalLink(post.link));
    } catch {
      known.add(post.link);
    }
  }
  return fresh.filter((post) => {
    if (!post || typeof post.link !== "string") return false;
    try {
      return !known.has(canonicalLink(post.link));
    } catch {
      return !known.has(post.link);
    }
  });
}

/** `posts` é a lista atual só quando existe post novo. Caso contrário, null: não regravar. */
export function syncPlan(previous, fresh) {
  const added = findNewPosts(previous, fresh);
  return { added, posts: added.length > 0 ? fresh : null };
}
