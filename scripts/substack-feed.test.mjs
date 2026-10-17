import assert from "node:assert/strict";
import test from "node:test";

import { isSubstackPost, parseFeed, syncPlan } from "./substack-feed.mjs";

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

test("grava a lista inteira quando entra um post novo", () => {
  const previous = [post("https://rodrigocoa.substack.com/p/antigo")];
  const fresh = [
    post("https://rodrigocoa.substack.com/p/novo", { date: "2026-10-16" }),
    post("https://rodrigocoa.substack.com/p/antigo?utm=1", { resumo: "atualizado" }),
  ];
  const plan = syncPlan(previous, fresh);
  assert.equal(plan.added.length, 1);
  assert.equal(plan.added[0].link, "https://rodrigocoa.substack.com/p/novo");
  assert.equal(plan.posts.length, 2);
  assert.equal(plan.posts[1].resumo, "atualizado");
});
