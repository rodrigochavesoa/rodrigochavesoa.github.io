import { ArrowUpRight, FolderGit2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.siteUrl ? (
        <Button asChild>
          <a href={project.siteUrl} target="_blank" rel="noopener noreferrer">
            Site
            <ArrowUpRight data-icon="inline-end" strokeWidth={1.8} />
            <span className="sr-only">, abre em nova aba</span>
          </a>
        </Button>
      ) : null}
      <Button variant="outline" asChild>
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
          <FolderGit2 data-icon="inline-start" strokeWidth={1.8} />
          Repositório
          <span className="sr-only">, abre em nova aba</span>
        </a>
      </Button>
    </>
  );
}
