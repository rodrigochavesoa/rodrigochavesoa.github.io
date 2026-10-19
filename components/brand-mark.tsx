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
        src="/icon-light.png"
        alt=""
        width={150}
        height={150}
        className="dark:hidden"
        style={{ width: "auto", height: 28 }}
      />
      <Image
        src="/icon-dark.png"
        alt=""
        width={150}
        height={150}
        className="hidden dark:block"
        style={{ width: "auto", height: 28 }}
      />
      <span className="signature text-base">@colabdeveloper</span>
    </Link>
  );
}
