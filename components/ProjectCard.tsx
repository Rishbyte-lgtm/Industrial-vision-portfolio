"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, ChevronDown } from "lucide-react";
import { useState, useCallback } from "react";

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

interface ProjectCardProps {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
}

/**
 * Memoized project card component
 * Prevents unnecessary re-renders of sibling cards
 */
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
      <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
        {/* Image container */}
        <div className="relative min-h-[260px] overflow-hidden lg:min-h-full">
          <Image
            src={project.image}
            alt={`${project.title} project visual`}
            fill
            className={`object-cover transition duration-700 hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(min-width: 1024px) 44vw, 100vw"
            onLoad={handleImageLoad}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/12 to-transparent" />
          <span className="absolute left-5 top-5 rounded bg-black/70 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-signal">
            {project.category}
          </span>
        </div>

        {/* Content container */}
        <div className="flex flex-col p-5 sm:p-6 md:p-8">
          <h3 className="text-xl font-black sm:text-2xl md:text-3xl">{project.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300 light:text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded border border-white/10 bg-white/7 px-2 py-1 text-xs font-bold text-slate-200 light:border-slate-900/10 light:text-slate-700 sm:px-3 sm:py-1.5"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Features */}
          <div className="mt-5 grid gap-2 sm:grid-cols-2 sm:gap-3 md:mt-6">
            {project.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-xs font-semibold text-slate-200 light:text-slate-700 sm:gap-3 sm:text-sm">
                <BadgeCheck className="shrink-0 text-signal" size={16} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Expand button */}
          <button
            onClick={onToggle}
            className="mt-5 inline-flex items-center gap-2 rounded border border-white/14 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:border-cyanline/50 hover:bg-cyanline/8 sm:mt-6 sm:px-4 sm:py-3 sm:text-sm light:border-slate-900/14 light:text-slate-950"
            aria-expanded={expanded}
          >
            Architecture Details
            <ChevronDown className={`transition duration-300 ${expanded ? "rotate-180" : ""}`} size={16} />
          </button>

          {/* Expanded details */}
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-5 grid gap-3 rounded border border-white/10 bg-black/22 p-4 light:border-slate-900/10 light:bg-white/52 sm:grid-cols-2 sm:gap-4 sm:p-5">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-cyanline">Architecture</div>
                  <p className="mt-2 text-xs leading-5 text-slate-300 light:text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">
                    {project.architecture}
                  </p>
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-signal">Production Value</div>
                  <p className="mt-2 text-xs leading-5 text-slate-300 light:text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">
                    {project.impact}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  );
}