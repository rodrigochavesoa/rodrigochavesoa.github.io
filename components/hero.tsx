import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/container";
import { Kicker } from "@/components/kicker";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="scroll-mt-24 py-14 md:py-20" aria-labelledby="hero-title">
      <Container className="grid items-center gap-8 md:grid-cols-[auto_minmax(0,1fr)]">
        <Image
          src="/foto-rodrigo.jpg"
          alt="Rodrigo Chaves"
          width={2048}
          height={2048}
          priority
          className="size-36 justify-self-start rounded-full border border-border object-cover md:size-44"
        />
        <div className="flex min-w-0 flex-col items-start gap-5">
          <Kicker>Comunidade</Kicker>
          <h1
            id="hero-title"
            className="text-[clamp(2.3rem,4.3vw,4.3rem)] font-[760]"
          >
            @colabdeveloper
            <span className="mt-2 block text-[clamp(1.7rem,3vw,3rem)] text-accent-ink">
              Um laboratório colaborativo.
            </span>
          </h1>
          <p className="max-w-xl text-[1.075rem] text-muted-foreground">
            {profile.communityLead}
          </p>
          <p className="font-mono text-sm text-muted-foreground">
            {profile.location}
          </p>
          <div className="flex flex-wrap gap-[9px]">
            <Button asChild>
              <Link href="/#projetos">Ver projetos</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about/">Quem sou eu</Link>
            </Button>
          </div>
          <SocialLinks />
        </div>
      </Container>
    </section>
  );
}
