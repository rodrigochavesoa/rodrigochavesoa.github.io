import Image from "next/image";
import { ArrowUpRight, Award, HeartHandshake } from "lucide-react";

import { Container } from "@/components/container";
import { Kicker } from "@/components/kicker";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  volunteerData,
  type VolunteerCertificate,
} from "@/data/volunteer";

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function CertificateGrid({
  certificates,
}: {
  certificates: VolunteerCertificate[];
}) {
  return (
    <div className="grid gap-[18px] md:grid-cols-2">
      {certificates.map((cert) => (
        <Card
          key={cert.badge}
          className="h-full overflow-hidden transition-all duration-300 ease-out hover:border-accent-ink hover:shadow-[0_0_25px_rgba(29,78,216,0.22)] dark:hover:border-accent-ink dark:hover:shadow-[0_0_25px_rgba(66,133,244,0.28)]"
        >
          <div className="relative aspect-[16/11] w-full overflow-hidden bg-surface-subtle p-3 sm:p-5">
            <div className="relative h-full w-full overflow-hidden rounded-[16px] border border-border shadow-xs">
              <Image
                src={cert.image}
                alt={cert.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </div>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge variant="outline">{cert.metric}</Badge>
              {cert.date ? (
                <p className="font-mono text-xs text-muted-foreground">
                  <time dateTime={cert.date}>{formatDate(cert.date)}</time>
                </p>
              ) : (
                <p className="font-mono text-xs text-muted-foreground">
                  Certificado Oficial
                </p>
              )}
            </div>
            <CardTitle className="text-lg">{cert.title}</CardTitle>
            <CardDescription>{cert.subtitle}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export function VolunteerSection() {
  const project = volunteerData.featuredProject;
  const milestone = volunteerData.milestone;

  return (
    <section
      id="volunteer"
      className="scroll-mt-24 py-14 md:py-20"
      aria-labelledby="volunteer-title"
    >
      <Container className="flex flex-col gap-[18px]">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col gap-3">
          <Kicker>{volunteerData.kicker}</Kicker>
          <h2
            id="volunteer-title"
            className="text-[clamp(1.75rem,2.7vw,2.3rem)] font-[650]"
          >
            {volunteerData.title}
            <span className="mt-1 block text-accent-ink">
              {volunteerData.highlightTitle}
            </span>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            {volunteerData.lead}
          </p>
        </div>

        {/* Card Principal: Infraestrutura & Pesquisa Biomédica */}
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Computação Distribuída</Badge>
              <Badge variant="outline">GROMACS & Amber14sb</Badge>
              <Badge variant="outline">Linux Headless</Badge>
              <Badge variant="outline">Projeto 18291</Badge>
              <Badge variant="outline">Projeto 18490</Badge>
            </div>
            <CardTitle className="text-xl">
              Engajamento Científico e Dinâmica Molecular
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-[0.98rem] leading-relaxed text-muted-foreground">
            {volunteerData.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </CardContent>
          <CardFooter className="mt-auto flex-wrap gap-4">
            <a
              href={volunteerData.statsCard.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent-ink underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3"
            >
              Conheça o Folding@home
              <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.8} />
              <span className="sr-only">, abre em nova aba</span>
            </a>
            <a
              href={volunteerData.statsCard.donorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent-ink underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3"
            >
              Estatísticas colabdeveloper
              <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.8} />
              <span className="sr-only">, abre em nova aba</span>
            </a>
          </CardFooter>
        </Card>

        {/* Marco de 1 milhão + Projeto 18490 */}
        <Card className="overflow-hidden">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_280px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="gap-1.5">
                  <Award className="size-3.5" />
                  {milestone.badge}
                </Badge>
                <Badge variant="outline">
                  <time dateTime={milestone.date}>
                    {formatDate(milestone.date)}
                  </time>
                </Badge>
                <Badge variant="outline">{project.code}</Badge>
                <Badge variant="outline">{project.target}</Badge>
              </div>

              <h3 className="font-heading text-xl font-[650] text-foreground">
                {milestone.title}
              </h3>

              <div className="border-l-[3.5px] border-accent-ink py-1 pl-4 sm:pl-5">
                <p className="font-heading text-[1.1rem] font-medium leading-relaxed text-foreground sm:text-[1.22rem]">
                  “{milestone.quote}”
                </p>
                <p className="mt-1.5 font-mono text-xs text-muted-foreground sm:text-sm">
                  — Folding@home &amp; @colabdeveloper
                </p>
              </div>

              <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
                {milestone.description}
              </p>
            </div>

            <figure className="flex flex-col items-center gap-3 lg:row-span-2">
              <div className="relative w-full max-w-[280px] overflow-hidden rounded-[18px] border border-border/80 bg-background p-1 shadow-xs transition-all duration-300 ease-out hover:border-accent-ink hover:shadow-[0_0_25px_rgba(29,78,216,0.28)] dark:hover:border-accent-ink dark:hover:shadow-[0_0_25px_rgba(66,133,244,0.35)]">
                <Image
                  src={project.photo}
                  alt={project.photoAlt}
                  width={project.photoWidth}
                  height={project.photoHeight}
                  className="h-auto w-full rounded-[14px] object-cover object-top"
                />
              </div>
              <figcaption className="max-w-[280px] text-center font-mono text-xs text-muted-foreground">
                {project.researcher}
                <span className="mt-0.5 block">{project.institution}</span>
              </figcaption>
            </figure>

            <div className="flex flex-col gap-3">
              <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
                {project.details}
              </p>
              <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-4 pt-1">
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent-ink underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3"
                >
                  {project.code}
                  <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.8} />
                  <span className="sr-only">, abre em nova aba</span>
                </a>
                <a
                  href={project.labUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent-ink underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3"
                >
                  Voelz Lab
                  <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.8} />
                  <span className="sr-only">, abre em nova aba</span>
                </a>
              </div>
            </div>
          </div>
        </Card>

        {/* Certificados de 1 milhão */}
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs text-muted-foreground">
            {volunteerData.certificatesTitle}
          </p>
          <CertificateGrid certificates={volunteerData.certificates} />
        </div>

        {/* Certificados anteriores: 900k */}
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs text-muted-foreground">
            {volunteerData.previousCertificatesTitle}
          </p>
          <CertificateGrid certificates={volunteerData.previousCertificates} />
        </div>

        {/* Card de Impacto: Rumo aos 10 Milhões e Ajude a curar doenças */}
        <Card className="overflow-hidden">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_320px] lg:items-center">
            {/* Coluna Texto / Chamada de Ação */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="gap-1.5">
                  <HeartHandshake className="size-3.5" />
                  {volunteerData.goalTitle}
                </Badge>
                <Badge variant="outline">{volunteerData.statsCard.badge}</Badge>
              </div>

              {/* Citação estilo GDG / Linha azul vertical limpa */}
              <div className="border-l-[3.5px] border-accent-ink py-1 pl-4 sm:pl-5">
                <p className="font-heading text-[1.1rem] font-medium leading-relaxed text-foreground sm:text-[1.22rem]">
                  “{volunteerData.goalQuote}”
                </p>
                <p className="mt-1.5 font-mono text-xs text-muted-foreground sm:text-sm">
                  — Folding@home &amp; @colabdeveloper
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-xl font-[650] text-foreground">
                  {volunteerData.helpTitle}
                </h3>
                <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
                  {volunteerData.helpDescription}
                </p>
              </div>

              {/* Métricas em Destaque */}
              <div className="mt-2 grid grid-cols-3 gap-3 border-t border-border pt-4">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">Pontos</p>
                  <p className="font-heading text-lg font-bold text-accent-ink sm:text-xl">
                    {volunteerData.statsCard.points}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground">Work Units</p>
                  <p className="font-heading text-lg font-bold text-foreground sm:text-xl">
                    {volunteerData.statsCard.wus}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground">Rank Global</p>
                  <p className="font-mono text-sm font-semibold text-foreground sm:text-base">
                    {volunteerData.statsCard.rank}
                  </p>
                </div>
              </div>
            </div>

            {/* Coluna Imagens: Maximize Effort + Stats (Sem fundo cinza externo, com hover azul brilhante) */}
            <div className="flex flex-col items-center gap-4">
              <div className="group relative w-full max-w-[280px] overflow-hidden rounded-[18px] border border-border/80 bg-background p-1 shadow-xs transition-all duration-300 ease-out hover:border-accent-ink hover:shadow-[0_0_25px_rgba(29,78,216,0.28)] dark:hover:border-accent-ink dark:hover:shadow-[0_0_25px_rgba(66,133,244,0.35)]">
                <Image
                  src={volunteerData.statsCard.bannerImage}
                  alt={volunteerData.statsCard.bannerAlt}
                  width={323}
                  height={176}
                  className="h-auto w-full rounded-[14px] object-contain"
                />
              </div>

              <div className="group relative w-full max-w-[280px] overflow-hidden rounded-[18px] border border-border/80 bg-background p-1 shadow-xs transition-all duration-300 ease-out hover:border-accent-ink hover:shadow-[0_0_25px_rgba(29,78,216,0.28)] dark:hover:border-accent-ink dark:hover:shadow-[0_0_25px_rgba(66,133,244,0.35)]">
                <Image
                  src={volunteerData.statsCard.statsImage}
                  alt={volunteerData.statsCard.statsAlt}
                  width={329}
                  height={439}
                  className="h-auto w-full rounded-[14px] object-contain"
                />
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
