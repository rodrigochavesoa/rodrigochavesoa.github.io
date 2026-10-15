import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex min-h-11 items-center gap-[10px]", className)}
    >
      <Image
        src="/brand/simbolo-infinito.png"
        alt=""
        width={150}
        height={150}
        style={{ width: "auto", height: 28 }}
      />
      <span className="signature text-base">@colabdeveloper</span>
    </Link>
  );
}
