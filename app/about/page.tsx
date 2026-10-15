import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/container";
import { SiteShell } from "@/components/site-shell";
import { SocialLinks } from "@/components/social-links";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Quem sou eu",
  description:
    "Rodrigo Chaves, profissional de Educação Física e desenvolvedor autodidata por trás do @colabdeveloper.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <article className="py-14 md:py-20">
        <Container className="flex max-w-3xl flex-col gap-8">
          <p className="font-mono text-sm text-muted-foreground">$ whoami</p>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Image
              src="/foto-rodrigo.jpg"
              alt="Rodrigo Chaves"
              width={2048}
              height={2048}
              priority
              className="size-28 shrink-0 rounded-full border border-border object-cover"
            />
            <h1 className="text-[clamp(2.3rem,4.3vw,4.3rem)] font-[760]">
              Olá. Eu sou o Rodrigo.
              <span className="mt-2 block text-[clamp(1.35rem,2.2vw,1.8rem)] text-accent-ink">
                {profile.aboutLead}
              </span>
            </h1>
          </div>
          <div className="flex flex-col gap-5 text-[1.05rem] leading-relaxed">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <blockquote className="border-t border-border pt-4 text-sm font-semibold">
              <p>{profile.githubBio}</p>
              <footer className="mt-2 font-mono text-xs font-normal text-muted-foreground">
                Bio publicada no GitHub
              </footer>
            </blockquote>
          </div>
          <section className="flex flex-col gap-3 border-t border-border pt-8" aria-labelledby="ola-title">
            <h2 id="ola-title" className="text-[1.75rem] font-[650]">
              Diga olá
            </h2>
            <p className="text-muted-foreground">
              Os canais públicos do @colabdeveloper e do Rodrigo.
            </p>
            <SocialLinks />
          </section>
        </Container>
      </article>
    </SiteShell>
  );
}
