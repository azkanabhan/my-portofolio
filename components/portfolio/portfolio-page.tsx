import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Award,
  Clock,
  Globe,
  Link2,
  Lock,
  Mail,
  MapPin,
} from "lucide-react";
import AnimatedSection from "@/components/portfolio/animated-section";
import {
  certifications,
  experiences,
  projects,
  skillGroups,
  summaryPoints,
} from "@/components/portfolio/data";

import SectionShell from "@/components/portfolio/section-shell";

function ProjectStatusPopover({
  groupName,
  title,
  description,
  icon: Icon,
}: {
  groupName: "live" | "gh";
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  const visible =
    groupName === "live"
      ? "group-hover/live:translate-y-0 group-hover/live:opacity-100 group-hover/live:scale-100"
      : "group-hover/gh:translate-y-0 group-hover/gh:opacity-100 group-hover/gh:scale-100";

  return (
    <div
      className={`pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-max max-w-[min(288px,calc(100vw-2rem))] -translate-x-1/2 translate-y-2 scale-95 opacity-0 transition-all duration-300 ease-out ${visible}`}
      role="tooltip"
    >
      <div className="relative rounded-xl bg-gradient-to-br from-sky-400/35 via-white/12 to-indigo-400/25 p-px shadow-2xl shadow-sky-950/40">
        <div className="relative overflow-hidden rounded-[11px] border border-white/10 bg-slate-950/98 px-3.5 py-3">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/15 via-transparent to-indigo-600/10" />
          <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/45 to-transparent" />

          <div className="relative flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-sky-300/25 bg-sky-400/15 text-sky-200 shadow-inner shadow-sky-950/30">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 pt-0.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-200/90">
                {groupName === "live" ? "Availability" : "Access"}
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug text-slate-50">
                {title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-1.5 left-1/2 z-10 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/15 bg-slate-950/98 shadow-sm" />
    </div>
  );
}

export default function PortfolioPage() {
  const year = new Date().getFullYear();

  return (
    <main className="relative overflow-hidden pb-16">
      <div className="animate-grid-breathe absolute inset-0 -z-10 grid-pattern" />

      <HeroSection />

      <AnimatedSection revealIndex={0}>
        <SectionShell
          id="about"
          eyebrow="About"
          title="Engineering digital products with architecture-first thinking."
          description="Focused on maintainable codebases, robust APIs, and long-term product velocity through structured fullstack delivery."
        >
          <div className="grid gap-5 md:grid-cols-2">
            {summaryPoints.map((point) => (
              <article
                key={point}
                className="glass-card rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1 md:hover:-translate-y-1.5"
              >
                <p className="text-sm leading-7 text-slate-200">{point}</p>
              </article>
            ))}
          </div>
        </SectionShell>
      </AnimatedSection>

      <AnimatedSection revealIndex={1}>
        <SectionShell
          id="experience"
          eyebrow="Work Experience"
          title="Delivering outcomes across frontend and fullstack roles."
        >
          <div className="relative border-l border-white/15 pl-7">
            {experiences.map((experience) => (
              <article
                key={experience.company}
                className="glass-card relative mb-8 rounded-2xl p-6 last:mb-0"
              >
                <span className="absolute -left-[38px] top-8 h-4 w-4 rounded-full border-2 border-sky-300 bg-slate-900" />
                <p className="text-sm text-slate-300">{experience.period}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-100">
                  {experience.role}
                </h3>
                <p className="text-sm text-sky-200">{experience.company}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  {experience.achievements.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {experience.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="rounded-full border border-sky-200/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-200"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionShell>
      </AnimatedSection>

      <AnimatedSection revealIndex={2}>
        <SectionShell
          id="projects"
          eyebrow="Featured Projects"
          title="Case studies with practical business impact."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.name}
                className="glass-card rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-2"
              >
                <div className="relative mb-5 h-40 overflow-hidden rounded-xl border border-white/20">
                  <Image
                    src={project.image}
                    alt={project.alt_image}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-xl font-semibold text-slate-100">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{project.description}</p>
                <p className="mt-3 text-sm text-sky-100">
                  <span className="font-semibold text-sky-300">Impact:</span>{" "}
                  {project.impact}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  <span className="font-semibold text-slate-200">Role:</span>{" "}
                  {project.role}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((stack) => (
                    <span
                      key={stack}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-slate-200"
                    >
                      {stack}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3 text-sm">
                  {project.liveUrl !== "#" ? (
                    <Link
                      href={project.liveUrl}
                      className="group inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 font-semibold text-slate-900 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >
                      Live Demo
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  ) : (
                    <div
                      className="group/live relative inline-flex cursor-default items-center gap-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold text-slate-300 transition-transform duration-200 hover:-translate-y-0.5 hover:border-sky-300/45 hover:bg-sky-400/15 hover:text-slate-100 hover:shadow-lg hover:shadow-sky-500/20"
                      aria-label="Live demo coming soon"
                    >
                      Live Demo
                      <ArrowUpRight className="h-4 w-4 opacity-60 transition-opacity duration-200 group-hover/live:opacity-90 group-hover/live:text-sky-200" />

                      <ProjectStatusPopover
                        groupName="live"
                        icon={Clock}
                        title="Coming soon"
                        description="A public demo is in progress — link will go live when deployment is ready."
                      />
                    </div>
                  )}

                  {project.githubUrl !== "#" ? (
                    <Link
                      href={project.githubUrl}
                      className="group inline-flex items-center gap-1 rounded-full border border-white/25 px-4 py-2 font-semibold text-slate-100 transition-transform duration-200 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg"
                    >
                      GitHub
                      <Globe className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
                    </Link>
                  ) : (
                    <div
                      className="group/gh relative inline-flex cursor-default items-center gap-1 rounded-full border border-white/25 bg-white/5 px-4 py-2 font-semibold text-slate-400 transition-transform duration-200 hover:-translate-y-0.5 hover:border-sky-300/40 hover:bg-sky-400/10 hover:text-slate-200 hover:shadow-lg hover:shadow-sky-500/15"
                      aria-label="GitHub repository is private"
                    >
                      GitHub
                      <Globe className="h-4 w-4 opacity-60 transition-opacity duration-200 group-hover/gh:opacity-90 group-hover/gh:text-sky-200" />

                      <ProjectStatusPopover
                        groupName="gh"
                        icon={Lock}
                        title="Private repository"
                        description="Source isn’t published for this build — happy to walk through architecture on request."
                      />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </SectionShell>
      </AnimatedSection>

      <AnimatedSection revealIndex={3}>
        <SectionShell
          id="skills"
          eyebrow="Skills"
          title="Technical capability combined with delivery discipline."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {skillGroups.map((group) => (
              <article key={group.title} className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-slate-100">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-slate-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionShell>
      </AnimatedSection>

      <AnimatedSection revealIndex={4}>
        <SectionShell
          id="certifications"
          eyebrow="Certifications"
          title="Continuous learning to keep standards world-class."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {certifications.map((certification) => (
              <article
                key={certification}
                className="glass-card flex items-center gap-3 rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-1"
              >
                <Award className="mt-0.5 h-5 w-5 text-sky-300" />
                <p className="text-sm text-slate-100">{certification}</p>
              </article>
            ))}
          </div>
        </SectionShell>
      </AnimatedSection>

      <AnimatedSection revealIndex={5}>
        <SectionShell
          id="contact"
          eyebrow="Contact"
          title="Let us build something impactful together."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-slate-100">
                Contact Details
              </h3>
              <ul className="mt-5 space-y-4 text-sm text-slate-200">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-sky-300" />
                  <span>azkanabhansauqi@gmail.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Link2 className="h-4 w-4 text-sky-300" />
                  <span>linkedin.com/in/azkanabhan</span>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-sky-300" />
                  <span>github.com/azkanabhan</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-sky-300" />
                  <span>Indonesia</span>
                </li>
              </ul>
            </article>
          </div>
        </SectionShell>
      </AnimatedSection>

      <footer
        className="animate-footer-rise mx-auto mt-10 w-full max-w-6xl px-6 py-8 text-center text-xs text-slate-400 md:px-10"
        style={
          { "--footer-reveal-delay": 1580 } as React.CSSProperties
        }
      >
        <p>
          © {year} Muhammad Azka Nabhan Sauqi. Crafted with precision and
          purpose.
        </p>
      </footer>
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative mx-auto flex min-h-[94vh] w-full max-w-6xl flex-col justify-center px-6 py-24 md:px-10">
      <div className="items-center gap-10 lg:flex lg:gap-16">
        <div className="mx-auto w-full max-w-[320px] lg:mx-0 lg:max-w-[360px]">
          <div className="animate-hero-rise relative my-10 hidden overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-3 lg:block">
            <div className="relative overflow-hidden rounded-2xl border border-white/20">
              <Image
                src="/fotoku.jpg"
                alt="Photo of Muhammad Azka Nabhan Sauqi"
                width={640}
                height={760}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="animate-hero-rise animate-hero-rise-delay-1 mb-4">
            <span className="animate-badge-float inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-100">
              Fullstack Developer
            </span>
          </p>
          <h1 className="animate-gradient-drift animate-hero-rise animate-hero-rise-delay-2 gradient-text text-4xl font-semibold leading-tight tracking-tight md:text-7xl">
            Muhammad Azka Nabhan Sauqi
          </h1>
          <p className="animate-hero-rise animate-hero-rise-delay-3 mt-6 text-lg text-slate-200 md:text-2xl">
            Fullstack Developer | Next.js • Laravel • Scalable Web Systems
          </p>
          <p className="animate-hero-rise animate-hero-rise-delay-4 mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            I build impactful digital products by combining high-performance
            frontend experiences with scalable backend systems.
          </p>

          <div className="animate-hero-rise animate-hero-rise-delay-5 mt-9 flex flex-wrap gap-3">
            <HeroButton href="#projects" label="View Projects" />
            <HeroButton
              href="/resume-azka.pdf"
              label="Download Resume"
              isPrimary={false}
              download
            />
            <HeroButton href="#contact" label="Contact Me" isPrimary={false} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroButton({
  href,
  label,
  isPrimary = true,
  download = false,
}: {
  href: string;
  label: string;
  isPrimary?: boolean;
  download?: boolean;
}) {
  const className = `relative inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 ${
    isPrimary
      ? "bg-white text-slate-900"
      : "border border-white/30 bg-white/5 text-slate-100 hover:bg-white/10"
  }`;

  if (download) {
    return (
      <a href={href} download className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
