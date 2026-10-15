import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/container";
import { Kicker } from "@/components/kicker";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="scroll-mt-24 py-14 md:py-20" aria-labelledby="hero-title">
      <Container className="grid items-center gap-[18px] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="flex min-w-0 flex-col items-start gap-6">
          <Kicker>Desenvolvedor</Kicker>
          <h1
            id="hero-title"
            className="text-[clamp(2.3rem,4.3vw,4.3rem)] font-[760]"
          >
            {profile.name}
            <span className="mt-2 block text-accent-ink">Ponto Chave Design</span>
          </h1>
          <p className="max-w-xl text-[1.075rem] text-muted-foreground">
            Desenvolvedor na {profile.company}, em {profile.location}.
          </p>
          <blockquote className="max-w-xl border-t border-border pt-4 text-sm font-semibold">
            <p>{profile.githubBio}</p>
            <footer className="mt-2 font-mono text-xs font-normal text-muted-foreground">
              Bio publicada no GitHub
            </footer>
          </blockquote>
          <div className="flex flex-wrap gap-[9px]">
            <Button asChild>
              <a href="#projetos">Ver projetos</a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
                <ArrowUpRight data-icon="inline-end" strokeWidth={1.8} />
                <span className="sr-only">, abre em nova aba</span>
              </a>
            </Button>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-[18px]">
          <Image
            src="/brand/logo-horizontal-fundo-escuro.png"
            alt="@colabdeveloper"
            width={2400}
            height={1252}
            priority
            className="h-auto w-full max-w-[560px] rounded-[24px]"
            style={{ width: "100%", maxWidth: 560, height: "auto" }}
          />
          <pre className="max-w-full overflow-x-auto rounded-[24px] border border-border bg-card p-6 font-mono text-sm leading-relaxed text-card-foreground shadow-[var(--shadow)]">
            <code>{`const rodrigo = {
  nome: "Rodrigo Chaves",
  atuacao: "Ponto Chave Design | Developer",
  cidade: "Feira de Santana, BA",
  github: "rodrigochavesoa",
} as const;`}</code>
          </pre>
        </div>
      </Container>
    </section>
  );
}
