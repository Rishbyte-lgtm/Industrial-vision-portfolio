"use client";

import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  title: string;
  category?: string;
}

export default function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
  category
}: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#172B2A]/60 p-4 sm:p-6 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card relative max-h-[90vh] w-full max-w-4xl overflow-hidden bg-white/95 p-4 sm:p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E5E9E5] pb-3 mb-4">
              <div>
                {category && (
                  <span className="glass-pill text-[10px] mb-1">
                    {category}
                  </span>
                )}
                <h3 className="text-base sm:text-lg font-bold text-[#172B2A] font-display">
                  {title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-xl border border-[#E5E9E5] bg-white text-[#172B2A] transition hover:bg-[#F5F6F3]"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* High-res Image Container */}
            <div className="relative aspect-[16/10] w-full max-h-[65vh] overflow-hidden rounded-xl border border-[#E5E9E5] bg-[#ECEEEA]/70">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-contain p-2"
                sizes="(max-width: 1024px) 95vw, 1200px"
              />
            </div>

            {/* Footer with Hint */}
            <div className="mt-3 flex items-center justify-between text-xs text-[#697570]">
              <span className="flex items-center gap-1.5">
                <ZoomIn size={13} className="text-[#347C72]" /> High-resolution system capture
              </span>
              <span>Press ESC or click anywhere outside to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
