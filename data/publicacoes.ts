import rawPosts from "./publicacoes.json";

/**
 * Posts do Substack em `publicacoes.json`, seguidos dos cards fixos.
 * A home mostra só os 4 mais recentes. O JSON e o sync guardam o histórico.
 */

export const SUBSTACK_HOME = "https://rodrigocoa.substack.com";
const LIMITE_SUBSTACK = 4;
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

export type Publicacao = {
  title: string;
  resumo: string;
  tema: string;
  links: PublicacaoLink[];
  date?: string;
  link?: string;
  image?: string | null;
};

const fixas: Publicacao[] = [
  {
    title: "TabNews",
    tema: "TabNews",
    resumo:
      "Perfil rodrigocoa e a lista de conteúdos publicados. Entre os textos estão o pitch do Fluxo PMBOK 8 Interativo e o Colab PDF Reader, projeto open source.",
    links: [
      { label: "Perfil", href: "https://www.tabnews.com.br/rodrigocoa" },
      {
        label: "Conteúdos",
        href: "https://www.tabnews.com.br/rodrigocoa/conteudos/1",
      },
    ],
  },
  {
    title: "DevHub",
    tema: "Comunidade",
    resumo:
      "Faço parte da comunidade DevHub, com publicações e projetos open source. O site reúne a comunidade, cursos, vagas, eventos e projetos abertos.",
    links: [{ label: "DevHub", href: "https://algoritmoecafe.com/" }],
  },
];

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

const substack: Publicacao[] = (Array.isArray(posts) ? posts : [])
  .filter(isSubstackPost)
  .map((post) => ({
    title: post.title,
    resumo: post.resumo,
    date: post.date,
    link: post.link,
    image: post.image,
    tema: "Substack",
    links: [{ label: "Ler", href: post.link }],
  }))
  .sort((a, b) => {
    const aDate = a.date ?? "";
    const bDate = b.date ?? "";
    if (aDate !== bDate) return aDate < bDate ? 1 : -1;
    return (a.link ?? "").localeCompare(b.link ?? "");
  });

export const verTodosPublicacoes = substack.length > 3;

export const publicacoes: Publicacao[] = [
  ...substack.slice(0, LIMITE_SUBSTACK),
  ...fixas,
];
