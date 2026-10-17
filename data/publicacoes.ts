import rawPosts from "./publicacoes.json";

/**
 * Posts do Substack. `publicacoes.json` é gerado por
 * `scripts/fetch-substack-posts.mjs`. Lista vazia esconde a seção.
 */
export type PublicacaoLink = {
  label: string;
  href: string;
};

type SubstackPost = {
  title: string;
  resumo: string;
  date: string;
  link: string;
  image: string | null;
};

export type Publicacao = SubstackPost & {
  tema: string;
  links: PublicacaoLink[];
};

function isSubstackPost(value: unknown): value is SubstackPost {
  if (!value || typeof value !== "object") return false;
  const post = value as Record<string, unknown>;
  return (
    typeof post.title === "string" &&
    typeof post.resumo === "string" &&
    typeof post.date === "string" &&
    typeof post.link === "string" &&
    (typeof post.image === "string" || post.image === null)
  );
}

const posts: unknown = rawPosts;

export const publicacoes: Publicacao[] = (Array.isArray(posts) ? posts : [])
  .filter(isSubstackPost)
  .map((post) => ({
    title: post.title,
    resumo: post.resumo,
    date: post.date,
    link: post.link,
    image: post.image,
    tema: "Substack",
    links: [{ label: "Ler", href: post.link }],
  }));
