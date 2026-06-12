"use client";

import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Download,
  ExternalLink,
  Factory,
  FileBadge,
  Gauge,
  Github,
  ImageIcon,
  Linkedin,
  Mail,
  MessageCircle,
  MonitorCheck,
  Ruler,
  ScanSearch,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Wrench,
  Zap
} from "lucide-react";
import { FormEvent, useCallback, useMemo, useState } from "react";
import BackgroundEffects from "./BackgroundEffects";
import MobileMenu from "./MobileMenu";
import ProgressBar from "./ProgressBar";
import ProjectCard, { type CaseStudy } from "./ProjectCard";

type Service = {
  title: string;
  description: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

type ContactStatus = {
  type: "idle" | "loading" | "success" | "error";
  message: string;
};

const navItems = ["Home", "Services", "Projects", "Proof", "Development", "Why", "Contact"];

const services: Service[] = [
  {
    title: "Defect Detection Systems",
    description: "Camera-based checks for visible defects, missing areas, incorrect features, or abnormal product conditions.",
    value: "Helps reduce manual checking and gives operators a clearer OK/NOK decision path.",
    icon: ScanSearch
  },
  {
    title: "Part Presence Verification",
    description: "Inspection logic to confirm whether required parts, holes, labels, or components are present before the next process step.",
    value: "Helps catch assembly mistakes earlier and supports more consistent quality control.",
    icon: ClipboardCheck
  },
  {
    title: "Automated Quality Inspection",
    description: "Custom inspection workflows that combine cameras, decision rules, operator screens, and result logging.",
    value: "Turns repeatable visual checks into a structured inspection process.",
    icon: CheckCircle2
  },
  {
    title: "Camera-Based Measurement",
    description: "Vision systems for angle checks, dimensional references, alignment checks, and feature position validation.",
    value: "Useful where manual judgement is slow, inconsistent, or hard to document.",
    icon: Ruler
  },
  {
    title: "PLC-Connected Workflows",
    description: "Inspection systems that receive machine triggers and return inspection results to the automation process.",
    value: "Helps connect quality decisions with the existing production sequence.",
    icon: SlidersHorizontal
  },
  {
    title: "Operator Dashboards",
    description: "Simple screens for operators to view inspection status, PASS/FAIL results, images, and basic process feedback.",
    value: "Makes inspection systems easier to use on the shop floor.",
    icon: Gauge
  }
];

const caseStudies: CaseStudy[] = [
  {
    title: "Camshaft Angle Detection System",
    category: "Inspection",
    image: "/Project-images/real_screenshot_camshaft.png",
    summary:
      "A camera-based inspection project focused on checking camshaft angle position and giving a clear PASS/FAIL decision to support quality inspection.",
    problem:
      "Manual angle checking can depend on operator judgement and may slow down repeatable inspection work.",
    challenge:
      "The inspection needed a clear decision workflow, image processing logic, operator visibility, and a path for PLC-triggered operation.",
    solution:
      "Built a vision workflow that captures the inspection image, analyzes the camshaft position, displays the result on an operator interface, and prepares the result for automation handoff.",
    workflow: [
      "Camera captures the part image",
      "Inspection logic checks angle-related visual features",
      "Operator screen shows the image and PASS/FAIL result",
      "PLC communication layer can exchange trigger and result signals"
    ],
    technologies: ["Python", "OpenCV", "YOLOv8", "PyQt", "Snap7", "Siemens PLC"],
    personallyBuilt: [
      "Inspection logic and image-processing workflow",
      "Operator dashboard concept",
      "PASS/FAIL decision flow",
      "PLC communication approach using Snap7"
    ]
  },
  {
    title: "PLC-Connected Vision Inspection Workflow",
    category: "Automation",
    image: "/images/plc-vision.png",
    summary:
      "A machine-vision workflow designed around PLC triggers, inspection decisions, and result communication for production-style automation.",
    problem:
      "A vision system is only useful in manufacturing when it can fit into the machine sequence instead of working as a disconnected demo.",
    challenge:
      "The system needed to read inspection triggers, process images, and return useful result states for downstream machine logic.",
    solution:
      "Created a PLC communication pattern where the inspection node can receive a trigger, run the vision check, and write result data back for the automation process.",
    workflow: [
      "PLC sends inspection trigger",
      "Vision node captures or processes the image",
      "Inspection result is generated",
      "Result state is written back for machine or operator action"
    ],
    technologies: ["Siemens PLC", "TIA Portal", "Snap7", "Python", "OpenCV"],
    personallyBuilt: [
      "PLC trigger/result communication flow",
      "Vision-side inspection process",
      "Result mapping concept for automation use",
      "Industrial workflow documentation"
    ]
  },
  {
    title: "Vision Project Orchestration Unit",
    category: "Workflow",
    image: "/images/vision-orchestration.png",
    summary:
      "A software concept for organizing machine-vision work from data handling to controlled model and workflow management.",
    problem:
      "Vision projects can become hard to manage when images, models, tests, and deployment notes are scattered.",
    challenge:
      "The system needed a more organized way to track project assets, training work, and deployment readiness.",
    solution:
      "Designed a control-plane style workflow to manage datasets, model versions, inference nodes, and inspection project status.",
    workflow: [
      "Collect and organize inspection images",
      "Track model or rule-based inspection versions",
      "Monitor workflow readiness",
      "Prepare controlled rollout information"
    ],
    technologies: ["TypeScript", "Python", "APIs", "Databases", "YOLOv8"],
    personallyBuilt: [
      "Workflow structure",
      "Project management concept",
      "Vision pipeline planning",
      "Frontend control-plane approach"
    ]
  }
];

const trustPoints = [
  "Mechatronics background with interest in machines, controls, and inspection workflows.",
  "Hands-on project experience with camera inspection, operator dashboards, and PLC communication concepts.",
  "Custom solution mindset instead of one-size-fits-all software.",
  "Direct communication with the person building the inspection logic.",
  "Comfortable discussing both shop-floor problems and technical implementation details."
];

const developmentItems = [
  "Missing sealant detection",
  "OK/NOK classification",
  "Quality inspection workflow",
  "Future PLC integration"
];

const proofItems = [
  {
    title: "End-to-End Demo Video",
    status: "Available",
    description: "A short walkthrough showing image capture, inspection decision, operator screen, and PLC/result workflow.",
    icon: MonitorCheck
  },
  {
    title: "Project Screenshots",
    status: "Available",
    description: "Current project visuals show inspection, PLC workflow, and orchestration concepts already used across the portfolio.",
    icon: ImageIcon
  },
  {
    title: "Sample Inspection Outputs",
    status: "Available",
    description: "Before/after examples, OK/NOK result screens, annotated detections, and rejected-part examples.",
    icon: ScanSearch
  },

];

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Amit, I want to discuss an inspection automation requirement.")}`
  : "";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
};

export default function PortfolioClient() {
  const [expandedProject, setExpandedProject] = useState(caseStudies[0].title);
  const [contactStatus, setContactStatus] = useState<ContactStatus>({ type: "idle", message: "" });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.2 });

  const serviceCards = useMemo(() => services, []);

  const handleInquiry = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      company: String(form.get("company") ?? "").trim(),
      industry: String(form.get("industry") ?? "").trim(),
      inspectionRequirement: String(form.get("inspectionRequirement") ?? "").trim(),
      timeline: String(form.get("timeline") ?? "").trim(),
      plcBrand: String(form.get("plcBrand") ?? "").trim(),
      budgetRange: String(form.get("budgetRange") ?? "").trim(),
      message: String(form.get("message") ?? "").trim()
    };

    if (!payload.name || !payload.email || !payload.inspectionRequirement) {
      setContactStatus({
        type: "error",
        message: "Please enter your name, email, and inspection requirement."
      });
      return;
    }

    setContactStatus({ type: "loading", message: "Sending requirement..." });

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
        throw new Error(data.error ?? "Unable to send your requirement right now.");
      }

      formElement.reset();
      setContactStatus({
        type: "success",
        message: "Requirement sent successfully. Amit will review it and reply soon."
      });
    } catch (error) {
      setContactStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to send your requirement right now."
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
            <span className="grid h-10 w-10 place-items-center rounded bg-white text-slate-950 shadow-glow light:bg-slate-950 light:text-white sm:h-11 sm:w-11">
              <Factory size={20} />
            </span>
            <span className="hidden sm:block">
              <span className="block text-base font-black tracking-[0.18em] sm:text-lg">AMIT</span>
              <span className="block text-xs font-bold uppercase tracking-[0.24em] text-cyanline">Inspection Automation</span>
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

          <MobileMenu navItems={navItems} />
        </nav>
      </header>

      <section id="home" className="relative mx-auto min-h-screen max-w-7xl px-4 pb-12 pt-24 sm:px-5 sm:pb-20 sm:pt-32 md:px-8 lg:pt-36">
        <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <motion.div {...fadeUp}>
            <div className="mb-4 inline-flex items-center gap-2 rounded border border-cyanline/30 bg-cyanline/8 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyanline sm:mb-6 sm:gap-3 sm:px-4">
              <span className="h-2 w-2 rounded-full bg-signal shadow-signal" />
              Manufacturing Vision Systems
            </div>
            <h1 className="max-w-4xl text-balance text-4xl font-black leading-tight tracking-normal sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[0.98]">
              Automated Vision Inspection Systems for Manufacturing
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 light:text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
              Helping manufacturers automate quality checks, validate parts, and reduce manual inspection using camera-based inspection systems.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded bg-white px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-slate-950 transition hover:bg-cyanline sm:px-6 sm:text-sm"
              >
                Request Consultation <ArrowRight className="transition group-hover:translate-x-1" size={16} />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded border border-white/16 bg-white/7 px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:border-cyanline/50 hover:bg-cyanline/8 light:border-slate-900/12 light:text-slate-950 sm:px-6 sm:text-sm"
              >
                View Projects <ScanSearch size={16} />
              </a>
              <a
                href="/Amit-Maurya-Resume-Brief.txt"
                download
                className="inline-flex items-center justify-center gap-2 rounded border border-cyanline/38 bg-cyanline/10 px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-cyanline transition hover:bg-cyanline/20 sm:px-6 sm:text-sm"
              >
                Resume <Download size={16} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="industrial-border glass-panel relative overflow-hidden rounded-lg"
          >
            <div className="relative aspect-[1.08] overflow-hidden rounded bg-slate-950">
              <Image
                src="/images/camshaft-vision.png"
                alt="Camera-based manufacturing inspection system"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 grid gap-2 sm:bottom-5 sm:left-5 sm:right-5 sm:grid-cols-3 sm:gap-3">
                {["Defect checks", "Part validation", "PASS/FAIL flow"].map((label) => (
                  <div key={label} className="rounded border border-white/12 bg-black/54 p-3 backdrop-blur sm:p-4">
                    <BadgeCheck className="text-signal" size={20} />
                    <div className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-200">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Section id="services" label="Client Problems" title="Inspection Systems Built Around Manufacturing Outcomes">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {serviceCards.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article key={service.title} {...fadeUp} className="glass-panel rounded-lg p-5 sm:p-6">
                <span className="grid h-12 w-12 place-items-center rounded bg-cyanline/12 text-cyanline">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-xl font-black">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300 light:text-slate-600">{service.description}</p>
                <p className="mt-4 border-t border-white/10 pt-4 text-sm font-semibold leading-6 text-white light:border-slate-900/10 light:text-slate-900">
                  {service.value}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Section>

      <Section id="projects" label="Case Studies" title="Project Work Explained as Inspection Problems">
        <div className="grid gap-5 sm:gap-7">
          {caseStudies.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              expanded={expandedProject === project.title}
              onToggle={() => handleProjectToggle(project.title)}
            />
          ))}
        </div>
      </Section>

      <Section id="proof" label="Proof Library" title="Evidence a Manufacturing Buyer Can Review">
        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div {...fadeUp} className="industrial-border glass-panel overflow-hidden rounded-lg">
            <div className="relative min-h-[650px] bg-slate-950">
              <Image
                src="/images/camshaft-vision.png"
                alt="Camshaft inspection project visual evidence"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 44vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="inline-flex rounded bg-signal px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-950">
                  Evidence hub
                </div>
                <h3 className="mt-4 max-w-xl text-2xl font-black sm:text-3xl">Show the inspection working, not just the technology behind it.</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                  The dedicated proof page is structured for demo videos, screenshots, output samples, certificates, and real setup photos.
                </p>
              </div>
            </div>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {proofItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article key={item.title} {...fadeUp} className="glass-panel rounded-lg p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded bg-cyanline/12 text-cyanline">
                      <Icon size={21} />
                    </span>
                    <span className={`rounded px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] ${item.status === "Available" ? "bg-signal text-slate-950" : "bg-amberline text-slate-950"}`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300 light:text-slate-600">{item.description}</p>
                </motion.article>
              );
            })}
            <motion.a
              {...fadeUp}
              href="/proof"
              className="group inline-flex items-center justify-center gap-2 rounded bg-white px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-slate-950 transition hover:bg-cyanline sm:col-span-2 sm:text-sm"
            >
              Open Proof Page <ArrowRight className="transition group-hover:translate-x-1" size={16} />
            </motion.a>
          </div>
        </div>
      </Section>

      <Section id="development" label="Currently Developing" title="AI-Based Sealant Inspection System">
        <motion.div {...fadeUp} className="industrial-border glass-panel overflow-hidden rounded-lg">
          <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="relative min-h-[260px] overflow-hidden bg-slate-950">
              <Image
                src="/images/plc-vision.png"
                alt="Inspection workflow development visual"
                fill
                className="object-cover opacity-72"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/24 to-transparent" />
              <span className="absolute left-5 top-5 rounded bg-amberline px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-950">
                In Development
              </span>
            </div>
            <div className="p-5 sm:p-7">
              <p className="text-base leading-7 text-slate-300 light:text-slate-600">
                This project is being developed as a camera-based quality inspection workflow for sealant application checks. It is not presented as a completed deployment.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {developmentItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded border border-white/10 bg-white/5 p-3 text-sm font-semibold text-slate-200 light:border-slate-900/10 light:text-slate-700">
                    <Wrench className="shrink-0 text-amberline" size={17} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      <Section id="why" label="Why Work With Me" title="A Practical Builder for Custom Inspection Problems">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <motion.div {...fadeUp} className="glass-panel rounded-lg p-5 sm:p-7">
            <div className="flex items-start gap-4 sm:gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded bg-white text-slate-950 light:bg-slate-950 light:text-white sm:h-14 sm:w-14">
                <Building2 size={22} />
              </span>
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-cyanline sm:text-sm">Industrial Exposure</div>
                <h3 className="mt-2 text-2xl font-black sm:text-3xl">Mechatronics and Manufacturing Mindset</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300 light:text-slate-600 sm:text-base">
                  My work is shaped by mechatronics, automation interest, and hands-on camera inspection projects. I focus on understanding the inspection requirement first, then choosing the right technical approach.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="industrial-border glass-panel rounded-lg p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded bg-signal/14 text-signal">
                <ShieldCheck size={23} />
              </span>
              <h3 className="text-xl font-black sm:text-2xl">Trust Signals</h3>
            </div>
            <div className="mt-5 space-y-3">
              {trustPoints.map((point) => (
                <div key={point} className="flex gap-3 text-sm leading-6 text-slate-300 light:text-slate-600">
                  <BadgeCheck className="mt-1 shrink-0 text-signal" size={16} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      <Section id="contact" label="Inspection Requirement" title="Discuss Your Manufacturing Inspection Problem">
        <div className="grid gap-5 sm:gap-7 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div {...fadeUp} className="glass-panel rounded-lg p-5 sm:p-7">
            <h3 className="text-xl font-black sm:text-2xl">Start a Conversation</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300 light:text-slate-600">
              Share what needs to be inspected, how the current process works, and what decision the system should make.
            </p>
            <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
              <ContactLink icon={<Mail size={18} />} label="Email" value="amitmauryaajm@gmail.com" href="mailto:amitmauryaajm@gmail.com" />
              {whatsappHref && <ContactLink icon={<MessageCircle size={18} />} label="WhatsApp" value="Discuss requirement" href={whatsappHref} />}
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
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <Field name="name" label="Name" placeholder="Your name" />
              <Field name="email" label="Email" placeholder="you@example.com" type="email" />
              <Field name="company" label="Company" placeholder="Company name" required={false} />
              <Field name="industry" label="Industry" placeholder="Automotive, packaging, pharma..." required={false} />
              <Field name="inspectionRequirement" label="Inspection Requirement" placeholder="What needs to be checked?" />
              <Field name="plcBrand" label="PLC Brand" placeholder="Siemens, Allen-Bradley, Omron..." required={false} />
              <SelectField
                name="timeline"
                label="Timeline"
                options={["Urgent", "This month", "1-3 months", "Exploring"]}
              />
              <SelectField
                name="budgetRange"
                label="Budget Range"
                options={["Below 50000", "50000-100000", "100000-250000", "250000+", "Not decided"]}
              />
            </div>
            <label className="mt-4 block sm:mt-5">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-400 sm:text-sm">Additional Details</span>
              <textarea
                name="message"
                rows={5}
                placeholder="Current manual process, camera availability, machine sequence, sample defects, or project constraints..."
                className="mt-2 w-full resize-none rounded border border-white/12 bg-black/22 px-3 py-2 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyanline light:border-slate-900/12 light:bg-white/10 light:text-slate-950 light:placeholder:text-slate-400 sm:rows-6 sm:px-4 sm:py-3"
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
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded bg-cyanline px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-slate-950 transition hover:bg-signal disabled:opacity-60 sm:mt-5 sm:w-auto sm:px-6 sm:py-4 sm:text-sm"
            >
              {contactStatus.type === "loading" ? "Sending..." : "Discuss Your Inspection Requirement"} <Send size={16} />
            </button>
          </motion.form>
        </div>
      </Section>

      <footer className="relative mx-auto max-w-7xl px-4 py-8 text-xs text-slate-400 sm:px-5 sm:py-10 md:px-8 md:text-sm">
        <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-6 light:border-slate-900/10 sm:gap-4 sm:pt-8 md:flex-row">
          <span>Copyright 2026 Amit Maurya. Manufacturing vision inspection systems.</span>
          <span className="text-xs sm:text-sm">Machine vision inspection | Defect detection | PLC camera inspection</span>
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
        <div className="mb-3 inline-flex items-center gap-2 rounded border border-white/12 bg-white/6 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyanline light:border-slate-900/10 light:bg-slate-900/10 light:text-slate-700 sm:mb-4 sm:gap-3 sm:px-4">
          <Zap size={12} />
          {label}
        </div>
        <h2 className="max-w-4xl text-balance text-2xl font-black leading-tight sm:text-3xl md:text-4xl lg:text-5xl">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

function ContactLink({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="flex items-center justify-between gap-3 rounded border border-white/10 bg-white/5 p-3 transition hover:border-cyanline/50 hover:bg-cyanline/8 light:border-slate-900/10 light:bg-white/5 light:hover:border-slate-700 sm:gap-4 sm:p-4"
    >
      <span className="flex min-w-0 items-center gap-2 sm:gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded bg-cyanline/12 text-cyanline sm:h-10 sm:w-10">{icon}</span>
        <span className="min-w-0">
          <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">{label}</span>
          <span className="block truncate text-sm font-bold text-white light:text-slate-950 sm:text-base">{value}</span>
        </span>
      </span>
      <ExternalLink className="shrink-0 text-slate-400" size={16} />
    </a>
  );
}

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
        className="mt-2 w-full rounded border border-white/12 bg-black/22 px-3 py-2 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyanline light:border-slate-900/12 light:bg-white/10 light:text-slate-950 light:placeholder:text-slate-400 sm:px-4 sm:py-3"
      />
    </label>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-400 sm:text-sm">{label}</span>
      <select
        name={name}
        defaultValue=""
        className="mt-2 w-full rounded border border-white/12 bg-black/22 px-3 py-2 text-sm text-white outline-none transition focus:border-cyanline light:border-slate-900/12 light:bg-white/10 light:text-slate-950 sm:px-4 sm:py-3"
      >
        <option value="" className="bg-slate-950 text-white">
          Select
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-slate-950 text-white">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
