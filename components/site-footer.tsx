import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t-[1.5px] border-[var(--footer-rule)]">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-6">
        <BrandMark />
        <p className="footer-note text-sm">Feira de Santana, Bahia</p>
      </Container>
    </footer>
  );
}
