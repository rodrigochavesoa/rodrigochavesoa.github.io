/**
 * Busca o feed do Substack por um intermediário e grava data/publicacoes.json
 * apenas quando entra pelo menos um post novo.
 */
import { appendFileSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { feedUrlFromEnv, parseFeedDocument, syncPlan } from "./substack-feed.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(repoRoot, "data", "publicacoes.json");

function setOutput(key, value) {
  const output = process.env.GITHUB_OUTPUT;
  if (!output) return;
  appendFileSync(output, `${key}=${value}\n`);
}

function readPosts(file) {
  let raw;
  try {
    raw = readFileSync(file, "utf8");
  } catch (error) {
    if (error && error.code === "ENOENT") return [];
    throw error;
  }
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error("data/publicacoes.json precisa ser um array.");
  }
  return parsed;
}

function writePosts(file, posts) {
  const tmp = `${file}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(posts, null, 2)}\n`);
  renameSync(tmp, file);
}

async function fetchFeed(url) {
  const response = await fetch(url, {
    headers: {
      accept: "application/rss+xml, application/xml, text/xml, application/json",
      "user-agent": "rodrigochavesoa-portfolio (substack sync)",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) {
    throw new Error(`Feed respondeu HTTP ${response.status}.`);
  }
  return response.text();
}

export async function syncSubstackPosts({
  feedUrl = feedUrlFromEnv(),
  file = dataPath,
  fetchFeed: loadFeed = fetchFeed,
} = {}) {
  console.log(
    process.env.SUBSTACK_FEED_URL?.trim()
      ? "Lendo o feed em SUBSTACK_FEED_URL."
      : "Lendo o feed padrão do rss2json.",
  );
  const previous = readPosts(file);
  const fresh = parseFeedDocument(await loadFeed(feedUrl));
  const plan = syncPlan(previous, fresh);
  setOutput("new_posts", String(plan.added.length));
  if (!plan.posts) {
    console.log("Nenhum post novo. data/publicacoes.json mantido.");
    return plan;
  }
  writePosts(file, plan.posts);
  console.log(
    `${plan.added.length} post(s) novo(s). ${plan.posts.length} post(s) em data/publicacoes.json.`,
  );
  return plan;
}

const isDirectRun =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  syncSubstackPosts().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
