import { Container } from "@/components/container";
import { Kicker } from "@/components/kicker";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section
      id="projetos"
      className="scroll-mt-24 py-14 md:py-20"
      aria-labelledby="projetos-title"
    >
      <Container className="flex flex-col gap-[18px]">
        <div className="flex flex-col gap-3">
          <Kicker>Projetos</Kicker>
          <h2
            id="projetos-title"
            className="text-[clamp(1.75rem,2.7vw,2.3rem)] font-[650]"
          >
            Projetos que eu construí
            <span className="mt-1 block text-accent-ink">e coloquei no ar.</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Cada um nasceu de um problema real ou de algo que eu queria aprender
            fazendo. Alguns você usa direto no navegador e a maioria tem o código
            aberto pra você ver como foram feitos.
          </p>
        </div>

        <div className="grid gap-[18px]">
          {featured.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>

        <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-3 [&>*]:min-w-0">
          {rest.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
