# Rodrigo Chaves

Site da comunidade @colabdeveloper em [https://rodrigochavesoa.github.io/](https://rodrigochavesoa.github.io/). A página sobre o Rodrigo fica em `/about/`. Os temas de estudo atuais ficam em `data/estudos.ts`. As publicações ficam em `data/publicacoes.ts`.

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

Para o site ir ao ar:

1. Settings → Pages → **Source: GitHub Actions**.
2. Settings → Actions → permitir Actions neste repositório.
3. Fazer merge deste PR na branch `main`.

Não há `basePath`: o site é a raiz do domínio do usuário.
