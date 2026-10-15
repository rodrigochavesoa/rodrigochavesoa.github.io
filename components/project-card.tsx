import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectLinks } from "@/components/project-links";
import { type Project, starsLabel } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          {project.featured ? <Badge>Destaque</Badge> : null}
          <Badge variant="outline">{project.language}</Badge>
        </div>
        <CardTitle>{project.name}</CardTitle>
        <p className="font-mono text-xs break-words text-muted-foreground">
          {project.repo}
        </p>
        <CardDescription className="text-[0.95rem] leading-normal text-foreground">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-mono text-sm text-muted-foreground tabular-nums">
          {starsLabel(project.stars)}
        </p>
      </CardContent>
      <CardFooter className="mt-auto">
        <ProjectLinks project={project} />
      </CardFooter>
    </Card>
  );
}
