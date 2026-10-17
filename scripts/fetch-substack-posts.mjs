/**
 * Busca o feed do Substack e grava data/publicacoes.json
 * apenas quando entra pelo menos um post novo.
 */
import { execFile } from "node:child_process";
import { appendFileSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

import { FEED_URL, parseFeed, syncPlan } from "./substack-feed.mjs";

const execFileAsync = promisify(execFile);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(repoRoot, "data", "publicacoes.json");
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const ACCEPT = "application/rss+xml, application/xml, text/xml, */*;q=0.8";

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

async function fetchFeedWithCurl(url) {
  const curl = process.platform === "win32" ? "curl.exe" : "curl";
  let stdout;
  try {
    ({ stdout } = await execFileAsync(
      curl,
      [
        "-sS",
        "-L",
        "--max-time",
        "20",
        "-A",
        USER_AGENT,
        "-H",
        `Accept: ${ACCEPT}`,
        "-H",
        "Accept-Language: pt-BR,pt;q=0.9,en;q=0.8",
        "-w",
        "\n__HTTP_STATUS__:%{http_code}",
        url,
      ],
      { maxBuffer: 8 * 1024 * 1024, encoding: "utf8" },
    ));
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`curl não conseguiu ler o feed. ${detail}`);
  }
  const marker = stdout.lastIndexOf("\n__HTTP_STATUS__:");
  if (marker === -1) throw new Error("curl não devolveu o status HTTP.");
  const status = Number(stdout.slice(marker + "\n__HTTP_STATUS__:".length).trim());
  const body = stdout.slice(0, marker);
  if (!Number.isInteger(status) || status < 200 || status >= 300) {
    const snippet = body.replace(/\s+/g, " ").trim().slice(0, 180);
    throw new Error(
      `Feed respondeu HTTP ${status || "desconhecido"}${snippet ? `: ${snippet}` : "."}`,
    );
  }
  console.log("Feed obtido via curl.");
  return body;
}

async function fetchFeedWithBrowser(url) {
  const require = createRequire(path.join(process.env.PLAYWRIGHT_PREFIX, "package.json"));
  const { chromium } = require("playwright-core");
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH,
    headless: true,
    ignoreDefaultArgs: ["--enable-automation"],
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-blink-features=AutomationControlled"],
  });
  try {
    const page = await browser.newPage({ userAgent: USER_AGENT });
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => undefined });
    });
    const bodies = [];
    page.on("response", (response) => {
      const type = response.headers()["content-type"] || "";
      console.log(`resposta ${response.status()} ${type} ${response.url().slice(0, 80)}`);
      if (response.status() === 200 && type.includes("xml")) {
        bodies.push(response.text().catch(() => ""));
      }
    });
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      console.log(`navegação: ${detail}`);
    }
    await page
      .waitForFunction(() => !document.title.includes("Just a moment"), { timeout: 25_000 })
      .catch(() => {});
    const started = Date.now();
    let xml = "";
    while (!xml.includes("<rss") && Date.now() - started < 15_000) {
      const chunks = await Promise.all(bodies.splice(0, bodies.length));
      xml = chunks.find((chunk) => chunk.includes("<rss")) ?? "";
      if (!xml) {
        const html = await page.content();
        const start = html.indexOf("<rss");
        const end = html.lastIndexOf("</rss>");
        if (start !== -1 && end > start) xml = html.slice(start, end + "</rss>".length);
      }
      if (!xml) await page.waitForTimeout(500);
    }
    if (!xml.includes("<rss")) {
      const title = await page.title().catch(() => "");
      throw new Error(`O navegador não conseguiu passar o desafio do Cloudflare (${title}).`);
    }
    console.log("Feed obtido via navegador.");
    return xml;
  } finally {
    await browser.close();
  }
}

async function fetchFeed(url) {
  try {
    const response = await fetch(url, {
      headers: {
        accept: ACCEPT,
        "accept-language": "pt-BR,pt;q=0.9,en;q=0.8",
        "user-agent": USER_AGENT,
      },
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
    });
    if (response.ok) {
      console.log("Feed obtido via fetch.");
      return response.text();
    }
    console.log(`fetch respondeu HTTP ${response.status}. Tentando curl.`);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.log(`fetch falhou (${detail}). Tentando curl.`);
  }
  try {
    return await fetchFeedWithCurl(url);
  } catch (error) {
    if (!process.env.CHROME_PATH || !process.env.PLAYWRIGHT_PREFIX) throw error;
    const detail = error instanceof Error ? error.message : String(error);
    console.log(`${detail} Tentando o navegador.`);
    return fetchFeedWithBrowser(url);
  }
}

export async function syncSubstackPosts({
  feedUrl = FEED_URL,
  file = dataPath,
  fetchFeed: loadFeed = fetchFeed,
} = {}) {
  const previous = readPosts(file);
  const fresh = parseFeed(await loadFeed(feedUrl));
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
