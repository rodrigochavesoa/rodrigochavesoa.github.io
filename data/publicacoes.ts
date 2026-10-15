export type PublicacaoLink = {
  label: string;
  href: string;
};

export type Publicacao = {
  title: string;
  resumo: string;
  tema: string;
  links: PublicacaoLink[];
};

export const publicacoes: Publicacao[] = [
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
