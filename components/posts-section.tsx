import Image from "next/image";

import { Container } from "@/components/container";
import { Kicker } from "@/components/kicker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { linkedInPosts } from "@/data/posts";

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export function PostsSection() {
  if (linkedInPosts.length === 0) return null;

  return (
    <section className="scroll-mt-24 py-14 md:py-20" aria-labelledby="posts-title">
      <Container className="flex flex-col gap-[18px]">
        <div className="flex flex-col gap-3">
          <Kicker>LinkedIn</Kicker>
          <h2
            id="posts-title"
            className="text-[clamp(1.75rem,2.7vw,2.3rem)] font-[650]"
          >
            Últimas postagens
            <span className="mt-1 block text-accent-ink">no LinkedIn.</span>
          </h2>
        </div>
        <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-3">
          {linkedInPosts.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full rounded-[24px] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3"
            >
              <Card className="h-full">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt=""
                    width={1200}
                    height={630}
                    className="aspect-[1.91/1] w-full object-cover"
                  />
                ) : null}
                <CardHeader>
                  <p className="font-mono text-xs text-muted-foreground">
                    {formatDate(post.date)}
                  </p>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[0.95rem] leading-normal text-muted-foreground">
                    {post.resumo}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
