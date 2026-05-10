type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger order so each block rises in sequence (very visible on load). */
  revealIndex?: number;
};

export default function AnimatedSection({
  children,
  className,
  revealIndex = 0,
}: AnimatedSectionProps) {
  return (
    <div
      className={["section-reveal", className].filter(Boolean).join(" ")}
      style={{ "--reveal-index": revealIndex } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
