"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  navItems: string[];
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
        className="relative flex h-12 w-12 items-center justify-center rounded-lg border border-white/12 bg-white/8 transition hover:border-white/20 hover:bg-white/12 active:bg-white/16 lg:hidden light:border-slate-900/12 light:bg-slate-900/10 light:hover:border-slate-800 light:hover:bg-slate-900/20 light:active:bg-slate-900/30"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <motion.div
          animate={isOpen ? { rotate: 90, scale: 0.8 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isOpen ? (
            <X size={24} className="text-white light:text-slate-900" strokeWidth={2.5} />
          ) : (
            <Menu size={24} className="text-white light:text-slate-900" strokeWidth={2.5} />
          )}
        </motion.div>
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden light:bg-white/10"
              aria-hidden="true"
            />

            {/* Menu dropdown */}
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="glass-panel fixed left-4 right-4 top-24 z-40 overflow-hidden rounded-lg border border-white/10 lg:hidden light:border-slate-900/10 sm:left-5 sm:right-5"
            >
              <nav className="flex flex-col divide-y divide-white/8 light:divide-slate-900/10">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={handleNavClick}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    className="px-5 py-4 text-sm font-semibold text-white/78 transition hover:bg-white/8 hover:text-white active:bg-white/12 light:text-slate-700 light:hover:bg-slate-900/10 light:hover:text-slate-900 light:active:bg-slate-900/20 sm:text-base"
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
