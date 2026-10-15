import Link from "next/link";

import { Container } from "@/components/container";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="py-24">
        <Container className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="font-mono text-sm text-muted-foreground">404</p>
          <h1 className="text-3xl font-bold">Página não encontrada</h1>
          <p className="max-w-md text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Button asChild className="mt-2">
            <Link href="/">Voltar para o início</Link>
          </Button>
        </Container>
      </section>
    </SiteShell>
  );
}
