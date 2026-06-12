"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: ReturnType<typeof import("framer-motion").useSpring>;
}

/**
 * Top progress bar indicating scroll position
 * Isolated to prevent parent re-renders
 */
export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-cyanline via-signal to-amberline"
      style={{ scaleX: progress }}
    />
  );
}