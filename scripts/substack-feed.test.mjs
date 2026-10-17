import assert from "node:assert/strict";
import test from "node:test";

import {
  feedUrlFromEnv,
  isSubstackPost,
  parseFeed,
  parseFeedDocument,
  RSS2JSON_FEED_URL,
  syncPlan,
} from "./substack-feed.mjs";

const post = (link, extra = {}) => ({
  title: "Post",
  resumo: "Resumo",
  date: "2026-10-01",
  link,
  image: null,
  ...extra,
});

function feed(items) {
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Rodrigo</title><image><url>https://example.com/avatar.png</url></image>${items}</channel></rss>`;
}

test("extrai título, resumo, data, link e imagem de um post", () => {
  const xml = feed(`
    <item>
      <title><![CDATA[Olá &amp; mundo]]></title>
      <description><![CDATA[<p>Texto &#8217; curto &amp; claro</p>]]></description>
      <link>https://rodrigocoa.substack.com/p/ola-mundo?utm_source=rss</link>
      <guid isPermaLink="false">https://rodrigocoa.substack.com/p/ola-mundo</guid>
      <pubDate>Wed, 14 Oct 2026 12:04:05 GMT</pubDate>
      <enclosure url="https://substackcdn.com/image/fetch/cover.png" length="0" type="image/png"/>
    </item>
  `);
  const posts = parseFeed(xml);
  assert.equal(posts.length, 1);
  assert.deepEqual(posts[0], {
    title: "Olá & mundo",
    resumo: "Texto ’ curto & claro",
    date: "2026-10-14",
    link: "https://rodrigocoa.substack.com/p/ola-mundo",
    image: "https://substackcdn.com/image/fetch/cover.png",
  });
});

test("ignora pixel de rastreamento e mantém capa larga", () => {
  const xml = feed(`
    <item>
      <title>Com capa</title>
      <description>Resumo</description>
      <link>https://rodrigocoa.substack.com/p/com-capa</link>
      <pubDate>Fri, 16 Oct 2026 10:00:00 GMT</pubDate>
      <content:encoded><![CDATA[
        <img src="https://example.com/pixel.gif" width="1" height="1" />
        <img src="https://substackcdn.com/image/fetch/cover.png" width="1456" height="104" />
      ]]></content:encoded>
    </item>
  `);
  assert.equal(
    parseFeed(xml)[0].image,
    "https://substackcdn.com/image/fetch/cover.png",
  );
});

test("usa a imagem do conteúdo quando o enclosure é áudio", () => {
  const xml = feed(`
    <item>
      <title>Episódio</title>
      <description><![CDATA[Resumo do episódio]]></description>
      <link>https://rodrigocoa.substack.com/p/episodio</link>
      <pubDate>Thu, 15 Oct 2026 08:00:00 GMT</pubDate>
      <enclosure url="https://api.substack.com/feed/podcast/1/a.mp3" type="audio/mpeg"/>
      <content:encoded><![CDATA[<img src="https://substackcdn.com/image/fetch/ep.png" />]]></content:encoded>
    </item>
  `);
  const posts = parseFeed(xml);
  assert.equal(posts[0].image, "https://substackcdn.com/image/fetch/ep.png");
});

test("não deixa Notes nem itens que não são posts", () => {
  const xml = feed(`
    <item>
      <title>Post de verdade</title>
      <description>Resumo</description>
      <link>https://rodrigocoa.substack.com/p/de-verdade</link>
      <pubDate>Fri, 16 Oct 2026 10:00:00 GMT</pubDate>
    </item>
    <item>
      <title>Uma note</title>
      <description>não entra</description>
      <link>https://substack.com/@rodrigocoa/note/c-123</link>
      <pubDate>Fri, 16 Oct 2026 11:00:00 GMT</pubDate>
    </item>
    <item>
      <title>Note com cara de post</title>
      <description>não entra</description>
      <link>https://rodrigocoa.substack.com/p/disfarce</link>
      <category>note</category>
      <pubDate>Fri, 16 Oct 2026 12:00:00 GMT</pubDate>
    </item>
    <item>
      <title>Página</title>
      <description>não entra</description>
      <link>https://rodrigocoa.substack.com/about</link>
      <pubDate>Fri, 16 Oct 2026 13:00:00 GMT</pubDate>
    </item>
  `);
  const posts = parseFeed(xml);
  assert.deepEqual(
    posts.map((item) => item.link),
    ["https://rodrigocoa.substack.com/p/de-verdade"],
  );
  assert.equal(
    isSubstackPost({
      link: "https://rodrigocoa.substack.com/note/c-9",
      categories: [],
    }),
    false,
  );
});

test("feed sem itens gera lista vazia", () => {
  assert.deepEqual(parseFeed(feed("")), []);
});

test("SUBSTACK_FEED_URL vazia cai no rss2json", () => {
  assert.equal(feedUrlFromEnv({}), RSS2JSON_FEED_URL);
  assert.equal(feedUrlFromEnv({ SUBSTACK_FEED_URL: "  " }), RSS2JSON_FEED_URL);
  assert.equal(
    feedUrlFromEnv({ SUBSTACK_FEED_URL: " https://worker.example/feed " }),
    "https://worker.example/feed",
  );
});

test("normaliza o JSON do rss2json para o formato dos posts", () => {
  const posts = parseFeedDocument(
    JSON.stringify({
      status: "ok",
      items: [
        {
          title: "Fork, PR e Code Review na prática.",
          link: "https://rodrigocoa.substack.com/p/fork-pr?utm_source=rss",
          pubDate: "Sat, 17 Oct 2026 01:08:12 GMT",
          description: "<p>Toda vez que eu ia contribuir.</p>",
          thumbnail: "https://substackcdn.com/image/fetch/cover.png",
        },
        {
          title: "Uma note",
          link: "https://substack.com/@rodrigocoa/note/c-1",
          pubDate: "Sat, 17 Oct 2026 02:00:00 GMT",
          description: "não entra",
          thumbnail: "",
        },
        {
          title: "Note categorizada",
          link: "https://rodrigocoa.substack.com/p/disfarce",
          pubDate: "Sat, 17 Oct 2026 03:00:00 GMT",
          description: "não entra",
          thumbnail: "",
          categories: ["note"],
        },
      ],
    }),
  );
  assert.deepEqual(posts, [
    {
      title: "Fork, PR e Code Review na prática.",
      resumo: "Toda vez que eu ia contribuir.",
      date: "2026-10-17",
      link: "https://rodrigocoa.substack.com/p/fork-pr",
      image: "https://substackcdn.com/image/fetch/cover.png",
    },
  ]);
});

test("thumbnail vazio vira imagem ausente", () => {
  const posts = parseFeedDocument(
    JSON.stringify({
      status: "ok",
      items: [
        {
          title: "Sem capa",
          link: "https://rodrigocoa.substack.com/p/sem-capa",
          pubDate: "2026-10-17 01:08:12",
          description: "Resumo",
          thumbnail: "  ",
        },
      ],
    }),
  );
  assert.equal(posts[0].image, null);
  assert.equal(posts[0].date, "2026-10-17");
});

test("rejeita erro do rss2json", () => {
  assert.throws(
    () => parseFeedDocument(JSON.stringify({ status: "error", message: "Internal error" })),
    /Internal error/,
  );
});

test("aceita o XML do feed quando a URL é um proxy", () => {
  const xml = feed(`
    <item>
      <title>Post via worker</title>
      <description>Resumo do proxy</description>
      <link>https://rodrigocoa.substack.com/p/via-worker</link>
      <pubDate>Fri, 16 Oct 2026 10:00:00 GMT</pubDate>
    </item>
  `);
  assert.deepEqual(parseFeedDocument(xml), [
    {
      title: "Post via worker",
      resumo: "Resumo do proxy",
      date: "2026-10-16",
      link: "https://rodrigocoa.substack.com/p/via-worker",
      image: null,
    },
  ]);
});

test("não regrava quando não há post novo", () => {
  const current = [post("https://rodrigocoa.substack.com/p/a", { resumo: "antes" })];
  const edited = [post("https://rodrigocoa.substack.com/p/a", { resumo: "depois" })];
  const removed = syncPlan(
    [post("https://rodrigocoa.substack.com/p/a"), post("https://rodrigocoa.substack.com/p/b")],
    [post("https://rodrigocoa.substack.com/p/a")],
  );
  assert.equal(syncPlan(current, edited).posts, null);
  assert.equal(syncPlan(current, current).added.length, 0);
  assert.equal(removed.posts, null);
});

test("acumula o post novo e mantém os que saíram do feed", () => {
  const previous = [
    post("https://rodrigocoa.substack.com/p/antigo", {
      date: "2026-09-01",
      resumo: "antes",
    }),
    post("https://rodrigocoa.substack.com/p/saiu", {
      date: "2026-10-10",
      resumo: "arquivado",
    }),
  ];
  const fresh = [
    post("https://rodrigocoa.substack.com/p/novo", { date: "2026-10-16" }),
    post("https://rodrigocoa.substack.com/p/antigo?utm=1", {
      date: "2026-09-01",
      resumo: "atualizado",
    }),
  ];
  const plan = syncPlan(previous, fresh);
  assert.equal(plan.added.length, 1);
  assert.equal(plan.added[0].link, "https://rodrigocoa.substack.com/p/novo");
  assert.deepEqual(
    plan.posts.map((item) => [item.link, item.resumo]),
    [
      ["https://rodrigocoa.substack.com/p/novo", "Resumo"],
      ["https://rodrigocoa.substack.com/p/saiu", "arquivado"],
      ["https://rodrigocoa.substack.com/p/antigo", "antes"],
    ],
  );
});
