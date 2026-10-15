import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/container";
import { Kicker } from "@/components/kicker";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { estudos } from "@/data/estudos";

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export function EstudosSection() {
  if (estudos.length === 0) return null;

  return (
    <section className="scroll-mt-24 py-14 md:py-20" aria-labelledby="estudos-title">
      <Container className="flex flex-col gap-[18px]">
        <div className="flex flex-col gap-3">
          <Kicker>Estudos</Kicker>
          <h2
            id="estudos-title"
            className="text-[clamp(1.75rem,2.7vw,2.3rem)] font-[650]"
          >
            O que estou
            <span className="mt-1 block text-accent-ink">estudando agora.</span>
          </h2>
        </div>
        <div className="grid gap-[18px] md:grid-cols-2">
          {estudos.map((estudo) => (
            <Card key={estudo.title} className="h-full">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="outline">{estudo.tema}</Badge>
                  <p className="font-mono text-xs text-muted-foreground">
                    <time dateTime={estudo.date}>{formatDate(estudo.date)}</time>
                  </p>
                </div>
                <CardTitle>{estudo.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-[0.95rem] leading-normal text-muted-foreground">
                  {estudo.resumo}
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                {estudo.links.map((link) => (
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
      </Container>
    </section>
  );
}
