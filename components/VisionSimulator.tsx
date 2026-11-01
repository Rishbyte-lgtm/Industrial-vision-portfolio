"use client";

import Image from "next/image";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Play,
  RotateCcw,
  Scan,
  Zap,
} from "lucide-react";
import React, { useRef, useState, useCallback } from "react";

/* ─────────────────── constants ─────────────────── */
const NOMINAL = 124.5; // degrees
const TOLERANCE = 0.5; // ±°

const PRESETS = [
  { label: "✅ Perfect Part", angle: 124.5, note: "Exactly at nominal" },
  { label: "✅ Slight Drift", angle: 124.8, note: "+0.3° — still within tolerance" },
  { label: "❌ Over-rotated", angle: 125.8, note: "+1.3° — exceeds ±0.5°" },
  { label: "❌ Under-rotated", angle: 123.6, note: "−0.9° — exceeds ±0.5°" },
];

/* ─────────────────── helpers ─────────────────── */
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/* deviation bar fill width as % relative to max displayable deviation (1.5°) */
function deviationPct(dev: number) {
  return Math.min((dev / 1.5) * 100, 100);
}

/* ─────────────────── component ─────────────────── */
export default function VisionSimulator() {
  const [angle, setAngle] = useState(124.6);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<"pass" | "fail" | null>(null);
  const [scanLine, setScanLine] = useState(0); // 0-100% vertical position
  const [showPLC, setShowPLC] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animRef = useRef<number | null>(null);

  const deviation = Math.abs(angle - NOMINAL);
  const isPass = deviation <= TOLERANCE;
  const latencyMs = (10.8 + deviation * 1.2).toFixed(1);

  /* Trigger the animated scan */
  const triggerScan = useCallback(() => {
    if (scanning) return;
    setScanning(true);
    setScanResult(null);
    setScanLine(0);

    const start = performance.now();
    const duration = 900; // ms

    function tick(now: number) {
      const t = clamp((now - start) / duration, 0, 1);
      setScanLine(t * 100);
      if (t < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setScanning(false);
        setScanResult(isPass ? "pass" : "fail");
      }
    }
    animRef.current = requestAnimationFrame(tick);
  }, [scanning, isPass]);

  const reset = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setScanning(false);
    setScanResult(null);
    setScanLine(0);
    setAngle(124.6);
  };

  const jumpTo = (t: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = t;
    videoRef.current.play();
  };

  /* ─── render ─── */
  return (
    <section className="glass-card overflow-hidden">
      {/* ── Header ── */}
      <div className="px-5 pt-6 pb-5 sm:px-8 border-b border-[#E5E9E5]">
        <span className="glass-pill text-[11px] mb-2 inline-block">Live Simulator</span>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#172B2A] leading-tight">
          See How Camshaft Angle Inspection Works
        </h3>
        <p className="mt-1.5 text-sm text-[#697570] max-w-xl leading-relaxed">
          Drag the slider to change the camshaft angle, then press{" "}
          <strong className="text-[#172B2A]">Trigger Scan</strong> to see the
          real-time pass/fail decision — exactly as the production system does it.
        </p>
      </div>

      <div className="px-5 pb-6 pt-5 sm:px-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* ═══════════════ LEFT: Camera Viewport ═══════════════ */}
        <div className="flex flex-col gap-4">

          {/* Camera feed + scan animation */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl border border-[#E5E9E5] bg-[#ECEEEA]">
            {/* Real screenshot */}
            <Image
              src="/Project-images/real_screenshot_camshaft.png"
              alt="Camshaft inspection frame"
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 55vw, 100vw"
              priority
            />

            {/* Scan line animation */}
            {scanning && (
              <div
                className="absolute inset-x-0 h-0.5 bg-[#347C72] shadow-[0_0_8px_2px_rgba(52,124,114,0.5)] pointer-events-none z-20 transition-none"
                style={{ top: `${scanLine}%` }}
              />
            )}

            {/* Result overlay — fades in after scan */}
            {scanResult && !scanning && (
              <div
                className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 transition-opacity duration-300
                  ${scanResult === "pass" ? "bg-[#347C72]/15" : "bg-[#C85A54]/15"}`}
              >
                <div
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl backdrop-blur-sm font-bold text-lg shadow-lg
                    ${scanResult === "pass"
                      ? "bg-[#347C72] text-white"
                      : "bg-[#C85A54] text-white"}`}
                >
                  {scanResult === "pass" ? (
                    <CheckCircle2 size={22} />
                  ) : (
                    <AlertCircle size={22} />
                  )}
                  {scanResult === "pass" ? "PASS — Part OK" : "FAIL — REJECT Part"}
                </div>
                <p className="text-xs bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-[#172B2A] font-mono shadow">
                  {angle.toFixed(1)}° measured · deviation {deviation.toFixed(2)}° ·{" "}
                  {isPass ? "within" : "exceeds"} ±{TOLERANCE}° tolerance
                </p>
              </div>
            )}

            {/* Top HUD bar */}
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-3 py-2 bg-white/80 backdrop-blur-md border-b border-[#E5E9E5]/60 text-[11px] font-mono text-[#172B2A]">
              <span className="flex items-center gap-1.5 font-semibold">
                <span
                  className={`h-2 w-2 rounded-full ${
                    scanResult === null
                      ? "bg-[#697570]"
                      : scanResult === "pass"
                        ? "bg-[#347C72]"
                        : "bg-[#C85A54]"
                  } ${scanning ? "animate-pulse" : ""}`}
                />
                CAM-01 · Basler GigE
              </span>
              <span className="text-[#697570]">
                {scanning ? "SCANNING…" : scanResult ? `${latencyMs} ms` : "READY"}
              </span>
            </div>
          </div>

          {/* ── Trigger Scan + Reset buttons ── */}
          <div className="flex gap-3">
            <button
              onClick={triggerScan}
              disabled={scanning}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-bold text-sm transition-all shadow-sm
                ${scanning
                  ? "bg-[#DCE8E2] text-[#697570] cursor-not-allowed"
                  : "bg-[#172B2A] text-white hover:bg-[#1e3a38] active:scale-[0.98]"}`}
            >
              <Scan size={16} />
              {scanning ? "Scanning…" : "Trigger Scan"}
            </button>
            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-sm border border-[#E5E9E5] text-[#697570] hover:text-[#172B2A] hover:bg-white transition-all"
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
        </div>

        {/* ═══════════════ RIGHT: Controls ═══════════════ */}
        <div className="flex flex-col gap-4">

          {/* ── Angle Slider ── */}
          <div className="glass-card-inset p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#172B2A]">Camshaft Angle</span>
              <span className="font-mono font-bold text-lg text-[#347C72]">
                {angle.toFixed(1)}°
              </span>
            </div>

            <input
              type="range"
              min={123.0}
              max={126.0}
              step={0.1}
              value={angle}
              onChange={(e) => {
                setAngle(parseFloat(e.target.value));
                setScanResult(null);
              }}
              className="w-full accent-[#347C72] cursor-pointer h-2"
            />

            <div className="flex justify-between text-[10px] font-mono text-[#697570]">
              <span>123.0°</span>
              <span className="font-bold text-[#172B2A]">Nominal: {NOMINAL}°</span>
              <span>126.0°</span>
            </div>

            {/* Deviation meter */}
            <div className="mt-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#697570]">Deviation from nominal</span>
                <span className={`font-mono font-bold ${isPass ? "text-[#347C72]" : "text-[#C85A54]"}`}>
                  {deviation.toFixed(2)}° / ±{TOLERANCE}°
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#DCE8E2] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-200 ${
                    isPass ? "bg-[#347C72]" : "bg-[#C85A54]"
                  }`}
                  style={{ width: `${deviationPct(deviation)}%` }}
                />
              </div>
              <p className={`mt-1.5 text-[11px] font-semibold ${isPass ? "text-[#347C72]" : "text-[#C85A54]"}`}>
                {isPass
                  ? `✓ Within tolerance — part will PASS`
                  : `✗ Exceeds ±${TOLERANCE}° — part will be REJECTED`}
              </p>
            </div>
          </div>

          {/* ── Quick Presets ── */}
          <div className="glass-card-inset p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#697570] mb-2.5">
              Try These Scenarios
            </p>
            <div className="grid grid-cols-1 gap-2">
              {PRESETS.map((p) => {
                const active = Math.abs(angle - p.angle) < 0.05;
                return (
                  <button
                    key={p.label}
                    onClick={() => { setAngle(p.angle); setScanResult(null); }}
                    className={`text-left rounded-xl px-3 py-2.5 border transition-all ${
                      active
                        ? "bg-[#172B2A] text-white border-[#172B2A]"
                        : "bg-white/60 border-[#E5E9E5] hover:bg-white text-[#172B2A]"
                    }`}
                  >
                    <div className="text-[12px] font-bold">{p.label}</div>
                    <div className={`text-[11px] mt-0.5 ${active ? "text-white/70" : "text-[#697570]"}`}>
                      {p.note}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ PLC Details — collapsible ═══════════════ */}
      <div className="border-t border-[#E5E9E5]">
        <button
          onClick={() => setShowPLC((v) => !v)}
          className="w-full flex items-center justify-between px-5 sm:px-8 py-4 text-sm font-semibold text-[#172B2A] hover:bg-[#F5F6F3]/50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Cpu size={16} className="text-[#347C72]" />
            How it connects to the PLC
            <span className="glass-pill text-[10px] px-2 py-0.5">Technical</span>
          </span>
          {showPLC ? <ChevronUp size={16} className="text-[#697570]" /> : <ChevronDown size={16} className="text-[#697570]" />}
        </button>

        {showPLC && (
          <div className="px-5 sm:px-8 pb-6 grid gap-4 sm:grid-cols-2">
            {/* Sequence flow */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#697570] mb-3">
                Inspection Sequence
              </p>
              {[
                {
                  n: 1,
                  title: "Proximity Sensor (I0.0)",
                  desc: "Part arrives under camera station; PLC fires strobe.",
                  color: "bg-[#172B2A]",
                },
                {
                  n: 2,
                  title: "Python OpenCV (&lt;12 ms)",
                  desc: "Frame extracted, contours detected, angle calculated.",
                  color: "bg-[#347C72]",
                },
                {
                  n: 3,
                  title: "Snap7 DB10 Write",
                  desc: "Pass/fail written to Siemens PLC memory before next cycle.",
                  color: "bg-[#347C72]",
                },
                {
                  n: 4,
                  title: "Actuator (Q0.1)",
                  desc: "Good parts advance; rejects diverted by pneumatic cylinder.",
                  color: "bg-[#172B2A]",
                },
              ].map((s) => (
                <div
                  key={s.n}
                  className="flex items-start gap-3 p-3 bg-white/80 rounded-xl border border-[#E5E9E5]"
                >
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${s.color} text-white text-[10px] font-bold mt-0.5`}
                  >
                    {s.n}
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-[#172B2A]">{s.title}: </span>
                    <span
                      className="text-[#697570]"
                      dangerouslySetInnerHTML={{ __html: s.desc }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Live DB10 signals */}
            <div className="glass-card-inset p-4 text-xs font-mono flex flex-col gap-3">
              <p className="text-[11px] font-bold text-[#172B2A] uppercase tracking-wider mb-1">
                Siemens DB10 — Live Signals
              </p>

              <div className="flex items-center justify-between py-2 border-b border-[#E5E9E5]">
                <span className="text-[#697570]">DB10.DBX0.1 (Part_OK)</span>
                <span className={`font-bold ${isPass ? "text-[#347C72]" : "text-[#697570]"}`}>
                  {isPass ? "TRUE (1)" : "FALSE (0)"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#E5E9E5]">
                <span className="text-[#697570]">DB10.DBX0.2 (Ejector)</span>
                <span className={`font-bold ${!isPass ? "text-[#C85A54]" : "text-[#697570]"}`}>
                  {!isPass ? "PULSE — REJECT" : "IDLE (0)"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[#697570]">Inference Latency</span>
                <span className="font-bold text-[#347C72]">{latencyMs} ms</span>
              </div>

              <div className="flex items-center gap-2 mt-2 p-2 bg-[#DCE8E2]/50 rounded-lg">
                <Zap size={13} className="text-[#347C72] shrink-0" />
                <span className="text-[10px] text-[#697570] leading-snug">
                  Fieldbus: S7comm over ISO-on-TCP · deterministic handshake
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════ Video — collapsible ═══════════════ */}
      <div className="border-t border-[#E5E9E5]">
        <button
          onClick={() => setShowVideo((v) => !v)}
          className="w-full flex items-center justify-between px-5 sm:px-8 py-4 text-sm font-semibold text-[#172B2A] hover:bg-[#F5F6F3]/50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Play size={16} className="text-[#347C72]" />
            Watch the real demo recording
          </span>
          {showVideo ? <ChevronUp size={16} className="text-[#697570]" /> : <ChevronDown size={16} className="text-[#697570]" />}
        </button>

        {showVideo && (
          <div className="px-5 sm:px-8 pb-6 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="overflow-hidden rounded-xl border border-[#E5E9E5] bg-black">
              <video
                ref={videoRef}
                controls
                playsInline
                preload="metadata"
                poster="/Project-images/real_screenshot_camshaft.png"
                className="w-full aspect-video object-contain"
              >
                <source src="/videos/camshaft-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold text-[#172B2A] mb-1">Jump to chapter:</p>
              {[
                { t: 1, title: "1. Frame Acquisition", sub: "Basler GigE trigger" },
                { t: 4, title: "2. Angle Calculation", sub: "OpenCV vector extraction" },
                { t: 8, title: "3. HMI Display", sub: "Operator PASS/FAIL readout" },
              ].map((ch) => (
                <button
                  key={ch.t}
                  onClick={() => jumpTo(ch.t)}
                  className="text-left glass-card-inset px-3 py-2.5 hover:bg-white transition-colors flex items-center justify-between rounded-xl"
                >
                  <div>
                    <div className="text-xs font-bold text-[#172B2A]">{ch.title}</div>
                    <div className="text-[11px] text-[#697570]">{ch.sub}</div>
                  </div>
                  <span className="font-mono text-xs text-[#347C72] shrink-0">
                    0:{String(ch.t).padStart(2, "0")}
                  </span>
                </button>
              ))}
              <p className="text-[11px] text-[#697570] mt-2 leading-snug">
                Recorded on actual production hardware with a physical camshaft part.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
