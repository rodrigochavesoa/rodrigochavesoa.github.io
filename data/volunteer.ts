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
  certificates: {
    title: string;
    subtitle: string;
    badge: string;
    metric: string;
    image: string;
    alt: string;
    width: number;
    height: number;
  }[];
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
  ],
  helpTitle: "Ajude-nos a curar doenças",
  helpDescription:
    "Ajude o Folding@home a estudar proteínas em escalas minúsculas, recrutando seus amigos e familiares. Conte a eles sobre o projeto Folding@home e junte-se a uma equipe ou crie a sua própria. Quanto mais pontos sua equipe acumular, mais poderemos avançar na pesquisa de doenças como Parkinson, Alzheimer e câncer!",
  goalTitle: "Rumo a 1 Milhão de Pontos",
  goalQuote:
    "Estamos em busca do 1 Milhão porque sabemos que esse milhão vale muito para a quem precisa de uma cura.",
  certificates: [
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
    statsImage: "/volunteer/folding-stats.png",
    statsAlt: "Estatísticas oficiais do doador colabdeveloper no Folding@home",
    badge: "Meta de Impacto",
    donorName: "colabdeveloper",
    points: "907.2K+",
    wus: "56",
    rank: "#355,343",
    donorUrl: "https://stats.foldingathome.org/donor/colabdeveloper",
    projectUrl: "https://foldingathome.org/",
  },
};
