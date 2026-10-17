# Rodrigo Chaves

Site da comunidade @colabdeveloper em [https://rodrigochavesoa.github.io/](https://rodrigochavesoa.github.io/). A página sobre o Rodrigo fica em `/about/`. Os temas de estudo atuais ficam em `data/estudos.ts`. As publicações vêm de `data/publicacoes.json`, gerado a partir do feed do Substack.

Next.js (App Router) com export estático, TypeScript, Tailwind e shadcn/ui. A identidade visual é a do @colabdeveloper.

## Scripts

```bash
npm install
npm run dev
npm run build
```

`npm run build` gera a pasta `out/`.

## GitHub Pages

O workflow `.github/workflows/pages.yml` faz o build e publica com `actions/deploy-pages`. O arquivo `public/.nojekyll` entra no export, e o workflow também cria `out/.nojekyll`.

O workflow `.github/workflows/substack.yml` roda todo dia às 09:00 (horário da Bahia) e também quando disparado manualmente. Ele não chama o Substack direto, porque o Cloudflare responde 403 aos IPs do GitHub Actions. Sem `SUBSTACK_FEED_URL`, a leitura usa `https://api.rss2json.com/v1/api.json?rss_url=https://rodrigocoa.substack.com/feed`. A variável ou o secret com esse nome, em Settings → Secrets and variables → Actions, troca o endereço por um proxy seu.

A resposta pode ser o XML do feed ou o JSON do rss2json (`items` com `title`, `link`, `pubDate`, `description` e `thumbnail`). Os dois viram o mesmo `data/publicacoes.json`. Notes ficam de fora. O workflow só faz commit quando entra um post novo, sem apagar os que já saíram do feed, e então dispara o deploy do Pages. Os cards de TabNews e DevHub permanecem na seção, depois dos posts.

Exemplo de Cloudflare Worker que só repassa o feed, com cache de 1 hora:

```js
export default {
  async fetch() {
    const upstream = await fetch("https://rodrigocoa.substack.com/feed", {
      cf: { cacheEverything: true, cacheTtl: 3600 },
    });
    const headers = new Headers(upstream.headers);
    headers.set("cache-control", "public, max-age=3600");
    return new Response(upstream.body, { status: upstream.status, headers });
  },
};
```

A URL publicada desse Worker entra em `SUBSTACK_FEED_URL`.

Para o site ir ao ar:

1. Settings → Pages → **Source: GitHub Actions**.
2. Settings → Actions → permitir Actions neste repositório.
3. Fazer merge deste PR na branch `main`.

Não há `basePath`: o site é a raiz do domínio do usuário.
