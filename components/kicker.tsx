export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="kicker inline-flex items-center gap-2">
      <span
        aria-hidden
        className="size-2 rounded-full bg-accent-ink shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent-ink)_28%,transparent)]"
      />
      {children}
    </p>
  );
}
