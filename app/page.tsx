import { Hero } from "@/components/hero";
import { PostsSection } from "@/components/posts-section";
import { ProjectsSection } from "@/components/projects-section";
import { SiteShell } from "@/components/site-shell";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <ProjectsSection />
      <PostsSection />
    </SiteShell>
  );
}
