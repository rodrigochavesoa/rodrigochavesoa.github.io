import { EstudosSection } from "@/components/estudos-section";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { SiteShell } from "@/components/site-shell";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <ProjectsSection />
      <EstudosSection />
    </SiteShell>
  );
}
