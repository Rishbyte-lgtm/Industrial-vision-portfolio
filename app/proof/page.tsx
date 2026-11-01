import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Evidence Library — Machine Vision Inspection",
  description:
    "Engineering evidence library for machine vision inspection work: Camshaft angle demo video, live inspection screenshots, PLC trigger workflows, and defect output logs."
};

const availableVisuals = [
  {
    title: "Camshaft Inspection System Visual",
    image: "/Project-images/real_screenshot_camshaft.png",
    category: "Metrology & Angle",
    description: "Live camera frame with extracted angular vectors and sub-degree tolerance evaluation."
  },
  {
    title: "PLC-Connected Vision Workflow",
    image: "/images/plc-vision.png",
    category: "Hardware Handshake",
    description: "Industrial communication architecture mapping optical inference results to Siemens S7 DB memory bits."
  },
  {
    title: "Vision Pipeline Orchestration",
    image: "/Project-images/vision.png",
    category: "Edge Deployment",
    description: "Centralized inspection console managing edge model checkpoints, camera exposure, and rejection logs."
  }
];

export default function ProofPage() {
  return (
    <div className="relative min-h-screen bg-[#F5F6F3] text-[#172B2A] pb-24">
      {/* Ambient background glows for realistic glass refraction */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[5%] right-[5%] h-96 w-96 rounded-full bg-[#DCE8E2]/60 blur-[90px]" />
        <div className="absolute top-[45%] left-[-5%] h-80 w-80 rounded-full bg-[#347C72]/[0.08] blur-[100px]" />
      </div>

      {/* Frosted Glass Top Header */}
      <div className="glass-nav sticky top-0 z-30">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E5E9E5] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#172B2A] transition hover:bg-white"
          >
            <ArrowLeft size={13} />
            <span>Back to Overview</span>
          </Link>
          <span className="text-xs font-semibold text-[#697570]">
            Evidence & Recordings
          </span>
        </div>
      </div>

      <main className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 pt-10 sm:pt-14">
        {/* Title */}
        <div className="max-w-2xl">
          <span className="glass-pill mb-2">
            Technical Evidence
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#172B2A] font-display sm:text-3xl md:text-4xl">
            Demonstrations & Inspection Proof
          </h1>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#697570]">
            Real screen recordings and system captures demonstrating that these vision pipelines execute reliably on physical hardware.
          </p>
        </div>

        {/* Demo Video Section */}
        <section className="mt-8 sm:mt-12">
          <div className="glass-card p-5 sm:p-7">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#E5E9E5]/70 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#347C72]">
                  Hardware Walkthrough
                </span>
                <h2 className="text-lg font-bold text-[#172B2A] font-display sm:text-xl">
                  Camshaft Angle Detection System Demo
                </h2>
              </div>
              <span className="glass-pill self-start sm:self-center text-[10px]">
                Recorded Output
              </span>
            </div>

            <p className="mb-4 text-xs text-[#697570] leading-relaxed max-w-2xl">
              Demonstrating the full sequence: frame acquisition, contour extraction, sub-degree vector angle calculation, touch HMI update, and PASS / FAIL decision state machine.
            </p>

            <div className="overflow-hidden rounded-xl border border-[#E5E9E5] bg-[#ECEEEA]/60 p-2 sm:p-3">
              <video
                controls
                preload="metadata"
                poster="/Project-images/real_screenshot_camshaft.png"
                className="w-full rounded-lg bg-black shadow-sm"
              >
                <source src="/videos/camshaft-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* Project Screenshots Section */}
        <section className="mt-10 sm:mt-14">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#172B2A] font-display sm:text-2xl">
              System Captures & Blueprints
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {availableVisuals.map((visual) => (
              <article
                key={visual.title}
                className="glass-card glass-card-hover overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-[#ECEEEA]/70 p-3 border-b border-[#E5E9E5]/70">
                    <div className="relative w-full h-full rounded-lg overflow-hidden border border-[#E5E9E5] bg-white">
                      <Image
                        src={visual.image}
                        alt={visual.title}
                        fill
                        className="object-contain p-2"
                        sizes="(min-width: 1024px) 33vw, 100vw"
                      />
                    </div>
                    <span className="glass-pill absolute top-4 left-4 text-[10px]">
                      {visual.category}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-sm font-bold text-[#172B2A] font-display">
                      {visual.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#697570]">
                      {visual.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#172B2A] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#284442]"
          >
            <ArrowLeft size={13} />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
