import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export function SiteHeader() {
  return (
    <header
      id="topo"
      className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-[18px]"
    >
      <Container className="flex min-h-[72px] flex-wrap items-center justify-between gap-3 py-3">
        <BrandMark />
        <div className="flex flex-wrap items-center gap-2">
          <nav
            aria-label="Seções"
            className="flex items-center rounded-[14px] bg-surface-subtle p-1"
          >
            {links.map((link) => (
              <Button key={link.href} variant="ghost" asChild>
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
