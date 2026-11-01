"use client";

import { Camera, Cpu, Monitor } from "lucide-react";
import React from "react";

interface SkillCategory {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  skills: { name: string; note: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Computer Vision & AI",
    description: "Image acquisition, geometric feature extraction, and neural defect detection.",
    icon: Camera,
    skills: [
      { name: "OpenCV (Python)", note: "Vector contours & metrology" },
      { name: "YOLOv8 / YOLOv11", note: "Object & anomaly detection" },
      { name: "Basler / GigE Cameras", note: "Hardware strobe triggering" },
      { name: "Telecentric Optics", note: "Dimensional calibration" }
    ]
  },
  {
    title: "PLC & Industrial Controls",
    description: "Deterministic hardware handshakes and machine sequence synchronization.",
    icon: Cpu,
    skills: [
      { name: "Siemens S7-1200 / S7-1500", note: "Ladder & DB blocks" },
      { name: "TIA Portal V17 / V18", note: "Hardware configuration" },
      { name: "Snap7 S7comm Protocol", note: "Python-to-PLC bridge" },
      { name: "24V Optical Isolation", note: "Noise-immune digital I/O" }
    ]
  },
  {
    title: "Software & Operator HMI",
    description: "Rugged touchscreen interfaces, thread-safe queues, and automated defect logs.",
    icon: Monitor,
    skills: [
      { name: "PyQt6 / PySide6", note: "Shop-floor touch dashboard" },
      { name: "Thread-Safe Frame Queues", note: "Low-latency pipelines" },
      { name: "SQLite & CSV Logging", note: "Audit trail recordkeeping" },
      { name: "Next.js & TypeScript", note: "Remote monitoring consoles" }
    ]
  }
];

export default function SkillsSection() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {skillCategories.map((cat) => {
        const Icon = cat.icon;
        return (
          <div
            key={cat.title}
            className="glass-card glass-card-hover p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#DCE8E2]/80 text-[#347C72] border border-white">
                  <Icon size={18} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#697570]">
                  Core Toolset
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold tracking-tight text-[#172B2A] font-display">
                {cat.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#697570]">
                {cat.description}
              </p>

              {/* Skills List */}
              <div className="mt-5 space-y-2">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="glass-card-inset flex items-center justify-between px-3 py-2 text-xs"
                  >
                    <span className="font-semibold text-[#172B2A]">{skill.name}</span>
                    <span className="text-[11px] text-[#697570]">{skill.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
