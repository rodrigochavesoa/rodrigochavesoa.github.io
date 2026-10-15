import { cn } from "cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1432px] px-[clamp(18px,3vw,42px)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
