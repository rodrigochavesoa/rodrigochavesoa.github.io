import { EstudosSection } from "@/components/estudos-section";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { PublicacoesSection } from "@/components/publicacoes-section";
import { SiteShell } from "@/components/site-shell";
import { VolunteerSection } from "@/components/volunteer-section";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <ProjectsSection />
      <VolunteerSection />
      <EstudosSection />
      <PublicacoesSection />
    </SiteShell>
  );
}
