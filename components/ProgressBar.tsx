"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: ReturnType<typeof import("framer-motion").useSpring>;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-transparent">
      <motion.div
        className="h-full origin-left bg-[#347C72]"
        style={{ scaleX: progress }}
      />
    </div>
  );
}
