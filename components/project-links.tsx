import { ArrowUpRight, FolderGit2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.sites.map((site) => (
        <Button key={site.href} asChild>
          <a href={site.href} target="_blank" rel="noopener noreferrer">
            {site.label}
            <ArrowUpRight data-icon="inline-end" strokeWidth={1.8} />
            <span className="sr-only">, abre em nova aba</span>
          </a>
        </Button>
      ))}
      {project.repoUrl ? (
        <Button variant="outline" asChild>
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
            <FolderGit2 data-icon="inline-start" strokeWidth={1.8} />
            Repositório
            <span className="sr-only">, abre em nova aba</span>
          </a>
        </Button>
      ) : null}
    </>
  );
}
