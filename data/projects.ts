/**
 * Projetos publicados.
 * Fixados em github.com/rodrigochavesoa (2026-10-15), o site Colab Developer
 * e o STAFF - Guia de Exercícios (repositório privado, site no ar).
 * Descrições a partir dos textos públicos. Sem texto inventado.
 */

export type ProjectSite = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  repo: string | null;
  description: string;
  language: string | null;
  stars: number | null;
  repoUrl: string | null;
  sites: ProjectSite[];
  featured: boolean;
  privateRepo: boolean;
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
    sites: [
      {
        label: "Site",
        href: "https://rodrigochavesoa.github.io/Colab_Developer/",
      },
    ],
    featured: true,
    privateRepo: false,
  },
  {
    name: "STAFF - Guia de Exercícios",
    repo: null,
    description:
      "Guia de exercícios com busca por nome, grupo ou código, e fichas de treino online. Na STAFF os planos são personalizados de musculação e corrida, com suporte e treinos também pelo WhatsApp.",
    language: null,
    stars: null,
    repoUrl: null,
    sites: [
      { label: "STAFF", href: "https://rcstorestaff.com.br/staff" },
      { label: "Guia", href: "https://rcstorestaff.com.br/" },
    ],
    featured: false,
    privateRepo: true,
  },
  {
    name: "split-payment-simulation",
    repo: "split-payment-simulation",
    description:
      "Simulador determinístico de impacto de caixa para cenários de Split Payment.",
    language: "Java",
    stars: 4,
    repoUrl: "https://github.com/rodrigochavesoa/split-payment-simulation",
    sites: [],
    featured: false,
    privateRepo: false,
  },
  {
    name: "colab-pdf-reader",
    repo: "colab-pdf-reader",
    description:
      "Leia com inteligência. Traduza instantaneamente. Nunca perca seu progresso.",
    language: "JavaScript",
    stars: 6,
    repoUrl: "https://github.com/rodrigochavesoa/colab-pdf-reader",
    sites: [],
    featured: false,
    privateRepo: false,
  },
  {
    name: "gdg-lauro-de-freitas",
    repo: "gdg-lauro-de-freitas",
    description:
      "GDGJobs é uma plataforma de vagas tech curada pela comunidade GDG, com matching progressivo e sem cobrança inicial para empresas anunciantes.",
    language: "JavaScript",
    stars: 0,
    repoUrl: "https://github.com/rodrigochavesoa/gdg-lauro-de-freitas",
    sites: [{ label: "Site", href: "https://gdg-lauro-de-freitas.vercel.app/" }],
    featured: false,
    privateRepo: false,
  },
  {
    name: "studylib-direct-pdf-downloader",
    repo: "studylib-direct-pdf-downloader",
    description:
      "Extensão de navegador que adiciona um botão às páginas de documentos do StudyLib. Após o clique, ela localiza um PDF associado ao documento e solicita o download pelo navegador.",
    language: "JavaScript",
    stars: 0,
    repoUrl: "https://github.com/rodrigochavesoa/studylib-direct-pdf-downloader",
    sites: [],
    featured: false,
    privateRepo: false,
  },
  {
    name: "pmbok8-interactive-flow",
    repo: "pmbok8-interactive-flow",
    description:
      "Fluxo PMBOK 8 interativo · @colabdeveloper. Uma ferramenta educacional para explorar os 40 processos do Guia PMBOK® 8, estudar suas relações e criar fluxos próprios.",
    language: "TypeScript",
    stars: 1,
    repoUrl: "https://github.com/rodrigochavesoa/pmbok8-interactive-flow",
    sites: [
      {
        label: "Site",
        href: "https://rodrigochavesoa.github.io/pmbok8-interactive-flow/",
      },
    ],
    featured: false,
    privateRepo: false,
  },
];

export function starsLabel(count: number) {
  return count === 1 ? "1 estrela no GitHub" : `${count} estrelas no GitHub`;
}
