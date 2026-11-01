"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, MessageCircle } from "lucide-react";

interface MobileMenuProps {
  navItems: { label: string; href: string }[];
  onNavigate?: () => void;
}

export default function MobileMenu({ navItems, onNavigate }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNavClick = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E9E5] bg-white text-[#172B2A] transition hover:bg-[#F5F6F3] active:scale-95 sm:hidden"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-[#172B2A]/30 backdrop-blur-sm sm:hidden"
              aria-hidden="true"
            />

            {/* Clean Frosted Dropdown Sheet */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="glass-card fixed left-4 right-4 top-20 z-50 overflow-hidden bg-white/95 p-4 shadow-2xl sm:hidden"
            >
              <div className="flex items-center justify-between border-b border-[#E5E9E5]/70 pb-3 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#697570]">
                  Navigation
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#347C72] font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#347C72]" />
                  Open for Projects
                </span>
              </div>

              <nav className="mt-2 flex flex-col space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={handleNavClick}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-[#172B2A] transition hover:bg-[#F5F6F3]"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={14} className="text-[#697570]" />
                  </a>
                ))}
              </nav>

              <div className="mt-3 pt-3 border-t border-[#E5E9E5]/70 flex flex-col gap-2">
                <a
                  href="https://wa.me/918810964633?text=Hello%20Amit%2C%20I%20reviewed%20your%20portfolio"
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleNavClick}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#DCE8E2] py-2.5 text-center text-xs font-bold text-[#172B2A] transition hover:bg-[#c9ddd3]"
                >
                  <MessageCircle size={14} className="text-[#347C72]" />
                  <span>WhatsApp: +91 8810964633</span>
                </a>

                <div className="flex gap-2">
                  <a
                    href="#contact"
                    onClick={handleNavClick}
                    className="flex-1 rounded-xl bg-[#172B2A] py-2.5 text-center text-xs font-semibold text-white transition hover:bg-[#284442]"
                  >
                    Get in Touch
                  </a>
                  <a
                    href="/MY_RESUME.pdf"
                    download
                    className="rounded-xl border border-[#E5E9E5] bg-white px-4 py-2.5 text-center text-xs font-semibold text-[#172B2A] hover:bg-[#F5F6F3]"
                  >
                    Resume
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
