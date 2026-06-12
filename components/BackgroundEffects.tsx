"use client";

import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

/**
 * Animated background with grid pattern
 * Optimized for performance with lazy animation start
 */
export default function BackgroundEffects() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Defer animation start to after first paint
  useEffect(() => {
    const timer = requestIdleCallback(() => setShouldAnimate(true), { timeout: 2000 });
    return () => cancelIdleCallback(timer);
  }, []);

  // Mouse position tracking for gradient
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const backgroundImage = useMotionTemplate`radial-gradient(
    600px at ${mouseX}px ${mouseY}px,
    rgba(53, 214, 255, 0.08),
    transparent 80%
  )`;

  return (
    <>
      {/* Grid background - CSS only for performance */}
      <div className="pointer-events-none fixed inset-0 bg-industrial-grid bg-[size:72px_72px] opacity-[0.08] light:opacity-[0.16]" />

      {/* Radial gradient overlay - animated only if shouldAnimate */}
      {shouldAnimate && (
        <motion.div
          className="pointer-events-none fixed inset-0"
          style={{
            backgroundImage
          }}
          onMouseMove={handleMouseMove}
          transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.2 }}
        />
      )}

      {/* Static gradient - no animation */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(53,214,255,0.08),transparent_30%),radial-gradient(circle_at_80%_12%,rgba(57,255,136,0.04),transparent_35%)]" />
    </>
  );
}