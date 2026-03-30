type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
      <div className="mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-100 md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-3xl text-base text-slate-300 md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
