/**
 * Projetos do portfólio.
 * Fixados em github.com/rodrigochavesoa (GraphQL pinnedItems, 2026-10-15),
 * mais o Colab_Developer como card de destaque STAFF APP.
 * Descrições copiadas dos campos públicos. Sem texto inventado.
 */

export type Project = {
  name: string;
  repo: string;
  description: string;
  language: string;
  stars: number;
  repoUrl: string;
  siteUrl: string | null;
  featured: boolean;
};

export const projects: Project[] = [
  {
    name: "STAFF APP",
    repo: "Colab_Developer",
    description:
      "Website público da plataforma Colab Developer, hospedado em GitHub Pages.",
    language: "HTML",
    stars: 0,
    repoUrl: "https://github.com/rodrigochavesoa/Colab_Developer",
    siteUrl: "https://rodrigochavesoa.github.io/Colab_Developer/",
    featured: true,
  },
  {
    name: "split-payment-simulation",
    repo: "split-payment-simulation",
    description:
      "Simulador determinístico de impacto de caixa para cenários de Split Payment.",
    language: "Java",
    stars: 4,
    repoUrl: "https://github.com/rodrigochavesoa/split-payment-simulation",
    siteUrl: null,
    featured: false,
  },
  {
    name: "colab-pdf-reader",
    repo: "colab-pdf-reader",
    description:
      "Leia com inteligência. Traduza instantaneamente. Nunca perca seu progresso.",
    language: "JavaScript",
    stars: 6,
    repoUrl: "https://github.com/rodrigochavesoa/colab-pdf-reader",
    siteUrl: null,
    featured: false,
  },
  {
    name: "gdg-lauro-de-freitas",
    repo: "gdg-lauro-de-freitas",
    description:
      "GDGJobs é uma plataforma de vagas tech curada pela comunidade GDG, com matching progressivo e sem cobrança inicial para empresas anunciantes.",
    language: "JavaScript",
    stars: 0,
    repoUrl: "https://github.com/rodrigochavesoa/gdg-lauro-de-freitas",
    siteUrl: "https://gdg-lauro-de-freitas.vercel.app/",
    featured: false,
  },
  {
    name: "studylib-direct-pdf-downloader",
    repo: "studylib-direct-pdf-downloader",
    description:
      "Extensão de navegador que adiciona um botão às páginas de documentos do StudyLib. Após o clique, ela localiza um PDF associado ao documento e solicita o download pelo navegador.",
    language: "JavaScript",
    stars: 0,
    repoUrl: "https://github.com/rodrigochavesoa/studylib-direct-pdf-downloader",
    siteUrl: null,
    featured: false,
  },
  {
    name: "pmbok8-interactive-flow",
    repo: "pmbok8-interactive-flow",
    description:
      "Fluxo PMBOK 8 interativo · @colabdeveloper. Uma ferramenta educacional para explorar os 40 processos do Guia PMBOK® 8, estudar suas relações e criar fluxos próprios.",
    language: "TypeScript",
    stars: 1,
    repoUrl: "https://github.com/rodrigochavesoa/pmbok8-interactive-flow",
    siteUrl: null,
    featured: false,
  },
];

export function starsLabel(count: number) {
  return count === 1 ? "1 estrela no GitHub" : `${count} estrelas no GitHub`;
}
