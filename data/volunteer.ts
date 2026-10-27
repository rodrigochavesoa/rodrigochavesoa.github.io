export type VolunteerCertificate = {
  title: string;
  subtitle: string;
  badge: string;
  metric: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  date?: string;
};

export type VolunteerProject = {
  code: string;
  researcher: string;
  institution: string;
  target: string;
  photo: string;
  photoAlt: string;
  photoWidth: number;
  photoHeight: number;
  summary: string;
  details: string;
  projectUrl: string;
  labUrl: string;
};

export type VolunteerData = {
  kicker: string;
  title: string;
  highlightTitle: string;
  lead: string;
  paragraphs: string[];
  helpTitle: string;
  helpDescription: string;
  goalTitle: string;
  goalQuote: string;
  milestone: {
    badge: string;
    title: string;
    date: string;
    quote: string;
    description: string;
  };
  featuredProject: VolunteerProject;
  certificatesTitle: string;
  certificates: VolunteerCertificate[];
  previousCertificatesTitle: string;
  previousCertificates: VolunteerCertificate[];
  statsCard: {
    bannerImage: string;
    bannerAlt: string;
    statsImage: string;
    statsAlt: string;
    badge: string;
    donorName: string;
    points: string;
    wus: string;
    rank: string;
    donorUrl: string;
    projectUrl: string;
  };
};

export const volunteerData: VolunteerData = {
  kicker: "Volunteer",
  title: "Computação distribuída com Folding@home,",
  highlightTitle: "infraestrutura voluntária em prol da ciência e da saúde.",
  lead: "Disponibilização e gerenciamento de infraestrutura Linux ociosa para simulação e dinâmica molecular de proteínas em segundo plano.",
  paragraphs: [
    "Contribuição ativa com o projeto de computação distribuída liderado pelo consórcio de laboratórios acadêmicos globais (como o Bowman Lab da University of Pennsylvania). Atuo de forma voluntária na disponibilização, configuração e gerenciamento de infraestrutura Linux ociosa para o processamento de dinâmica molecular de proteínas em segundo plano.",
    "Como foco de engajamento a longo prazo, direciono voluntariamente o poder de processamento da minha infraestrutura prioritariamente para o consórcio de pesquisas de doenças neurodegenerativas do Folding@home, apoiando os projetos de simulação molecular voltados à Doença de Parkinson e Alzheimer, auxiliando diretamente a ciência biomédica global na descoberta de novos alvos terapêuticos.",
    "Atualmente, gerencio o processamento do Projeto 18291, aplicando simulações matemáticas complexas (motores GROMACS e modelos Amber14sb) no mapeamento da proteína VP35 do vírus Ebola.",
    "Em 27 de outubro de 2026, a conta colabdeveloper ultrapassou 1.000.000 de pontos no Folding@home, com 64 work units creditadas. O marco foi registrado no Projeto 18490, do Prof. Vincent Voelz, da Temple University, com alvo em câncer e no cálculo de logP — preditor de lipofilicidade e biodisponibilidade de fármacos.",
  ],
  helpTitle: "Ajude-nos a curar doenças",
  helpDescription:
    "Ajude o Folding@home a estudar proteínas em escalas minúsculas, recrutando seus amigos e familiares. Conte a eles sobre o projeto Folding@home e junte-se a uma equipe ou crie a sua própria. Quanto mais pontos sua equipe acumular, mais poderemos avançar na pesquisa de doenças como Parkinson, Alzheimer e câncer!",
  goalTitle: "Rumo a 10 Milhões de Pontos",
  goalQuote:
    "O primeiro milhão chegou. Agora buscamos os 10 milhões, porque cada milhão vale muito para quem precisa de uma cura.",
  milestone: {
    badge: "1 milhão alcançado",
    title: "1.000.000 de pontos em 27 de outubro de 2026",
    date: "2026-10-27",
    quote:
      "Estamos em busca do 1 Milhão porque sabemos que esse milhão vale muito para a quem precisa de uma cura.",
    description:
      "A conquista foi registrada no Projeto 18490, com 64 work units creditadas na conta colabdeveloper. A próxima meta é 10 milhões de pontos.",
  },
  featuredProject: {
    code: "Projeto 18490",
    researcher: "Prof. Vincent Voelz",
    institution: "Temple University",
    target: "Câncer",
    photo: "/volunteer/dr-vincent-voelz.png",
    photoAlt:
      "Prof. Vincent Voelz, da Temple University, pesquisador do Projeto 18490 no Folding@home",
    photoWidth: 432,
    photoHeight: 317,
    summary:
      "A pesquisa do Dr. Voelz usa novos métodos de simulação para entender e projetar função molecular, modelando o enovelamento e a ligação de proteínas, peptídeos e peptidomiméticos. O Voelz Lab participa do Folding@home e hospeda oito servidores na Temple University.",
    details:
      "Um dos desafios da descoberta computacional de fármacos é desenvolver e testar métodos para prever coeficientes de partição experimentais — a solubilidade relativa de moléculas orgânicas em meios aquosos versus não polares. O logaritmo do coeficiente de partição, logP, é um preditor importante de lipofilicidade, que determina a biodisponibilidade dos medicamentos. Este projeto em CPU testa simulações de ensemble expandido (EE) como método para o cálculo de logP.",
    projectUrl: "https://stats.foldingathome.org/project/18490",
    labUrl: "https://sites.temple.edu/voelzlab/",
  },
  certificatesTitle: "Certificados de 1.000.000 de pontos",
  certificates: [
    {
      title: "Certificado de Pontos",
      subtitle: "Reconhecimento oficial por 1.000.000 de pontos concluídos",
      badge: "1,000,000 Points Award",
      metric: "1M Pontos",
      image: "/volunteer/certificado-pontos-1m.jpg",
      alt: "Certificado Folding@home concedido a colabdeveloper por 1.000.000 de pontos concluídos em 27 de outubro de 2026",
      width: 640,
      height: 480,
      date: "2026-10-27",
    },
    {
      title: "Certificado de Work Units",
      subtitle: "Reconhecimento por 64 unidades de dinâmica molecular completadas",
      badge: "64 Work Units Award",
      metric: "64 WUs",
      image: "/volunteer/certificado-wus-64.jpg",
      alt: "Certificado Folding@home concedido a colabdeveloper por 64 work units processadas em 27 de outubro de 2026",
      width: 640,
      height: 480,
      date: "2026-10-27",
    },
  ],
  previousCertificatesTitle: "Marcos anteriores",
  previousCertificates: [
    {
      title: "Certificado de Pontos",
      subtitle: "Reconhecimento oficial por volume de computação entregue",
      badge: "900,000 Points Award",
      metric: "900k Pontos",
      image: "/volunteer/certificado-pontos.jpg",
      alt: "Certificado Folding@home concedido a colabdeveloper por 900.000 pontos concluídos",
      width: 640,
      height: 480,
    },
    {
      title: "Certificado de Work Units",
      subtitle: "Reconhecimento por unidades de dinâmica molecular completadas",
      badge: "56 Work Units Award",
      metric: "56 WUs",
      image: "/volunteer/certificado-wus.jpg",
      alt: "Certificado Folding@home concedido a colabdeveloper por 56 work units processadas",
      width: 640,
      height: 480,
    },
  ],
  statsCard: {
    bannerImage: "/volunteer/maximize-effort.png",
    bannerAlt: "Maximize your effort - Folding@home",
    statsImage: "/volunteer/folding-stats-1m.png",
    statsAlt:
      "Estatísticas oficiais do doador colabdeveloper no Folding@home, com 1.0M de pontos e 64 work units",
    badge: "Meta de Impacto",
    donorName: "colabdeveloper",
    points: "1.0M",
    wus: "64",
    rank: "#343,464",
    donorUrl: "https://stats.foldingathome.org/donor/colabdeveloper",
    projectUrl: "https://foldingathome.org/",
  },
};
