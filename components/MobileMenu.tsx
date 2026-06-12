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
        className="grid h-11 w-11 place-items-center rounded border border-white/12 bg-white/6 lg:hidden light:border-slate-900/10 light:bg-white"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10 bg-[#07080b]/95 px-5 py-4 lg:hidden light:border-slate-900/10 light:bg-white/95"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={handleNavClick}
                className="block rounded px-3 py-3 font-semibold text-white/76 transition hover:bg-white/8 light:text-slate-800 light:hover:bg-slate-900/10"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}