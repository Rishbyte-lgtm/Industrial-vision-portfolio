"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Check, Play, Maximize2 } from "lucide-react";
import React, { useState } from "react";
import ImageModal from "./ImageModal";

export type CaseStudy = {
  title: string;
  category: "Inspection" | "Automation" | "Workflow";
  image: string;
  summary: string;
  problem: string;
  solution: string;
  workflow: string[];
  technologies: string[];
  demoVideo?: boolean;
};

interface ProjectCardProps {
  project: CaseStudy;
  expanded: boolean;
  onToggle: () => void;
}

export default function ProjectCard({ project, expanded, onToggle }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article className="glass-card glass-card-hover overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[0.88fr_1.12fr]">
          {/* Project Visual with Click to Expand */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="group/img cursor-pointer relative min-h-[240px] sm:min-h-[260px] bg-[#ECEEEA]/70 p-4 sm:p-7 flex items-center justify-center border-b border-white/80 lg:border-b-0 lg:border-r"
          >
            <div className="relative w-full h-full min-h-[190px] max-h-[290px] rounded-xl overflow-hidden border border-[#E5E9E5] bg-white shadow-sm">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={`object-contain p-2 transition-transform duration-300 group-hover/img:scale-105 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                sizes="(min-width: 1024px) 40vw, 100vw"
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#172B2A]/0 transition-colors group-hover/img:bg-[#172B2A]/10 flex items-center justify-center">
                <span className="opacity-0 group-hover/img:opacity-100 transition-opacity rounded-full bg-white/90 p-2 text-[#172B2A] shadow-md">
                  <Maximize2 size={16} />
                </span>
              </div>
            </div>
            <span className="glass-pill absolute top-4 left-4 sm:top-5 sm:left-5 text-[10px] sm:text-[11px]">
              {project.category}
            </span>
          </div>

          {/* Realistic, Concise Content */}
          <div className="p-5 sm:p-7 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#347C72] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#347C72]" />
                  Field Project
                </span>
                {project.demoVideo && (
                  <Link
                    href="/proof"
                    className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-[#347C72] border border-[#E5E9E5] hover:bg-white transition-colors"
                  >
                    <Play size={10} className="fill-[#347C72]" />
                    <span>Demo Recording</span>
                  </Link>
                )}
              </div>

              <h3 className="mt-2 text-xl font-bold tracking-tight text-[#172B2A] font-display sm:text-2xl">
                {project.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#697570]">
                {project.summary}
              </p>

              {/* Problem & Solution Inset */}
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                <div className="glass-card-inset p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#172B2A]">
                    Problem
                  </div>
                  <p className="mt-1 text-xs text-[#697570] leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="glass-card-inset p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#347C72]">
                    Engineered Solution
                  </div>
                  <p className="mt-1 text-xs text-[#697570] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-white/80 px-2.5 py-1 text-[11px] font-medium text-[#172B2A] border border-[#E5E9E5]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="mt-5 pt-4 border-t border-[#E5E9E5]/70 flex items-center justify-between">
              <button
                type="button"
                onClick={onToggle}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172B2A] hover:text-[#347C72] transition-colors"
              >
                <span>{expanded ? "Hide Sequence" : "View Sequence Steps"}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 text-[#697570] ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#697570] hover:text-[#172B2A] transition-colors"
              >
                <span>Inquire</span>
                <ArrowUpRight size={13} />
              </a>
            </div>

            {/* Expandable Workflow */}
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 pt-4 border-t border-[#E5E9E5]/70"
              >
                <div className="glass-card-inset p-4">
                  <div className="text-xs font-bold text-[#172B2A] mb-2.5">
                    Inspection Sequence:
                  </div>
                  <ul className="space-y-1.5">
                    {project.workflow.map((step, idx) => (
                      <li key={step} className="flex items-start gap-2 text-xs text-[#697570]">
                        <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#DCE8E2] text-[10px] font-bold text-[#347C72] mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </article>

      {/* Lightbox Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={project.image}
        imageAlt={project.title}
        title={project.title}
        category={project.category}
      />
    </>
  );
}
