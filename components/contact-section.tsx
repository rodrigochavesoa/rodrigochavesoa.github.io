import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/container";
import { Kicker } from "@/components/kicker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { profile } from "@/data/profile";

const links = [
  {
    title: "GitHub",
    description: profile.github,
    href: profile.githubUrl,
    external: true,
  },
  {
    title: "Colab Developer",
    description: "Site publicado no GitHub Pages",
    href: profile.colabUrl,
    external: true,
  },
  {
    title: "E-mail",
    description: `${profile.email} · publicado na página de contato do Colab Developer`,
    href: `mailto:${profile.email}`,
    external: false,
  },
];

export function ContactSection() {
  return (
    <section
      id="contato"
      className="scroll-mt-24 py-14 md:py-20"
      aria-labelledby="contato-title"
    >
      <Container className="flex flex-col gap-[18px]">
        <div className="flex flex-col gap-3">
          <Kicker>Contato</Kicker>
          <h2
            id="contato-title"
            className="text-[clamp(1.75rem,2.7vw,2.3rem)] font-[650]"
          >
            Links públicos
            <span className="mt-1 block text-accent-ink">{profile.location}</span>
          </h2>
        </div>
        <div className="grid gap-[18px] md:grid-cols-3">
          {links.map((link) => (
            <Card key={link.title} className="h-full">
              <CardHeader>
                <CardTitle>{link.title}</CardTitle>
                <CardDescription className="text-[0.95rem] leading-normal break-words">
                  {link.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button asChild>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    Abrir
                    {link.external ? (
                      <ArrowUpRight data-icon="inline-end" strokeWidth={1.8} />
                    ) : null}
                    {link.external ? (
                      <span className="sr-only">, abre em nova aba</span>
                    ) : null}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
