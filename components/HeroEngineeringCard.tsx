"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import React from "react";

export default function HeroEngineeringCard() {
  return (
    <div className="glass-card overflow-hidden">
      {/* Real Inspection Visual */}
      <div className="relative aspect-[16/10] w-full bg-[#ECEEEA]/70 p-4 sm:p-5 border-b border-white/80">
        <div className="relative w-full h-full rounded-xl overflow-hidden border border-[#E5E9E5] bg-white shadow-sm">
          <Image
            src="/Project-images/real_screenshot_camshaft.png"
            alt="Camshaft Machine Vision Inspection System"
            fill
            priority
            className="object-contain p-2"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </div>
        <div className="glass-pill absolute top-6 left-6 text-[11px]">
          Live Inspection Cell
        </div>
      </div>

      {/* Engineer Identity & Quick Specifications */}
      <div className="p-5 sm:p-6 bg-white/60 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E5E9E5]/70">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white bg-[#F5F6F3] shadow-sm">
              <Image
                src="/avatar.png"
                alt="Amit Maurya"
                fill
                priority
                className="object-cover"
                sizes="44px"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-[#172B2A] flex items-center gap-1.5">
                Amit Maurya
                <span className="text-[11px] font-normal text-[#697570]">• Mechatronics</span>
              </div>
              <div className="text-xs text-[#697570]">
                Machine Vision & Controls Engineer
              </div>
            </div>
          </div>

          <Link
            href="/proof"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#347C72] hover:text-[#172B2A] transition-colors"
          >
            <Play size={13} className="fill-[#347C72]" />
            <span>Watch Demo</span>
          </Link>
        </div>

        {/* 3 Real Engineering Specifications */}
        <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
          <div className="glass-card-inset p-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#697570]">
              Tolerance
            </div>
            <div className="mt-0.5 text-xs sm:text-sm font-bold text-[#172B2A]">±0.5° Angle</div>
          </div>

          <div className="glass-card-inset p-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#697570]">
              Inference
            </div>
            <div className="mt-0.5 text-xs sm:text-sm font-bold text-[#347C72]">&lt; 15 ms</div>
          </div>

          <div className="glass-card-inset p-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#697570]">
              PLC Link
            </div>
            <div className="mt-0.5 text-xs sm:text-sm font-bold text-[#172B2A]">Snap7 / S7</div>
          </div>
        </div>
      </div>
    </div>
  );
}
