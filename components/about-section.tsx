import Image from "next/image";

import { Container } from "@/components/container";
import { Kicker } from "@/components/kicker";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile, todos } from "@/data/profile";

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="scroll-mt-24 py-14 md:py-20"
      aria-labelledby="sobre-title"
    >
      <Container className="grid gap-[18px] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
        <div className="flex flex-col gap-[18px]">
          <div className="flex flex-col gap-3">
            <Kicker>Sobre</Kicker>
            <h2
              id="sobre-title"
              className="text-[clamp(1.75rem,2.7vw,2.3rem)] font-[650]"
            >
              {profile.name}
              <span className="mt-1 block text-accent-ink">
                {profile.company}
              </span>
            </h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>O que o perfil público já diz</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-[0.95rem] leading-normal">
              <p>{profile.location}</p>
              <blockquote className="border-t border-border pt-4">
                <p className="font-semibold">{profile.githubBio}</p>
                <footer className="mt-2 font-mono text-xs text-muted-foreground">
                  Bio publicada no GitHub
                </footer>
              </blockquote>
              {profile.quotes.map((quote) => (
                <blockquote key={quote.text} className="border-t border-border pt-4">
                  <p>{quote.text}</p>
                  <footer className="mt-2 font-mono text-xs text-muted-foreground">
                    {quote.source}
                  </footer>
                </blockquote>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Para o Rodrigo completar</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3">
                {todos.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Badge variant="outline">TODO</Badge>
                    <span className="text-[0.95rem] leading-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-center rounded-[24px] bg-hero p-10">
          <Image
            src="/brand/mascote-pato.png"
            alt="Mascote do @colabdeveloper, um pato de cartola"
            width={108}
            height={169}
            style={{ width: "auto", height: 96 }}
          />
        </div>
      </Container>
    </section>
  );
}
