"use client";

import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Factory,
  Github,
  Linkedin,
  Mail,
  Network,
  Send,
  ShieldCheck,
  Zap
} from "lucide-react";
import { FormEvent, useMemo, useState, useCallback } from "react";
import MobileMenu from "./MobileMenu";
import ProgressBar from "./ProgressBar";
import BackgroundEffects from "./BackgroundEffects";
import ProjectCard from "./ProjectCard";

type Project = {
  title: string;
  category: "Vision" | "Automation" | "Platform";
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  architecture: string;
  impact: string;
};

type ContactStatus = {
  type: "idle" | "loading" | "success" | "error";
  message: string;
};

const navItems = ["Home", "Projects", "Skills", "Experience", "Contact"];

const projects: Project[] = [
  {
    title: "AI-Based Camshaft Angle Detection System",
    category: "Vision",
    description:
      "Developed an industrial machine vision solution for automated camshaft angle measurement and validation.",
    image: "/images/camshaft-vision.png",
    technologies: ["Python", "OpenCV", "YOLOv8", "PyQt", "Snap7", "PLC Trigger"],
    features: [
      "Real-time image processing",
      "PLC-triggered inspection",
      "PASS/FAIL decision system",
      "Operator dashboard",
      "Equipment health monitoring",
      "Industrial deployment architecture"
    ],
    architecture:
      "Industrial cameras acquire synchronized frames, Python/OpenCV performs feature extraction and angle validation, a PyQt HMI displays operator decisions, and Snap7 exchanges trigger/result status with Siemens PLCs.",
    impact:
      "Reduced manual judgement from the inspection flow and created a repeatable PASS/FAIL decision path suitable for production use."
  },
  {
    title: "Vision Orchestration Unit",
    category: "Platform",
    description:
      "Centralized platform for managing computer vision projects from dataset creation to deployment.",
    image: "/images/vision-orchestration.png",
    technologies: ["TypeScript", "Python", "YOLOv8", "APIs", "Databases", "Workflow Automation"],
    features: [
      "Dataset management",
      "Training pipeline orchestration",
      "Inference node management",
      "Deployment monitoring",
      "Workflow automation"
    ],
    architecture:
      "A web control plane coordinates datasets, training jobs, model versions, inference nodes, and deployment telemetry so vision projects move from raw imagery to controlled production rollout.",
    impact:
      "Turns one-off model experiments into managed industrial vision workflows with traceable status, versioning, and deployment visibility."
  },
  {
    title: "PLC Integrated Vision Inspection System",
    category: "Automation",
    description: "Machine vision system integrated with Siemens PLCs using Snap7.",
    image: "/images/plc-vision.png",
    technologies: ["Siemens PLC", "TIA Portal", "Snap7", "Python", "OpenCV", "Industrial Ethernet"],
    features: [
      "PLC communication",
      "Trigger-based inspections",
      "Result transmission",
      "Industrial workflow integration"
    ],
    architecture:
      "PLC scan cycles trigger inspection requests over Snap7, the vision node processes camera frames, and results are written back to PLC data blocks for downstream machine decisions.",
    impact:
      "Bridges AI inspection logic with deterministic automation workflows already used on the manufacturing floor."
  }
];

const skillGroups = [
  {
    title: "Computer Vision",
    icon: BrainCircuit,
    skills: [
      ["YOLOv8", 90],
      ["OpenCV", 92],
      ["Image Processing", 88],
      ["Object Detection", 86]
    ]
  },
  {
    title: "Automation",
    icon: Factory,
    skills: [
      ["Siemens PLC", 82],
      ["TIA Portal", 78],
      ["Snap7", 88]
    ]
  },
  {
    title: "Programming",
    icon: Cpu,
    skills: [
      ["Python", 94],
      ["TypeScript", 76]
    ]
  },
  {
    title: "Software Development",
    icon: Database,
    skills: [
      ["PyQt", 86],
      ["API Development", 80],
      ["Database Integration", 74]
    ]
  }
];

const stats = [
  ["Computer Vision Projects", "12+"],
  ["Industrial Automation Projects", "6+"],
  ["Technologies Used", "10+"]
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
};

export default function PortfolioClient() {
  const [filter, setFilter] = useState<"All" | Project["category"]>("All");
  const [expandedProject, setExpandedProject] = useState(projects[0].title);
  const [contactStatus, setContactStatus] = useState<ContactStatus>({ type: "idle", message: "" });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.2 });

  // Memoize filtered projects - only recalculate when filter changes
  const filteredProjects = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter]
  );

  // Memoize skill groups render
  const renderedSkills = useMemo(() => skillGroups, []);

  const handleInquiry = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      company: String(form.get("company") ?? "").trim(),
      projectType: String(form.get("projectType") ?? "").trim(),
      message: String(form.get("message") ?? "").trim()
    };

    if (!payload.name || !payload.email || !payload.message) {
      setContactStatus({
        type: "error",
        message: "Please enter your name, email, and project message."
      });
      return;
    }

    setContactStatus({ type: "loading", message: "Sending inquiry..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Unable to send your inquiry right now.");
      }

      formElement.reset();
      setContactStatus({
        type: "success",
        message: "Inquiry sent successfully. Amit will review your project brief soon."
      });
    } catch (error) {
      setContactStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to send your inquiry right now."
      });
    }
  }, []);

  const handleProjectToggle = useCallback((title: string) => {
    setExpandedProject((prev) => (prev === title ? "" : title));
  }, []);

  return (
    <main className="relative overflow-hidden bg-[#07080b] text-white transition-colors duration-500 light:bg-[#f4f7fb] light:text-slate-950">
      <ProgressBar progress={progress} />
      <BackgroundEffects />

      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-[#07080b]/78 backdrop-blur-xl light:border-slate-900/10 light:bg-white/74">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-5 md:px-8">
          <a href="#home" className="flex items-center gap-2 sm:gap-3" aria-label="Amit Maurya home">
            <span className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded bg-white text-slate-950 shadow-glow light:bg-slate-950 light:text-white">
              <Network size={20} />
            </span>
            <span className="hidden sm:block">
              <span className="block text-base sm:text-lg font-black tracking-[0.18em]">AMIT</span>
              <span className="block text-xs font-bold uppercase tracking-[0.24em] text-cyanline">Vision Automation</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded px-3 py-2 text-xs font-semibold text-white/68 transition hover:bg-white/8 hover:text-white light:text-slate-700 light:hover:bg-slate-900/10 sm:px-4 sm:text-sm"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Navigation */}
          <MobileMenu navItems={navItems} />
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative mx-auto min-h-screen max-w-7xl px-4 pb-12 pt-24 sm:px-5 sm:pb-20 sm:pt-32 md:px-8 lg:pt-36">
        <div className="grid items-center gap-8 lg:gap-10 lg:grid-cols-[1.04fr_0.96fr]">
          <motion.div {...fadeUp}>
            <div className="mb-4 inline-flex items-center gap-2 rounded border border-cyanline/30 bg-cyanline/8 px-3 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyanline sm:mb-6 sm:gap-3 sm:px-4 sm:py-2">
              <span className="h-2 w-2 rounded-full bg-signal shadow-signal" />
              Industrial AI Engineer
            </div>
            <h1 className="max-w-4xl text-balance text-3xl font-black leading-tight tracking-normal sm:text-4xl sm:leading-tight md:text-5xl lg:text-7xl lg:leading-[0.98]">
              Amit Maurya
              <span className="mt-2 block text-xl font-black text-white/76 light:text-slate-700 sm:mt-3 sm:text-2xl md:text-3xl lg:text-5xl lg:mt-4">
                Computer Vision & Industrial Automation Engineer
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 light:text-slate-600 sm:mt-6 sm:text-base sm:leading-7 md:text-lg md:leading-8">
              Building AI-Powered Vision Systems for Industrial Automation. I design inspection systems that connect cameras, models, dashboards, and PLC workflows into production-ready manufacturing solutions.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-slate-950 transition hover:bg-white/90 sm:px-6 sm:py-4 sm:text-sm"
              >
                View Systems <ArrowRight className="transition group-hover:translate-x-1" size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded border border-white/16 bg-white/7 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:border-cyanline/50 hover:bg-cyanline/8 sm:px-6 sm:py-4 sm:text-sm"
              >
                Contact <Mail size={16} />
              </a>
              <a
                href="/Amit-Maurya-Resume-Brief.txt"
                download
                className="inline-flex items-center justify-center gap-2 rounded border border-cyanline/38 bg-cyanline/10 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-cyanline transition hover:bg-cyanline/20 sm:px-6 sm:py-4 sm:text-sm"
              >
                Resume <Download size={16} />
              </a>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="industrial-border glass-panel relative overflow-hidden rounded-lg"
          >
            <div className="relative aspect-[1.08] overflow-hidden rounded bg-slate-950">
              <Image
                src="/images/camshaft-vision.png"
                alt="AI-powered camshaft machine vision inspection"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />
              <motion.div
                animate={{ x: ["-8%", "108%"] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "linear" }}
                className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
              <div className="absolute bottom-3 left-3 right-3 grid gap-2 sm:gap-3 sm:bottom-5 sm:left-5 sm:right-5 sm:grid-cols-3">
                {stats.map(([label, value]) => (
                  <div key={label} className="rounded border border-white/12 bg-black/54 p-2 backdrop-blur sm:p-4">
                    <div className="text-lg font-black text-white sm:text-2xl">{value}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-300">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <Section id="projects" label="Selected Deployments" title="Project Work Built Around Industrial Reality">
        <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar sm:mb-8">
          {(["All", "Vision", "Automation", "Platform"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded border px-3 py-2 text-xs font-black uppercase tracking-[0.14em] transition shrink-0 sm:px-5 sm:py-3 sm:text-sm ${
                filter === item
                  ? "border-cyanline bg-cyanline/10 text-cyanline"
                  : "border-white/12 text-white/68 hover:border-white/30 hover:text-white light:border-slate-900/10 light:text-slate-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid gap-5 sm:gap-7">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              expanded={expandedProject === project.title}
              onToggle={() => handleProjectToggle(project.title)}
            />
          ))}
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" label="Capability Stack" title="Computer Vision, Automation, and Deployment Skills">
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {renderedSkills.map((group) => {
            const Icon = group.icon;
            return (
              <motion.div key={group.title} {...fadeUp} className="glass-panel rounded-lg p-5 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded bg-cyanline/12 text-cyanline">
                    <Icon size={20} />
                  </span>
                  <h3 className="text-lg font-black sm:text-xl">{group.title}</h3>
                </div>
                <div className="mt-5 sm:mt-7 space-y-4 sm:space-y-5">
                  {group.skills.map(([skill, level]) => (
                    <div key={skill}>
                      <div className="mb-1.5 flex items-center justify-between text-xs font-bold sm:mb-2 sm:text-sm">
                        <span>{skill}</span>
                        <span className="text-cyanline">{level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded bg-white/10 light:bg-slate-900/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded bg-gradient-to-r from-cyanline to-signal"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" label="Industrial Exposure" title="Manufacturing Workflow Experience">
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1fr_0.8fr]">
          <motion.div {...fadeUp} className="glass-panel rounded-lg p-5 sm:p-7">
            <div className="flex items-start gap-4 sm:gap-5">
              <span className="grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded bg-white text-slate-950 light:bg-slate-950 light:text-white">
                <Building2 size={22} />
              </span>
              <div className="min-w-0">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-cyanline sm:text-sm">Volkswagen Group India</div>
                <h3 className="mt-1 text-2xl font-black sm:mt-2 sm:text-3xl">Student Intern</h3>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 light:text-slate-600 sm:mt-4 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                  Exposure to industrial manufacturing, automation systems, engineering workflows, and machine vision applications. The experience shaped a practical engineering approach focused on solving real manufacturing problems.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="industrial-border glass-panel rounded-lg p-5 sm:p-7">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded bg-signal/14 text-signal">
                <ShieldCheck size={24} />
              </span>
              <div className="min-w-0">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-signal">Highlighted Achievement</div>
                <h3 className="mt-1 text-xl font-black sm:mt-2 sm:text-2xl">Certificate of Appreciation</h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300 light:text-slate-600 sm:mt-5 sm:text-base sm:leading-7">
              Recognized for the Camera Vision Automation Project and its application in industrial machine vision workflows and PLC integration achievements.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" label="Project Inquiry" title="Build the Next Inspection System">
        <div className="grid gap-5 sm:gap-7 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div {...fadeUp} className="glass-panel rounded-lg p-5 sm:p-7">
            <h3 className="text-xl font-black sm:text-2xl">Contact Channels</h3>
            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <ContactLink icon={<Mail size={18} />} label="Email" value="amitmauryaajm@gmail.com" />
              <ContactLink
                icon={<Linkedin size={18} />}
                label="LinkedIn"
                value="Amit-maurya"
                href="https://www.linkedin.com/in/amit-maurya-84b0922a5/"
              />
              <ContactLink icon={<Github size={18} />} label="GitHub" value="Rishbyte-lgtm" href="https://github.com/Rishbyte-lgtm" />
            </div>
          </motion.div>
          <motion.form {...fadeUp} onSubmit={handleInquiry} className="glass-panel rounded-lg p-5 sm:p-7">
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              <Field name="name" label="Name" placeholder="Your name" />
              <Field name="email" label="Email" placeholder="you@example.com" type="email" />
              <Field name="company" label="Company" placeholder="Organization name" required={false} />
              <label className="block sm:col-span-1">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-400 sm:text-sm">Project Type</span>
                <select
                  name="projectType"
                  defaultValue=""
                  className="mt-2 w-full rounded border border-white/12 bg-black/22 px-3 py-2 text-sm text-white outline-none transition focus:border-cyanline light:border-slate-900/12 light:bg-white/10 light:text-slate-950 sm:px-4 sm:py-3"
                >
                  <option value="" className="bg-slate-950 text-white">
                    Select type
                  </option>
                  <option value="Computer Vision Inspection" className="bg-slate-950 text-white">
                    Computer Vision Inspection
                  </option>
                  <option value="PLC Integration" className="bg-slate-950 text-white">
                    PLC Integration
                  </option>
                  <option value="Machine Vision Dashboard" className="bg-slate-950 text-white">
                    Machine Vision Dashboard
                  </option>
                  <option value="Automation Consulting" className="bg-slate-950 text-white">
                    Automation Consulting
                  </option>
                </select>
              </label>
            </div>
            <label className="mt-4 block sm:mt-5 sm:col-span-2">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-400 sm:text-sm">Project Brief</span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Inspection requirement, PLC platform, camera setup, timeline..."
                className="mt-2 w-full resize-none rounded border border-white/12 bg-black/22 px-3 py-2 text-sm text-white outline-none transition focus:border-cyanline light:border-slate-900/12 light:bg-white/10 light:text-slate-950 sm:rows-6 sm:px-4 sm:py-3"
              />
            </label>
            {contactStatus.type !== "idle" && (
              <div
                role="status"
                className={`mt-3 rounded border px-3 py-2 text-xs font-bold sm:mt-5 sm:px-4 sm:py-3 sm:text-sm ${
                  contactStatus.type === "success"
                    ? "border-signal/40 bg-signal/10 text-signal"
                    : contactStatus.type === "error"
                      ? "border-red-400/40 bg-red-500/10 text-red-200 light:text-red-700"
                      : "border-cyanline/40 bg-cyanline/10 text-cyanline"
                }`}
              >
                {contactStatus.message}
              </div>
            )}
            <button
              type="submit"
              disabled={contactStatus.type === "loading"}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded bg-cyanline px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-slate-950 transition hover:bg-cyanline/90 disabled:opacity-60 sm:mt-5 sm:px-6 sm:py-4 sm:text-sm"
            >
              {contactStatus.type === "loading" ? "Sending..." : "Send Inquiry"} <Send size={16} />
            </button>
          </motion.form>
        </div>
      </Section>

      {/* Footer */}
      <footer className="relative mx-auto max-w-7xl px-4 py-8 text-xs text-slate-400 sm:px-5 sm:py-10 md:px-8 md:text-sm">
        <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-6 light:border-slate-900/10 sm:gap-4 sm:pt-8 md:flex-row">
          <span>© 2026 Amit Maurya. Industrial AI Vision Systems.</span>
          <span className="text-xs sm:text-sm">Python · OpenCV · YOLOv8 · Siemens PLC · Snap7</span>
        </div>
      </footer>
    </main>
  );
}

/**
 * Reusable Section component
 */
function Section({
  id,
  label,
  title,
  children
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl scroll-mt-28 px-4 py-12 sm:px-5 sm:py-16 md:px-8 lg:py-24">
      <motion.div {...fadeUp} className="mb-6 sm:mb-9">
        <div className="mb-3 inline-flex items-center gap-2 rounded border border-white/12 bg-white/6 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyanline light:border-slate-900/10 light:bg-slate-900/10 light:text-slate-700 sm:mb-4 sm:gap-3 sm:px-4 sm:py-2">
          <Zap size={12} />
          {label}
        </div>
        <h2 className="max-w-4xl text-balance text-2xl font-black leading-tight sm:text-3xl md:text-4xl lg:text-5xl">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

/**
 * Contact Link component
 */
function ContactLink({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const className =
    "flex items-center justify-between gap-3 rounded border border-white/10 bg-white/5 p-3 transition hover:border-cyanline/50 hover:bg-cyanline/8 light:border-slate-900/10 light:bg-white/5 light:hover:border-slate-700 sm:gap-4 sm:p-4";
  const content = (
    <>
      <span className="flex min-w-0 items-center gap-2 sm:gap-3">
        <span className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded bg-cyanline/12 text-cyanline">{icon}</span>
        <span className="min-w-0">
          <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">{label}</span>
          <span className="block truncate text-sm font-bold text-white light:text-slate-950 sm:text-base">{value}</span>
        </span>
      </span>
      {href && <ExternalLink className="shrink-0 text-slate-400" size={16} />}
    </>
  );

  if (!href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  );
}

/**
 * Form Field component
 */
function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = true
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-400 sm:text-sm">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded border border-white/12 bg-black/22 px-3 py-2 text-sm text-white outline-none transition focus:border-cyanline placeholder:text-slate-500 light:border-slate-900/12 light:bg-white/10 light:text-slate-950 light:placeholder:text-slate-400 sm:px-4 sm:py-3"
      />
    </label>
  );
}
