import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/container";
import { Kicker } from "@/components/kicker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  publicacoes,
  SUBSTACK_HOME,
  verTodosPublicacoes,
} from "@/data/publicacoes";

export function PublicacoesSection() {
  if (publicacoes.length === 0) return null;

  return (
    <section className="scroll-mt-24 py-14 md:py-20" aria-labelledby="publicacoes-title">
      <Container className="flex flex-col gap-[18px]">
        <div className="flex flex-col gap-3">
          <Kicker>Publicações</Kicker>
          <h2
            id="publicacoes-title"
            className="text-[clamp(1.75rem,2.7vw,2.3rem)] font-[650]"
          >
            Quem ensina colaborando,
            <span className="mt-1 block text-accent-ink">evolui continuamente.</span>
          </h2>
        </div>
        <div className="grid gap-[18px] md:grid-cols-2">
          {publicacoes.map((item) => (
            <Card key={item.title} className="h-full">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="outline">{item.tema}</Badge>
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-[0.95rem] leading-normal text-muted-foreground">
                  {item.resumo}
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent-ink underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3"
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.8} />
                    <span className="sr-only">, abre em nova aba</span>
                  </a>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
        {verTodosPublicacoes ? (
          <Button variant="outline" asChild>
            <a
              href={SUBSTACK_HOME}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver todos
              <ArrowUpRight data-icon="inline-end" strokeWidth={1.8} />
              <span className="sr-only">, abre em nova aba</span>
            </a>
          </Button>
        ) : null}
      </Container>
    </section>
  );
}
