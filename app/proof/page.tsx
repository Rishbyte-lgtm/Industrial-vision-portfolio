import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Camera,
  FileBadge,
  ImageIcon,
  MonitorCheck,
  ScanSearch,
  Video
} from "lucide-react";

export const metadata: Metadata = {
  title: "Proof Library",
  description:
    "Evidence library for machine vision inspection work: demo video requirements, project screenshots, sample inspection outputs, certificates, and setup photos."
};

const availableVisuals = [
  {
    title: "Camshaft Inspection Visual",
    image: "/Project-images/camshaft.png",
    description: "Portfolio visual for the camshaft angle inspection case study."
  },
  {
    title: "PLC Vision Workflow Visual",
    image: "/images/plc-vision.png",
    description: "Portfolio visual for the PLC-connected inspection workflow."
  },
  {
    title: "Vision Orchestration Visual",
    image: "/Project-images/vision.png",
    description: "Portfolio visual for the machine-vision workflow management concept."
  }
];


const proofSlots = [
  {
    title: "End-to-End Demo Video",
    status: "Highest priority",
    icon: Video,
    description:
      "Show camera capture, inspection decision, operator dashboard, and PLC/result signal flow in one short walkthrough.",
    add: "Add a real demo video file or hosted video link when available."
  },
  {
    title: "Sample Inspection Outputs",
    status: "Needed",
    icon: ScanSearch,
    description:
      "Show OK/NOK outputs, annotated detections, rejected samples, and the exact decision screen a user would see.",
    add: "Add real output screenshots from your inspection workflow."
  },
  {
    title: "Operator Screen / HMI",
    status: "Needed",
    icon: MonitorCheck,
    description:
      "Show the operator-facing interface, status messages, image preview, and PASS/FAIL indication.",
    add: "Add dashboard screenshots or a screen recording."
  },
  {
    title: "Actual Setup Photos",
    status: "Needed",
    icon: Camera,
    description:
      "Show camera, lighting, sample part, laptop/industrial PC, and PLC or test bench wiring if available.",
    add: "Add real setup photos only. Do not use stock images."
  },
  {
    title: "Certificates",
    status: "Needed",
    icon: FileBadge,
    description:
      "Show certificates, appreciation letters, internship proof, or relevant training documents.",
    add: "Add scanned certificate images or PDFs."
  },
  {
    title: "Project Screenshots",
    status: "Available",
    icon: ImageIcon,
    description:
      "Use screenshots to support the written case studies, but pair them with real demo evidence when possible.",
    add: "Current portfolio visuals are shown below."
  }
];

const videoStoryboard = [
  "Show the part or inspection object clearly.",
  "Show the camera feed or captured frame.",
  "Trigger the inspection from the software or PLC workflow.",
  "Show the inspection decision on the operator screen.",
  "Show OK/NOK or PASS/FAIL output.",
  "Show the PLC/result signal flow if available.",
  "End with what the system checks and what is still under development."
];

export default function ProofPage() {
  return (
    
    <main className="min-h-screen bg-[#07080b] text-white">
      <div className="pointer-events-none fixed inset-0 bg-industrial-grid bg-[size:72px_72px] opacity-[0.08]" />
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded border border-white/12 bg-white/6 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:border-cyanline/50 hover:bg-cyanline/8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <section className="py-14 sm:py-20">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-3 rounded border border-cyanline/30 bg-cyanline/8 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyanline">
              <BadgeCheck size={14} />
             Project Evidence
            </div>
            <h1 className="text-balance text-4xl font-black leading-tight sm:text-6xl">
              Project Demonstrations & Visual Evidence
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              This page contains project demonstrations, inspection screenshots, workflow visuals, and development progress related to machine vision inspection systems and industrial automation projects.
              </p>
          </div>
        </section>
        <section className="pb-14 sm:pb-20">
  <div className="mb-8">
    <div className="text-xs font-black uppercase tracking-[0.22em] text-cyanline">
      Demo Video
    </div>
    <h2 className="mt-3 text-3xl font-black sm:text-4xl">
      Camshaft Angle Detection System Demo
    </h2>
    <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
     Demonstration of the camshaft inspection workflow, including image capture, angle analysis, operator interface, and inspection decision output.
    </p>
  </div>

  <div className="industrial-border glass-panel overflow-hidden rounded-lg p-4">
    <video
      controls
      preload="metadata"
      poster="/Project-images/real_screenshot_camshaft.png"
      className="w-full rounded-lg"
    >
      <source
        src="/videos/camshaft-demo.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  </div>
</section>
              
{/* 
        <section className="pb-14 sm:pb-20">
          <div className="mb-8">
            <div className="text-xs font-black uppercase tracking-[0.22em] text-cyanline">Evidence Checklist</div>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">What Should Be Shown Here</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {proofSlots.map((slot) => {
              const Icon = slot.icon;
              return (
                <article key={slot.title} className="glass-panel rounded-lg p-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded bg-cyanline/12 text-cyanline">
                      <Icon size={22} />
                    </span>
                    <span className={`rounded px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] ${slot.status === "Available" ? "bg-signal text-slate-950" : "bg-amberline text-slate-950"}`}>
                      {slot.status}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-black">{slot.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{slot.description}</p>
                  <p className="mt-4 border-t border-white/10 pt-4 text-sm font-semibold leading-6 text-white">{slot.add}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="pb-14 sm:pb-20">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="industrial-border glass-panel rounded-lg p-6 sm:p-8">
              <div className="text-xs font-black uppercase tracking-[0.22em] text-signal">Recommended First Video</div>
              <h2 className="mt-3 text-3xl font-black">One Strong Demo Can Change Buyer Trust</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                For a manufacturing client, the strongest proof is not a model name. It is a clear video showing the full inspection flow from image capture to decision output.
              </p>
            </article>
            <article className="glass-panel rounded-lg p-6 sm:p-8">
              <h3 className="text-xl font-black">Demo Video Storyboard</h3>
              <div className="mt-5 grid gap-3">
                {videoStoryboard.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <BadgeCheck className="mt-1 shrink-0 text-signal" size={16} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section> */}

        <section className="pb-20">
          <div className="mb-8">
            <div className="text-xs font-black uppercase tracking-[0.22em] text-cyanline">Project Screenshots</div>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Screenshots from Active Development Projects</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {availableVisuals.map((visual) => (
              <article key={visual.title} className="industrial-border glass-panel overflow-hidden rounded-lg">
                <div className="relative aspect-[1.65] bg-slate-950">
                  <Image src={visual.image} alt={visual.title} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black">{visual.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{visual.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
