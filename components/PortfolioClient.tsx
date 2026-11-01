"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Play,
  Send,
  Sparkles
} from "lucide-react";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import HeroEngineeringCard from "./HeroEngineeringCard";
import MobileMenu from "./MobileMenu";
import ProgressBar from "./ProgressBar";
import ProjectCard, { type CaseStudy } from "./ProjectCard";
import SkillsSection from "./SkillsSection";
import VisionSimulator from "./VisionSimulator";

type ContactStatus = {
  type: "idle" | "loading" | "success" | "error";
  message: string;
};

const navigationLinks = [
  { label: "Overview", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Simulator", href: "#sandbox" },
  { label: "Stack", href: "#stack" },
  { label: "Proof", href: "/proof" },
  { label: "Contact", href: "#contact" }
];

const selectedProjects: CaseStudy[] = [
  {
    title: "Camshaft Angle Detection System",
    category: "Inspection",
    image: "/Project-images/real_screenshot_camshaft.png",
    demoVideo: true,
    summary:
      "An automated optical inspection cell built to verify camshaft angle orientation and output high-speed PASS/FAIL decisions to prevent engine assembly errors.",
    problem:
      "Manual fixture checks with mechanical dial gauges were subjective, slow, and created bottlenecks on the production line.",
    solution:
      "Engineered an OpenCV contour and vector measurement pipeline calculating angle offsets within ±0.5° in under 12ms, displaying live status on a touch screen and handshaking with a Siemens PLC.",
    workflow: [
      "GigE camera triggers on physical part arrival",
      "Adaptive thresholding & contour extraction isolate the cam lobe",
      "Vector calculation verifies angle against ±0.5° tolerance",
      "Result bit dispatched via Snap7 to Siemens PLC pneumatic gate"
    ],
    technologies: ["Python", "OpenCV", "YOLOv8", "PyQt6", "Snap7", "Siemens S7"]
  },
  {
    title: "PLC-Connected Vision Handshake",
    category: "Automation",
    image: "/images/plc-vision.png",
    summary:
      "A deterministic machine-vision communication pattern built for automated lines requiring synchronized hardware handshakes.",
    problem:
      "Vision software running on standalone PCs often falls out of sync with conveyor cycle times, causing skipped parts or jamming.",
    solution:
      "Created an asynchronous Snap7 S7comm bridge mapping camera triggers to DB memory bits with watchdog health check pings to guarantee zero data loss.",
    workflow: [
      "Conveyor sensor fires hardware interrupt to PLC",
      "PLC sets trigger bit in DB10 memory block",
      "Vision service captures frame, evaluates part, writes result bit",
      "PLC advances conveyor or triggers reject cylinder"
    ],
    technologies: ["Siemens S7-1200", "TIA Portal", "Snap7", "Python", "Industrial Ethernet"]
  },
  {
    title: "Sealant Bead Quality Inspection",
    category: "Workflow",
    image: "/Project-images/sealant application.png",
    summary:
      "An active bench project inspecting continuous adhesive sealant beads along stamped automotive metal flanges.",
    problem:
      "Adhesive voids or width inconsistencies cause moisture leaks in final automotive assemblies if not detected before curing.",
    solution:
      "Benchmarking deep-learning segmentation alongside classical morphological operations to track bead continuity and identify voids in real time.",
    workflow: [
      "Overhead optical illumination illuminates adhesive path",
      "Segmentation model tracks bead width and perimeter continuity",
      "System flags gaps exceeding 3mm tolerance",
      "Generates inspection audit log with annotated frame"
    ],
    technologies: ["Python", "YOLOv8", "OpenCV", "Industrial Lighting", "PyTorch"]
  }
];

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918810964633";
const whatsappHref = `https://wa.me/918810964633?text=${encodeURIComponent(
  "Hello Amit, I reviewed your Machine Vision portfolio and want to discuss an inspection requirement."
)}`;

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-30px" },
  transition: { duration: 0.4, ease: "easeOut" as const }
};

export default function PortfolioClient() {
  const [expandedProject, setExpandedProject] = useState(selectedProjects[0].title);
  const [projectFilter, setProjectFilter] = useState<string>("All");
  const [contactStatus, setContactStatus] = useState<ContactStatus>({ type: "idle", message: "" });
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("home");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.2 });

  // Scroll spy to highlight active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      const sections = ["home", "projects", "sandbox", "stack", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleInquiry = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      inspectionRequirement: String(form.get("inspectionRequirement") ?? "").trim(),
      message: String(form.get("message") ?? "").trim()
    };

    if (!payload.name || !payload.email || !payload.inspectionRequirement) {
      setContactStatus({
        type: "error",
        message: "Please enter your name, email, and inspection requirement."
      });
      return;
    }

    setContactStatus({ type: "loading", message: "Sending..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Unable to send right now.");
      }

      formElement.reset();
      setContactStatus({
        type: "success",
        message: "Message received. Amit will reply shortly."
      });
    } catch (error) {
      setContactStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to send right now."
      });
    }
  }, []);

  const handleProjectToggle = useCallback((title: string) => {
    setExpandedProject((prev) => (prev === title ? "" : title));
  }, []);

  // Filtered projects
  const filteredProjects = selectedProjects.filter((p) => {
    if (projectFilter === "All") return true;
    if (projectFilter === "Inspection") return p.category === "Inspection";
    if (projectFilter === "Automation") return p.category === "Automation" || p.category === "Workflow";
    return true;
  });

  return (
    <div className="relative min-h-screen bg-[#F5F6F3] text-[#172B2A]">
      {/* Top Reading Progress Indicator */}
      <ProgressBar progress={progress} />

      {/* Ambient Soft Refraction Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[8%] right-[5%] h-96 w-96 rounded-full bg-[#DCE8E2]/60 blur-[90px]" />
        <div className="absolute top-[38%] left-[-5%] h-80 w-80 rounded-full bg-[#347C72]/[0.08] blur-[100px]" />
        <div className="absolute top-[68%] right-[8%] h-96 w-96 rounded-full bg-[#EAE5D8]/70 blur-[90px]" />
      </div>

      {/* Frosted Glass Navigation Bar */}
      <header className="glass-nav sticky top-0 z-40">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-8">
          {/* Brand */}
          <a href="#home" className="flex items-center gap-2.5 group" aria-label="Amit Maurya Homepage">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white bg-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/avatar.png"
                alt="Amit Maurya"
                fill
                priority
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div>
              <span className="block text-sm font-bold text-[#172B2A] tracking-tight group-hover:text-[#347C72] transition-colors">
                Amit Maurya
              </span>
              <span className="block text-[10px] text-[#697570] -mt-0.5">
                Machine Vision & Controls
              </span>
            </div>
          </a>

          {/* Desktop Nav Items with Active Indicator */}
          <div className="hidden items-center gap-5 sm:flex">
            {navigationLinks.map((item) => {
              const targetId = item.href.replace("#", "");
              const isActive = activeSection === targetId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-xs font-semibold transition-colors relative py-1 ${
                    isActive ? "text-[#172B2A] font-bold" : "text-[#697570] hover:text-[#172B2A]"
                  }`}
                >
                  {item.label}
                  {isActive && item.href.startsWith("#") && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#347C72] rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Action */}
          <div className="flex items-center gap-2.5">
            <a
              href="#contact"
              className="hidden sm:inline-flex rounded-xl bg-[#172B2A] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#284442] shadow-sm"
            >
              Get in Touch
            </a>
            <div className="sm:hidden">
              <MobileMenu navItems={navigationLinks} />
            </div>
          </div>
        </nav>
      </header>

      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8">
        {/* Hero Section */}
        <section id="home" className="pt-10 pb-14 sm:pt-16 sm:pb-20">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <motion.div {...fadeUp}>
              <div className="glass-pill mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#347C72]" />
                <span>Automated Quality Inspection</span>
              </div>

              <h1 className="text-balance text-3xl font-bold tracking-tight text-[#172B2A] font-display sm:text-4xl md:text-5xl leading-[1.15]">
                Turn Visual Checks Into Automated Decisions.
              </h1>

              <p className="mt-3.5 max-w-lg text-sm leading-relaxed text-[#697570] sm:text-base">
                I build camera-based inspection cells that catch defects, measure sub-millimeter angles, and interface directly with Siemens PLCs — eliminating manual inspection bottlenecks.
              </p>

              {/* Realistic CTAs */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#172B2A] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#284442] shadow-sm"
                >
                  <span>Discuss a Project</span>
                  <ArrowRight size={13} />
                </a>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-[#172B2A] hover:text-[#347C72] transition-colors"
                >
                  <MessageCircle size={14} className="text-[#347C72]" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="/MY_RESUME.pdf"
                  download
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#697570] hover:text-[#172B2A] transition-colors px-2 py-2"
                >
                  <Download size={13} />
                  <span>Resume</span>
                </a>
              </div>
            </motion.div>

            {/* Right: Clean Hero Engineering Card */}
            <motion.div {...fadeUp}>
              <HeroEngineeringCard />
            </motion.div>
          </div>
        </section>

        {/* Selected Work (Projects) */}
        <section id="projects" className="py-12 sm:py-18 border-t border-[#E5E9E5]/70">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="glass-pill mb-1.5">
                Selected Work
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#172B2A] font-display sm:text-3xl">
                Field Projects & Deployments
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 rounded-xl bg-white/70 p-1 border border-[#E5E9E5] backdrop-blur-sm self-start sm:self-auto">
              {["All", "Inspection", "Automation"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    projectFilter === cat
                      ? "bg-[#172B2A] text-white shadow-sm font-bold"
                      : "text-[#697570] hover:text-[#172B2A]"
                  }`}
                >
                  {cat === "All" ? "All" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                expanded={expandedProject === project.title}
                onToggle={() => handleProjectToggle(project.title)}
              />
            ))}
          </div>
        </section>

        {/* Interactive Vision Sandbox */}
        <section id="sandbox" className="py-12 sm:py-18 border-t border-[#E5E9E5]/70">
          <div className="mb-6">
            <span className="glass-pill mb-1.5">
              Interactive Logic
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[#172B2A] font-display sm:text-3xl">
              Inspect Part Features in Real Time
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#697570]">
              Toggle part condition to test how the inspection logic evaluates features and writes result bits.
            </p>
          </div>

          <VisionSimulator />
        </section>

        {/* Core Technical Stack */}
        <section id="stack" className="py-12 sm:py-18 border-t border-[#E5E9E5]/70">
          <div className="mb-6">
            <span className="glass-pill mb-1.5">
              Core Stack
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[#172B2A] font-display sm:text-3xl">
              Technologies & Automation Tools
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#697570]">
              Tested on the plant floor under real vibration, changing lighting, and machine cycle constraints.
            </p>
          </div>

          <SkillsSection />
        </section>

        {/* Contact / Direct Inquiries */}
        <section id="contact" className="py-12 sm:py-18 border-t border-[#E5E9E5]/70">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Left Contact Card with Instant Copy Buttons */}
            <div className="glass-card p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <span className="glass-pill mb-2">
                  Direct Inquiries
                </span>
                <h2 className="text-xl font-bold tracking-tight text-[#172B2A] font-display sm:text-2xl">
                  Let&apos;s Discuss an Inspection Cell
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-[#697570]">
                  Reach out directly via email, phone, or WhatsApp for project inquiries or technical feasibility assessments.
                </p>

                <div className="mt-5 space-y-2">
                  {/* Email with Copy */}
                  <div className="glass-card-inset flex items-center justify-between p-3 text-xs font-semibold text-[#172B2A]">
                    <a
                      href="mailto:amitmauryaajm@gmail.com"
                      className="flex items-center gap-2.5 truncate hover:text-[#347C72] transition-colors"
                    >
                      <Mail size={15} className="text-[#347C72] shrink-0" />
                      <span className="truncate">amitmauryaajm@gmail.com</span>
                    </a>
                    <button
                      onClick={() => handleCopy("amitmauryaajm@gmail.com", "email")}
                      className="text-[#697570] hover:text-[#172B2A] p-1 rounded-md transition-colors shrink-0 ml-1"
                      title="Copy email"
                    >
                      {copiedItem === "email" ? (
                        <Check size={14} className="text-[#347C72]" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>

                  {/* WhatsApp with Copy */}
                  <div className="glass-card-inset flex items-center justify-between p-3 text-xs font-semibold text-[#172B2A]">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2.5 hover:text-[#347C72] transition-colors"
                    >
                      <MessageCircle size={15} className="text-[#347C72] shrink-0" />
                      <span>+91 8810964633 (WhatsApp)</span>
                    </a>
                    <button
                      onClick={() => handleCopy("8810964633", "phone")}
                      className="text-[#697570] hover:text-[#172B2A] p-1 rounded-md transition-colors shrink-0 ml-1"
                      title="Copy phone"
                    >
                      {copiedItem === "phone" ? (
                        <Check size={14} className="text-[#347C72]" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/amit-maurya-84b0922a5/"
                    target="_blank"
                    rel="noreferrer"
                    className="glass-card-inset flex items-center justify-between p-3 text-xs font-semibold text-[#172B2A] hover:bg-white transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Linkedin size={15} className="text-[#347C72] shrink-0" />
                      <span>LinkedIn Profile</span>
                    </div>
                    <ExternalLink size={13} className="text-[#697570]" />
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/Rishbyte-lgtm"
                    target="_blank"
                    rel="noreferrer"
                    className="glass-card-inset flex items-center justify-between p-3 text-xs font-semibold text-[#172B2A] hover:bg-white transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Github size={15} className="text-[#347C72] shrink-0" />
                      <span>GitHub Repositories</span>
                    </div>
                    <ExternalLink size={13} className="text-[#697570]" />
                  </a>
                </div>
              </div>

              <div className="mt-5 text-[11px] text-[#697570]">
                📍 Based in India • Delivering camera inspection systems for manufacturing lines.
              </div>
            </div>

            {/* Right Simple Contact Form */}
            <form onSubmit={handleInquiry} className="glass-card p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#172B2A] font-display">
                  Quick Requirement Note
                </h3>
                <p className="mt-1 text-xs text-[#697570]">
                  Send part details or current manual inspection process.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[11px] font-semibold text-[#172B2A]">Your Name</span>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      className="mt-1 w-full rounded-xl border border-[#E5E9E5] bg-white/80 px-3 py-2 text-xs text-[#172B2A] outline-none transition focus:border-[#347C72]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] font-semibold text-[#172B2A]">Email</span>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="mt-1 w-full rounded-xl border border-[#E5E9E5] bg-white/80 px-3 py-2 text-xs text-[#172B2A] outline-none transition focus:border-[#347C72]"
                    />
                  </label>
                </div>

                <label className="mt-3 block">
                  <span className="text-[11px] font-semibold text-[#172B2A]">
                    What needs to be inspected?
                  </span>
                  <input
                    name="inspectionRequirement"
                    type="text"
                    required
                    placeholder="e.g. Camshaft angle, sealant void check, missing clip"
                    className="mt-1 w-full rounded-xl border border-[#E5E9E5] bg-white/80 px-3 py-2 text-xs text-[#172B2A] outline-none transition focus:border-[#347C72]"
                  />
                </label>

                <label className="mt-3 block">
                  <span className="text-[11px] font-semibold text-[#172B2A]">
                    Message / Additional Context
                  </span>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Approximate line speed (parts per min), camera mounting room, sample defect size..."
                    className="mt-1 w-full resize-none rounded-xl border border-[#E5E9E5] bg-white/80 px-3 py-2 text-xs text-[#172B2A] outline-none transition focus:border-[#347C72]"
                  />
                </label>
              </div>

              {contactStatus.type !== "idle" && (
                <div
                  role="status"
                  className={`mt-3 rounded-xl p-2.5 text-xs font-semibold ${
                    contactStatus.type === "success"
                      ? "bg-[#DCE8E2] text-[#172B2A]"
                      : contactStatus.type === "error"
                        ? "bg-red-50 text-red-800"
                        : "bg-[#F5F6F3] text-[#172B2A]"
                  }`}
                >
                  {contactStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={contactStatus.type === "loading"}
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#172B2A] py-2.5 px-5 text-xs font-semibold text-white transition hover:bg-[#284442] active:scale-[0.99] disabled:opacity-60 self-start shadow-sm"
              >
                {contactStatus.type === "loading" ? "Sending..." : "Send Note"}
                <Send size={12} />
              </button>
            </form>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="py-8 sm:py-10 border-t border-[#E5E9E5]/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#697570]">
          <div>
            &copy; {new Date().getFullYear()} Amit Maurya. Machine Vision & Automation.
          </div>
          <div className="flex gap-4">
            <a href="#home" className="hover:text-[#172B2A] transition-colors">Overview</a>
            <a href="#projects" className="hover:text-[#172B2A] transition-colors">Projects</a>
            <a href="/proof" className="hover:text-[#172B2A] transition-colors">Proof Library</a>
            <a href="#contact" className="hover:text-[#172B2A] transition-colors">Contact</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
