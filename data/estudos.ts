/**
 * Temas de estudo atuais. Cada item precisa de fonte pública verificada.
 * date: AAAA-MM-DD.
 */
export type EstudoLink = {
  label: string;
  href: string;
};

export type Estudo = {
  title: string;
  resumo: string;
  tema: string;
  date: string;
  links: EstudoLink[];
};

export const estudos: Estudo[] = [
  {
    title: "PMBOK 8: os 40 processos",
    resumo:
      "Estudo dos 40 processos do Guia PMBOK® 8 no fluxo interativo: relações entre processos e fluxos próprios. A 8ª edição do guia foi publicada pelo PMI em novembro de 2025.",
    tema: "PMBOK",
    date: "2026-10-15",
    links: [
      {
        label: "Fluxo interativo",
        href: "https://rodrigochavesoa.github.io/pmbok8-interactive-flow/",
      },
      {
        label: "PMI",
        href: "https://www.pmi.org/standards/pmbok",
      },
    ],
  },
  {
    title: "Data centers do Ceará como modelo para o Nordeste",
    resumo:
      "O ministro Frederico Siqueira disse que o governo quer levar o modelo de data centers do Ceará ao Nordeste, com energia renovável, cabos submarinos em Fortaleza e o Redata. Estudos da FGV citados na reportagem estimam até R$ 25 bilhões mobilizados por um data center de IA no Pecém.",
    tema: "Data centers",
    date: "2026-10-13",
    links: [
      {
        label: "O POVO",
        href: "https://www.opovo.com.br/noticias/economia/2026/10/13/governo-quer-replicar-modelo-de-data-centers-do-ce-em-todo-o-ne.html",
      },
    ],
  },
  {
    title: "JDK 27 em disponibilidade geral",
    resumo:
      "O JDK 27 chegou ao GA em 15 de setembro de 2026. A página do OpenJDK lista, entre as mudanças, o G1 como coletor de lixo padrão em todos os ambientes e cabeçalhos de objeto compactos por padrão.",
    tema: "Java",
    date: "2026-09-15",
    links: [
      {
        label: "OpenJDK",
        href: "https://openjdk.org/projects/jdk/27/",
      },
    ],
  },
  {
    title: "AI Skills for Real Engineers",
    resumo:
      "Material de Matt Pocock com skills de IA para engenheiros. A página documenta a instalação com npx skills e registra a versão 1.3 em 5 de outubro de 2026.",
    tema: "IA",
    date: "2026-10-05",
    links: [
      {
        label: "AI Hero",
        href: "https://www.aihero.dev/skills",
      },
    ],
  },
];
