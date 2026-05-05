"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
  SendHorizontal,
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

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
        <div className="relative overflow-hidden rounded-[11px] border border-white/10 bg-slate-950/95 px-3.5 py-3 backdrop-blur-xl">
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
      <div className="absolute -bottom-1.5 left-1/2 z-10 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/15 bg-slate-950/95 shadow-sm backdrop-blur-xl" />
    </div>
  );
}

export default function PortfolioPage() {
  const [cursor, setCursor] = useState({ x: -1000, y: -1000 });
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });
  const year = useMemo(() => new Date().getFullYear(), []);

  const handleContactSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    setIsSending(true);
    setFormStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      form.reset();
      setFormStatus({
        type: "success",
        message: "Message sent successfully. I will get back to you soon.",
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send message right now.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main
      className="relative overflow-hidden pb-16"
      onMouseMove={(event) =>
        setCursor({ x: event.clientX - 130, y: event.clientY - 130 })
      }
    >
      <motion.div
        className="pointer-events-none fixed z-0 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl"
        animate={{ x: cursor.x, y: cursor.y }}
        transition={{ type: "spring", damping: 24, stiffness: 210, mass: 0.5 }}
      />

      <div className="absolute inset-0 -z-10 grid-pattern" />

      <HeroSection />

      <AnimatedSection>
        <SectionShell
          id="about"
          eyebrow="About"
          title="Engineering digital products with architecture-first thinking."
          description="Focused on maintainable codebases, robust APIs, and long-term product velocity through structured fullstack delivery."
        >
          <div className="grid gap-5 md:grid-cols-2">
            {summaryPoints.map((point) => (
              <motion.article
                key={point}
                className="glass-card rounded-2xl p-6"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.01 }}
              >
                <p className="text-sm leading-7 text-slate-200">{point}</p>
              </motion.article>
            ))}
          </div>
        </SectionShell>
      </AnimatedSection>

      <AnimatedSection>
        <SectionShell
          id="experience"
          eyebrow="Work Experience"
          title="Delivering outcomes across frontend and fullstack roles."
        >
          <div className="relative border-l border-white/15 pl-7">
            {experiences.map((experience) => (
              <motion.article
                key={experience.company}
                className="glass-card relative mb-8 rounded-2xl p-6 last:mb-0"
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5 }}
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
              </motion.article>
            ))}
          </div>
        </SectionShell>
      </AnimatedSection>

      <AnimatedSection>
        <SectionShell
          id="projects"
          eyebrow="Featured Projects"
          title="Case studies with practical business impact."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <motion.article
                key={project.name}
                className="glass-card rounded-2xl p-6"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
              > 
                {/* Ini gambar imagenya */}
                <div className="mb-5 h-40 rounded-xl border border-white/20 overflow-hidden relative">
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
                  {/* LIVE DEMO */}
                  {project.liveUrl !== "#" ? (
                    <Link
                      href={project.liveUrl}
                      className="group inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      Live Demo
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  ) : (
                    <div
                      className="group/live relative inline-flex cursor-default items-center gap-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/45 hover:bg-sky-400/15 hover:text-slate-100 hover:shadow-lg hover:shadow-sky-500/20"
                      aria-label="Live demo coming soon"
                    >
                      Live Demo
                      <ArrowUpRight className="h-4 w-4 opacity-60 transition-all duration-300 group-hover/live:opacity-90 group-hover/live:text-sky-200" />

                      <ProjectStatusPopover
                        groupName="live"
                        icon={Clock}
                        title="Coming soon"
                        description="A public demo is in progress — link will go live when deployment is ready."
                      />
                    </div>
                  )}

                  {/* GITHUB */}
                  {project.githubUrl !== "#" ? (
                    <Link
                      href={project.githubUrl}
                      className="group inline-flex items-center gap-1 rounded-full border border-white/25 px-4 py-2 font-semibold text-slate-100 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg"
                    >
                      GitHub
                      <Globe className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                    </Link>
                  ) : (
                    <div
                      className="group/gh relative inline-flex cursor-default items-center gap-1 rounded-full border border-white/25 bg-white/5 px-4 py-2 font-semibold text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/40 hover:bg-sky-400/10 hover:text-slate-200 hover:shadow-lg hover:shadow-sky-500/15"
                      aria-label="GitHub repository is private"
                    >
                      GitHub
                      <Globe className="h-4 w-4 opacity-60 transition-all duration-300 group-hover/gh:opacity-90 group-hover/gh:text-sky-200" />

                      <ProjectStatusPopover
                        groupName="gh"
                        icon={Lock}
                        title="Private repository"
                        description="Source isn’t published for this build — happy to walk through architecture on request."
                      />
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </SectionShell>
      </AnimatedSection>

      <AnimatedSection>
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
                  {group.items.map((item, index) => (
                    <motion.span
                      key={item}
                      className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-slate-100"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.25 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionShell>
      </AnimatedSection>

      <AnimatedSection>
        <SectionShell
          id="certifications"
          eyebrow="Certifications"
          title="Continuous learning to keep standards world-class."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {certifications.map((certification) => (
              <motion.article
                key={certification}
                className="glass-card flex items-center gap-3 rounded-2xl p-5"
                whileHover={{ y: -5 }}
              >
                <Award className="mt-0.5 h-5 w-5 text-sky-300" />
                <p className="text-sm text-slate-100">{certification}</p>
              </motion.article>
            ))}
          </div>
        </SectionShell>
      </AnimatedSection>

      <AnimatedSection>
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

            {/* <form
              className="glass-card rounded-2xl p-6"
              onSubmit={handleContactSubmit}
            >
              <h3 className="text-lg font-semibold text-slate-100">
                Send a Message
              </h3>
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-white/20 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none ring-sky-300 transition focus:ring-2"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="w-full rounded-xl border border-white/20 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none ring-sky-300 transition focus:ring-2"
                />
                <textarea
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  rows={4}
                  className="w-full rounded-xl border border-white/20 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none ring-sky-300 transition focus:ring-2"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSending}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 px-5 py-2.5 text-sm font-semibold text-slate-900"
                whileTap={{ scale: 0.97 }}
                whileHover={{ y: -2 }}
              >
                {isSending ? "Sending..." : "Send Message"}{" "}
                <SendHorizontal className="h-4 w-4" />
              </motion.button>
              {formStatus.type !== "idle" ? (
                <p
                  className={`mt-3 text-sm ${
                    formStatus.type === "success"
                      ? "text-emerald-300"
                      : "text-rose-300"
                  }`}
                >
                  {formStatus.message}
                </p>
              ) : null}
            </form> */}
          </div>
        </SectionShell>
      </AnimatedSection>

      <footer className="mx-auto mt-10 w-full max-w-6xl px-6 py-8 text-center text-xs text-slate-400 md:px-10">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          © {year} Muhammad Azka Nabhan Sauqi. Crafted with precision and
          purpose.
        </motion.p>
      </footer>
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative mx-auto flex min-h-[94vh] w-full max-w-6xl flex-col justify-center px-6 py-24 md:px-10">
      <div className="absolute right-10 top-20 -z-10 h-52 w-52 rounded-full bg-indigo-400/20 blur-3xl" />
      <div className="absolute bottom-20 left-0 -z-10 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
        className=" items-center lg:flex gap-10 lg:grid-cols-[360px,1fr] lg:gap-16"
      >
        <motion.div
          variants={fadeUp}
          className="mx-auto w-full max-w-[320px] lg:mx-0 lg:max-w-[360px]"
        >
          <div className="hidden lg:block glass-card relative overflow-hidden rounded-3xl p-3 my-10">
            <div className="absolute inset-x-4 top-0 h-20 bg-gradient-to-b from-sky-300/30 to-transparent blur-2xl" />
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
        </motion.div>

        <div>
          <motion.p
            variants={fadeUp}
            className="mb-4 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-100"
          >
            Fullstack Developer
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="gradient-text text-4xl font-semibold leading-tight tracking-tight md:text-7xl"
          >
            Muhammad Azka Nabhan Sauqi
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-slate-200 md:text-2xl"
          >
            Fullstack Developer | Next.js • Laravel • Scalable Web Systems
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg"
          >
            I build impactful digital products by combining high-performance
            frontend experiences with scalable backend systems.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            <HeroButton href="#projects" label="View Projects" />
            <HeroButton
              href="/resume-azka.pdf"
              label="Download Resume"
              isPrimary={false}
              download
            />
            <HeroButton href="#contact" label="Contact Me" isPrimary={false} />
          </motion.div>
        </div>
      </motion.div>

      <FloatingParticles />
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
  const className = `relative inline-flex items-center overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
    isPrimary
      ? "bg-white text-slate-900"
      : "border border-white/30 bg-white/5 text-slate-100 hover:bg-white/10"
  }`;

  if (download) {
    return (
      <a href={href} download className={className}>
        <motion.span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-120%" }}
          whileHover={{ x: "120%" }}
          transition={{ duration: 0.8 }}
        />
        <span className="relative">{label}</span>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-120%" }}
        whileHover={{ x: "120%" }}
        transition={{ duration: 0.8 }}
      />
      <span className="relative">{label}</span>
    </Link>
  );
}

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 12 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-2 w-2 rounded-full bg-sky-200/45"
          style={{
            top: `${8 + index * 7}%`,
            left: `${6 + (index % 6) * 15}%`,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.8, 0.25], scale: [1, 1.4, 1] }}
          transition={{
            duration: 4 + (index % 4),
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
