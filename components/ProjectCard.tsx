"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, ChevronDown } from "lucide-react";
import { useCallback, useState } from "react";

export type CaseStudy = {
  title: string;
  category: "Inspection" | "Automation" | "Workflow";
  image: string;
  summary: string;
  problem: string;
  challenge: string;
  solution: string;
  workflow: string[];
  technologies: string[];
  personallyBuilt: string[];
};

interface ProjectCardProps {
  project: CaseStudy;
  expanded: boolean;
  onToggle: () => void;
}

export default function ProjectCard({ project, expanded, onToggle }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <motion.article
      layout
      className="industrial-border glass-panel overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid gap-0 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative min-h-[260px] overflow-hidden lg:min-h-full">
          <Image
            src={project.image}
            alt={`${project.title} case study visual`}
            fill
            className={`object-cover transition duration-700 hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            sizes="(min-width: 1024px) 42vw, 100vw"
            onLoad={handleImageLoad}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/12 to-transparent" />
          <span className="absolute left-5 top-5 rounded bg-black/70 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-signal">
            {project.category}
          </span>
        </div>

        <div className="flex flex-col p-5 sm:p-6 md:p-8">
          <h3 className="text-xl font-black sm:text-2xl md:text-3xl">{project.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300 light:text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
            {project.summary}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <CasePoint label="Problem" text={project.problem} />
            <CasePoint label="Challenge" text={project.challenge} />
            <CasePoint label="Solution" text={project.solution} />
          </div>

          <button
            type="button"
            onClick={onToggle}
            className="mt-5 inline-flex items-center gap-2 rounded border border-white/14 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:border-cyanline/50 hover:bg-cyanline/8 light:border-slate-900/14 light:text-slate-950 sm:mt-6 sm:px-4 sm:py-3 sm:text-sm"
            aria-expanded={expanded}
          >
            Case Study Details
            <ChevronDown className={`transition duration-300 ${expanded ? "rotate-180" : ""}`} size={16} />
          </button>

          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-5 grid gap-4 rounded border border-white/10 bg-black/22 p-4 light:border-slate-900/10 light:bg-white/52 sm:p-5 lg:grid-cols-3">
                <DetailList title="Workflow" items={project.workflow} accent="text-cyanline" />
                <DetailList title="Technologies Used" items={project.technologies} accent="text-signal" />
                <DetailList title="Personally Built" items={project.personallyBuilt} accent="text-amberline" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function CasePoint({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded border border-white/10 bg-white/5 p-3 light:border-slate-900/10 light:bg-white/40">
      <div className="text-xs font-black uppercase tracking-[0.18em] text-cyanline">{label}</div>
      <p className="mt-2 text-xs leading-5 text-slate-300 light:text-slate-600 sm:text-sm sm:leading-6">{text}</p>
    </div>
  );
}

function DetailList({ title, items, accent }: { title: string; items: string[]; accent: string }) {
  return (
    <div>
      <div className={`text-xs font-black uppercase tracking-[0.2em] ${accent}`}>{title}</div>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div key={item} className="flex gap-2 text-xs leading-5 text-slate-300 light:text-slate-600 sm:text-sm sm:leading-6">
            <BadgeCheck className={`mt-0.5 shrink-0 ${accent}`} size={15} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
