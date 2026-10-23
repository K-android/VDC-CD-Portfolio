import React, { useState, useEffect } from "react";
import {
  Cpu,
  Layers,
  Terminal,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ExternalLink,
  Github,
  Radio,
  FileCheck,
  Boxes,
  ArrowRight,
  GitBranch,
  RefreshCw,
  Search,
  Sparkles,
  Sliders,
  ChevronRight,
  Play
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const EnterprisePluginsCabinet: React.FC = () => {
  // Tabs for each of the 4 plugins
  const [tabCC, setTabCC] = useState<"overview" | "features" | "tech">("overview");
  const [tabHC, setTabHC] = useState<"overview" | "features" | "tech">("overview");
  const [tabFF, setTabFF] = useState<"overview" | "features" | "tech">("overview");
  const [tabRIR, setTabRIR] = useState<"overview" | "features" | "tech">("overview");

  // Interactive Radar State for BIM Command Center
  const [radarAngle, setRadarAngle] = useState(0);
  const [simulatedIntent, setSimulatedIntent] = useState("Audit all unhosted MEP fittings on Level 3");
  const [intentOutput, setIntentOutput] = useState("Dispatcher matched: pyRevit Script [audit_unhosted.py] & Revit Transaction #4190");

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarAngle((prev) => (prev + 3) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Interactive Audit Simulation for BIMHealthCheck
  const [healthScore, setHealthScore] = useState(92);
  const [isAuditing, setIsAuditing] = useState(false);
  const triggerAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setHealthScore(Math.floor(Math.random() * 6) + 91); // 91 - 96
      setIsAuditing(false);
    }, 800);
  };

  // Interactive Prompt Generator for ParametricFamilyForge
  const forgePresets = [
    {
      prompt: "Dual-tier executive desk with steel frame & modesty panel",
      params: "Width: 1800mm | Depth: 900mm | Height: 750mm | Constraints: 12",
      type: "Furniture (.RFA)"
    },
    {
      prompt: "Storefront double-glazed acoustic pivot door",
      params: "Leaf: 950mm | Frame: 50mm | Glass Thk: 12.8mm | Formulas: 4",
      type: "Doors (.RFA)"
    },
    {
      prompt: "Modular casework credenza with soft-close drawers",
      params: "Length: 2100mm | Carcass: 19mm Ply | Face: Oak Veneer",
      type: "Casework (.RFA)"
    }
  ];
  const [selectedPreset, setSelectedPreset] = useState(0);

  // Interactive 6-Stage Pipeline state for Rhino-to-Revit
  const [activeStage, setActiveStage] = useState(3);
  const stages = [
    { num: 1, name: "SCAN", desc: "Extracts Breps, Meshes, and User String attributes from Rhino document." },
    { num: 2, name: "CLASSIFY", desc: "Trilingual NLP scoring & geometric aspect ratios determine Revit category." },
    { num: 3, name: "REVIEW", desc: "Eto.Forms UI dialog allows team overrides, tolerances, and layer filters." },
    { num: 4, name: "TRANSFER", desc: "Executes native Revit element creation with clean DirectShape fallback." },
    { num: 5, name: "VALIDATE", desc: "Automated view graphics: Green = Native, Amber = Fallback, Red = Flagged." },
    { num: 6, name: "SYNC", desc: "ExtensibleStorage binds persistent GUIDs for non-destructive iterative updates." }
  ];

  return (
    <div className="space-y-12">
      {/* SECTION HEADER BADGE & DESCRIPTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00f2ff]/30 bg-[#00f2ff]/5 text-neon-cyan text-[10px] font-mono tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5 animate-pulse text-neon-cyan" />
            <span>NATIVE COMPILED DESKTOP ADD-INS // .NET 8 &amp; C#</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight font-sans">
            Enterprise Revit &amp; Rhino Add-in Suite
          </h3>
          <p className="text-xs md:text-sm text-gray-400 mt-1 max-w-2xl font-sans leading-relaxed">
            Scalable, compiled desktop tools engineered for Autodesk Revit (2023–2026) and McNeel Rhino. Built on multi-targeted C# SDKs, modern WPF &amp; Edge WebView2 interfaces, and real-time client-server communication pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-gray-400 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>ALL 4 ENGINES ACTIVE // MULTI-SDK</span>
        </div>
      </div>

      {/* 2x2 HIGH-TECH GRID OF DESKTOP ADD-INS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
        
        {/* ======================================================== */}
        {/* PLUGIN 1: BIM COMMAND CENTER & CONTROL ROOM */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col border border-white/10 bg-[#0d0f14]/90 rounded-xl overflow-hidden hover:border-[#3B82F6]/60 transition-all duration-500 group relative shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
        >
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />

          {/* Card Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono tracking-widest text-[#3B82F6] uppercase flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-[#3B82F6] animate-pulse" />
                ENTERPRISE_SYSTEM_01 // MULTI-USER RADAR
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-blue-500/30 text-blue-300 bg-blue-500/10">
                Revit 2023-2026
              </span>
            </div>
            <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors font-sans">
              BIM Command Center &amp; Live Control Room
            </h4>
            <p className="text-xs text-gray-400 mt-1 font-sans">
              Decoupled 4-tier dispatcher with zero-dependency Node.js SSE server and Edge WebView2 live floor plan coordination radar.
            </p>
          </div>

          {/* Interactive Live Radar Simulation */}
          <div className="relative h-44 bg-black/90 border-y border-white/10 overflow-hidden flex items-center justify-center">
            {/* Background circular coordinate grid */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-36 h-36 rounded-full border border-blue-500/40" />
              <div className="w-24 h-24 rounded-full border border-blue-500/30 absolute" />
              <div className="w-12 h-12 rounded-full border border-blue-500/20 absolute" />
              <div className="w-full h-[1px] bg-blue-500/20 absolute" />
              <div className="h-full w-[1px] bg-blue-500/20 absolute" />
            </div>

            {/* Radar sweeping cone */}
            <div
              className="absolute w-36 h-36 rounded-full pointer-events-none"
              style={{
                transform: `rotate(${radarAngle}deg)`,
                background: "conic-gradient(from 0deg, rgba(59, 130, 246, 0.45) 0deg, transparent 60deg)"
              }}
            />

            {/* Active user blips */}
            <div className="absolute top-10 left-1/3 flex items-center gap-1.5 z-10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="text-[9px] font-mono text-emerald-300 bg-black/80 px-1 rounded border border-emerald-500/30">Karthikraj [Arch Lead]</span>
            </div>
            <div className="absolute bottom-8 right-1/4 flex items-center gap-1.5 z-10">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              <span className="text-[9px] font-mono text-cyan-300 bg-black/80 px-1 rounded border border-cyan-500/30">MEP Session #12</span>
            </div>
            <div className="absolute top-14 right-1/3 flex items-center gap-1.5 z-10">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24]" />
              <span className="text-[9px] font-mono text-amber-300 bg-black/80 px-1 rounded border border-amber-500/30">CLASH_04: Duct vs Beam</span>
            </div>

            {/* Top Telemetry overlay */}
            <div className="absolute top-2 left-3 text-[9px] font-mono text-blue-400/80 bg-black/70 px-2 py-0.5 rounded border border-white/5">
              SSE HUB // 0.0.0.0:5050 [LAN BROADCAST]
            </div>
            <div className="absolute bottom-2 right-3 text-[9px] font-mono text-gray-500 bg-black/70 px-2 py-0.5 rounded border border-white/5">
              LATENCY: 4ms
            </div>
          </div>

          {/* Interactive Intent Dispatcher Demo */}
          <div className="px-6 py-3 bg-white/[0.02] border-b border-white/5 flex flex-col gap-1.5">
            <div className="text-[9px] font-mono text-gray-500 uppercase flex items-center gap-1">
              <Search className="w-3 h-3 text-[#3B82F6]" />
              Semantic Intent Dispatcher:
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={simulatedIntent}
                onChange={(e) => {
                  setSimulatedIntent(e.target.value);
                  setIntentOutput("Dispatcher analyzing intent via OpenAI / local embeddings...");
                }}
                className="w-full bg-black/60 border border-white/10 rounded px-2.5 py-1 text-[11px] font-mono text-gray-200 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => {
                  setIntentOutput("Executing: Revit Command Center > Dispatcher resolved action in 12ms");
                }}
                className="px-2.5 py-1 bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white rounded text-[10px] font-mono transition-colors shrink-0"
              >
                Dispatch
              </button>
            </div>
            <div className="text-[9.5px] font-mono text-emerald-400 truncate">
              &gt; {intentOutput}
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="p-6 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex bg-black/60 border border-white/10 p-1 rounded font-mono text-xs mb-5">
                {(["overview", "features", "tech"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTabCC(tab)}
                    className={`flex-1 py-1 rounded text-[10px] uppercase font-semibold tracking-wider transition-all ${
                      tabCC === tab
                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <AnimatePresence mode="wait">
                {tabCC === "overview" && (
                  <motion.div
                    key="cc-overview"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-2 text-xs text-gray-300 font-sans leading-relaxed"
                  >
                    <p>
                      Replaces fragmented desktop script shortcuts with a centralized, enterprise-grade Revit ribbon dispatcher. Features a rich Edge WebView2 interface connected to a zero-npm Node.js Server-Sent Events (SSE) coordination radar.
                    </p>
                    <p className="text-gray-400 text-[11px]">
                      Enables real-time floor plan presence across office LAN or Autodesk Construction Cloud (ACC), preventing silent model conflicts before they require costly rollbacks.
                    </p>
                  </motion.div>
                )}

                {tabCC === "features" && (
                  <motion.div
                    key="cc-features"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-2.5 text-xs text-gray-300 font-sans"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span><strong>Figma-Style Live Radar</strong>: Real-time user viewports and camera coordinates streamed over SSE.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span><strong>Universal Tool Dispatcher</strong>: Runs Dynamo graphs, pyRevit scripts, and native C# commands from one search.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span><strong>Zero-Admin Installer</strong>: 5.9MB self-contained executable for locked-down enterprise laptops.</span>
                    </div>
                  </motion.div>
                )}

                {tabCC === "tech" && (
                  <motion.div
                    key="cc-tech"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-2 text-[11px] font-mono text-gray-400"
                  >
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-gray-500">Framework</span>
                      <span className="text-white">C# .NET Framework 4.8 / .NET 8</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-gray-500">Host Engine</span>
                      <span className="text-white">Microsoft.Web.WebView2</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-gray-500">Backend Server</span>
                      <span className="text-white">Zero-dep Node.js + Native SSE HTTP</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Revit Interop</span>
                      <span className="text-white">ExternalCommand, UIControlledApplication</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mt-5">
                {["C# .NET", "Revit API", "WebView2", "Node.js SSE", "Office LAN", "SharePoint"].map((tag) => (
                  <span key={tag} className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-black/60 border border-white/5 text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-500">// ENTERPRISE GOVERNANCE</span>
              <div className="flex gap-2">
                <a
                  href="https://github.com/K-android/bim-control-room"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded text-xs font-mono transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Control Room</span>
                </a>
                <a
                  href="https://github.com/K-android/bim-command-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 rounded text-xs font-mono transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Command Center</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* PLUGIN 2: BIMHEALTHCHECK */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col border border-white/10 bg-[#0d0f14]/90 rounded-xl overflow-hidden hover:border-emerald-500/60 transition-all duration-500 group relative shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
        >
          <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />

          {/* Card Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                GOVERNANCE_ADDIN_02 // ISO 19650 AUDIT
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-300 bg-emerald-500/10">
                Revit 2024-2026
              </span>
            </div>
            <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors font-sans">
              BIMHealthCheck Audit Engine
            </h4>
            <p className="text-xs text-gray-400 mt-1 font-sans">
              Automated 0–100 quantitative model quality scorecard with 14 specialized audits and click-to-zoom 3D navigation.
            </p>
          </div>

          {/* Interactive Health Scorecard Simulator */}
          <div className="relative h-44 bg-black/90 border-y border-white/10 overflow-hidden flex items-center justify-around px-6">
            {/* Visual Gauge */}
            <div className="relative flex flex-col items-center">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="44"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="44"
                  stroke="#10B981"
                  strokeWidth="8"
                  strokeDasharray="276"
                  strokeDashoffset={276 - (276 * healthScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-mono text-white">
                  {isAuditing ? "..." : `${healthScore}`}
                </span>
                <span className="text-[9px] font-mono text-emerald-400 uppercase">
                  GRADE A // PASS
                </span>
              </div>
            </div>

            {/* Discipline Breakdown */}
            <div className="flex flex-col gap-1.5 text-[10px] font-mono">
              <div className="flex items-center justify-between gap-6">
                <span className="text-gray-400">Architecture:</span>
                <span className="text-emerald-400 font-bold">96%</span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span className="text-gray-400">Structure:</span>
                <span className="text-emerald-400 font-bold">94%</span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span className="text-gray-400">MEP Systems:</span>
                <span className="text-amber-400 font-bold">88%</span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span className="text-gray-400">Coordination:</span>
                <span className="text-emerald-400 font-bold">91%</span>
              </div>

              <button
                onClick={triggerAudit}
                disabled={isAuditing}
                className="mt-2 px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black rounded text-[9px] font-mono border border-emerald-500/30 transition-all flex items-center justify-center gap-1 active:scale-95"
              >
                <RefreshCw className={`w-2.5 h-2.5 ${isAuditing ? "animate-spin" : ""}`} />
                <span>{isAuditing ? "Auditing 14 Checks..." : "Re-Run Model Audit"}</span>
              </button>
            </div>
          </div>

          {/* Severity Filters Pill Bar */}
          <div className="px-6 py-2.5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between text-[10px] font-mono">
            <span className="text-gray-500">AUDIT METRICS:</span>
            <div className="flex gap-2">
              <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">0 Critical</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">2 Warnings</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">14 Passed</span>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="p-6 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex bg-black/60 border border-white/10 p-1 rounded font-mono text-xs mb-5">
                {(["overview", "features", "tech"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTabHC(tab)}
                    className={`flex-1 py-1 rounded text-[10px] uppercase font-semibold tracking-wider transition-all ${
                      tabHC === tab
                        ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <AnimatePresence mode="wait">
                {tabHC === "overview" && (
                  <motion.div
                    key="hc-overview"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-2 text-xs text-gray-300 font-sans leading-relaxed"
                  >
                    <p>
                      Replaces manual QA/QC checklists with an automated Revit add-in that computes an objective 0–100 health score. Generates executive HTML scorecards and CSV deliverables for BIM managers and project directors.
                    </p>
                    <p className="text-gray-400 text-[11px]">
                      Features native click-to-zoom navigation: double-clicking any finding immediately highlights and centers that offending element in the active Revit view.
                    </p>
                  </motion.div>
                )}

                {tabHC === "features" && (
                  <motion.div
                    key="hc-features"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-2.5 text-xs text-gray-300 font-sans"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>14 Specialized Health Audits</strong>: Unplaced rooms, CAD imports, duplicate marks, in-place families, and view bloat.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Historical Trend Tracker</strong>: Records weekly audit progress in local app data to prove quality improvements.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Click-to-Zoom Navigation</strong>: Instantly bounds and isolates offending elements in 3D without manual searches.</span>
                    </div>
                  </motion.div>
                )}

                {tabHC === "tech" && (
                  <motion.div
                    key="hc-tech"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-2 text-[11px] font-mono text-gray-400"
                  >
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-gray-500">Target Frameworks</span>
                      <span className="text-white">net8.0-windows &amp; net48</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-gray-500">UI Stack</span>
                      <span className="text-white">WPF (XAML) + Modern Styles</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-gray-500">Revit Compatibility</span>
                      <span className="text-white">2024, 2025, 2026 (Single Codebase)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Export Formats</span>
                      <span className="text-white">Standalone HTML + Structured CSV</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mt-5">
                {["C#", ".NET 8", ".NET 4.8", "WPF / XAML", "Revit API", "HTML Reporting"].map((tag) => (
                  <span key={tag} className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-black/60 border border-white/5 text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-500">// QUALITY COMPLIANCE</span>
              <a
                href="https://github.com/K-android/revit-model-health-checker"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 rounded text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* PLUGIN 3: PARAMETRIC FAMILY FORGE */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col border border-white/10 bg-[#0d0f14]/90 rounded-xl overflow-hidden hover:border-purple-500/60 transition-all duration-500 group relative shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
        >
          <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity" />

          {/* Card Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-purple-400" />
                GENAI_PARAMETRIC_03 // VISION TO .RFA
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-purple-500/30 text-purple-300 bg-purple-500/10">
                Revit 2024-2026
              </span>
            </div>
            <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors font-sans">
              ParametricFamilyForge
            </h4>
            <p className="text-xs text-gray-400 mt-1 font-sans">
              Google Gemini Vision API + procedural rule engine generating native, parametric Revit Families (.rfa) with linked constraints.
            </p>
          </div>

          {/* Interactive Vision-to-Family Simulation */}
          <div className="relative h-44 bg-black/90 border-y border-white/10 overflow-hidden flex flex-col justify-between p-4">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-purple-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" />
                VISION PARSER ACTIVE
              </span>
              <span className="text-gray-500">ENGINE: GEMINI 2.5 FLASH</span>
            </div>

            {/* Presets Selector */}
            <div className="flex gap-2 my-1">
              {forgePresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPreset(idx)}
                  className={`flex-1 py-1 px-2 rounded text-[9px] font-mono truncate transition-all border ${
                    selectedPreset === idx
                      ? "bg-purple-600/30 border-purple-500 text-purple-200"
                      : "bg-white/[0.02] border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  {preset.type}
                </button>
              ))}
            </div>

            {/* Simulated Generative Output */}
            <div className="bg-white/[0.03] border border-white/5 rounded p-2.5 font-mono text-[10px] space-y-1">
              <div className="text-gray-400 truncate">
                <span className="text-purple-400">&gt; Prompt:</span> &ldquo;{forgePresets[selectedPreset].prompt}&rdquo;
              </div>
              <div className="text-emerald-400 truncate">
                <span className="text-gray-500">&gt; Injected:</span> {forgePresets[selectedPreset].params}
              </div>
              <div className="text-[9px] text-gray-500 flex justify-between pt-0.5 border-t border-white/5">
                <span>STATUS: Background .RFT Document Compiled</span>
                <span className="text-cyan-400">UnitTypeId.Millimeters</span>
              </div>
            </div>
          </div>

          {/* Offline Fallback Badge Bar */}
          <div className="px-6 py-2.5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between text-[10px] font-mono">
            <span className="text-gray-500">FALLBACK PROTOCOL:</span>
            <span className="text-purple-300">Offline Architectural Rule Engine Ready</span>
          </div>

          {/* Tabs Navigation */}
          <div className="p-6 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex bg-black/60 border border-white/10 p-1 rounded font-mono text-xs mb-5">
                {(["overview", "features", "tech"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTabFF(tab)}
                    className={`flex-1 py-1 rounded text-[10px] uppercase font-semibold tracking-wider transition-all ${
                      tabFF === tab
                        ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <AnimatePresence mode="wait">
                {tabFF === "overview" && (
                  <motion.div
                    key="ff-overview"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-2 text-xs text-gray-300 font-sans leading-relaxed"
                  >
                    <p>
                      Bridges multimodal AI with the Revit Family API. Instead of creating generic CAD meshes, ParametricFamilyForge translates manufacturer cut-sheet sketches and text prompts into fully parametric, native `.rfa` files.
                    </p>
                    <p className="text-gray-400 text-[11px]">
                      Operates in a background multi-document transaction, assigning formulas, dimensions, reference planes, and nested sub-components before loading into the active project.
                    </p>
                  </motion.div>
                )}

                {tabFF === "features" && (
                  <motion.div
                    key="ff-features"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-2.5 text-xs text-gray-300 font-sans"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong>Multimodal Vision AI</strong>: Parses dimension cut-sheets into structured JSON constraints via Gemini 2.5 Flash / Pro.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong>Deterministic Rule Fallback</strong>: Procedural generation of casework, desks, doors without needing active web connection.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong>Modern ForgeTypeId Architecture</strong>: Adheres to clean modern Revit API (zero deprecated unit enums).</span>
                    </div>
                  </motion.div>
                )}

                {tabFF === "tech" && (
                  <motion.div
                    key="ff-tech"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-2 text-[11px] font-mono text-gray-400"
                  >
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-gray-500">AI Engine</span>
                      <span className="text-white">Google Gemini Vision 2.5 Flash / Pro</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-gray-500">Target Frameworks</span>
                      <span className="text-white">net8.0-windows &amp; net48</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-gray-500">Revit Family API</span>
                      <span className="text-white">FamilyItemFactory, ReferencePlane, Dimension</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Units Standard</span>
                      <span className="text-white">SpecTypeId &amp; UnitTypeId (Modern API)</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mt-5">
                {["C# .NET 8", "Gemini Vision AI", "Revit Family API", "Procedural Engine", "ForgeTypeId", "WPF"].map((tag) => (
                  <span key={tag} className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-black/60 border border-white/5 text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-500">// GENERATIVE COMPUTATION</span>
              <a
                href="https://github.com/K-android/ParametricFamilyCreator"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 rounded text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* PLUGIN 4: ONE-CLICK RHINO-TO-REVIT TRANSFER */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col border border-white/10 bg-[#0d0f14]/90 rounded-xl overflow-hidden hover:border-amber-500/60 transition-all duration-500 group relative shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
        >
          <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 opacity-60 group-hover:opacity-100 transition-opacity" />

          {/* Card Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase flex items-center gap-1.5">
                <GitBranch className="w-3 h-3 text-amber-400" />
                INTEROP_PIPELINE_04 // RHINO.INSIDE.REVIT
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-amber-500/30 text-amber-300 bg-amber-500/10">
                Rhino 7/8 + Revit
              </span>
            </div>
            <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors font-sans">
              Rhino-to-Revit Transfer Engine
            </h4>
            <p className="text-xs text-gray-400 mt-1 font-sans">
              Controlled 6-stage computational pipeline converting complex Rhino geometry into native Revit elements with ExtensibleStorage sync.
            </p>
          </div>

          {/* Interactive 6-Stage Pipeline Flow */}
          <div className="relative h-44 bg-black/90 border-y border-white/10 overflow-hidden flex flex-col justify-between p-4">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-amber-400">// CONTROLLED 6-STAGE PIPELINE</span>
              <span className="text-gray-500">STAGE {activeStage + 1} OF 6</span>
            </div>

            {/* Stepper Node Flow */}
            <div className="grid grid-cols-6 gap-1 my-2">
              {stages.map((stage, idx) => (
                <button
                  key={stage.num}
                  onClick={() => setActiveStage(idx)}
                  className={`flex flex-col items-center p-1.5 rounded transition-all border ${
                    activeStage === idx
                      ? "bg-amber-500/20 border-amber-400 text-amber-200"
                      : "bg-white/[0.02] border-white/5 text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <span className="text-[8px] font-mono font-bold">0{stage.num}</span>
                  <span className="text-[8.5px] font-mono truncate w-full text-center">{stage.name}</span>
                </button>
              ))}
            </div>

            {/* Active Stage Description Preview */}
            <div className="bg-white/[0.03] border border-white/5 rounded p-2.5 font-mono text-[10.5px]">
              <div className="text-amber-300 font-semibold mb-0.5">
                Stage 0{stages[activeStage].num}: {stages[activeStage].name}
              </div>
              <p className="text-gray-400 text-[10px] leading-relaxed">
                {stages[activeStage].desc}
              </p>
            </div>
          </div>

          {/* Sync Protocol Bar */}
          <div className="px-6 py-2.5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between text-[10px] font-mono">
            <span className="text-gray-500">PERSISTENT BINDING:</span>
            <span className="text-amber-300">Revit ExtensibleStorage Schema</span>
          </div>

          {/* Tabs Navigation */}
          <div className="p-6 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex bg-black/60 border border-white/10 p-1 rounded font-mono text-xs mb-5">
                {(["overview", "features", "tech"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTabRIR(tab)}
                    className={`flex-1 py-1 rounded text-[10px] uppercase font-semibold tracking-wider transition-all ${
                      tabRIR === tab
                        ? "bg-amber-600/20 text-amber-400 border border-amber-500/30"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <AnimatePresence mode="wait">
                {tabRIR === "overview" && (
                  <motion.div
                    key="rir-overview"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-2 text-xs text-gray-300 font-sans leading-relaxed"
                  >
                    <p>
                      Replaces unintelligent geometry dumps with an architectural intent pipeline running in Rhino.Inside.Revit. Employs geometric fingerprinting and trilingual metadata to map Rhino surfaces to native Revit families.
                    </p>
                    <p className="text-gray-400 text-[11px]">
                      Uses Revit `ExtensibleStorage` schemas to stamp transferred elements with origin GUIDs, enabling non-destructive round-trip sync as conceptual designs evolve.
                    </p>
                  </motion.div>
                )}

                {tabRIR === "features" && (
                  <motion.div
                    key="rir-features"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-2.5 text-xs text-gray-300 font-sans"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>10 Native Translation Pipelines</strong>: Walls, floors, roofs, curtain panels, and DirectShape fallback.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Eto.Forms Review UI</strong>: Cross-platform dashboard with category mapping overrides and tolerance controls.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Graphics Validation</strong>: Live view overrides flag potential translation defects directly in Revit views.</span>
                    </div>
                  </motion.div>
                )}

                {tabRIR === "tech" && (
                  <motion.div
                    key="rir-tech"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-2 text-[11px] font-mono text-gray-400"
                  >
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-gray-500">Platform</span>
                      <span className="text-white">Rhino.Inside.Revit (RIR)</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-gray-500">Dialog Framework</span>
                      <span className="text-white">Eto.Forms (Native Rhino UI)</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-gray-500">Synchronization</span>
                      <span className="text-white">Revit ExtensibleStorage Schema</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Classification</span>
                      <span className="text-white">Deterministic Fingerprint + Trilingual NLP</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mt-5">
                {["Rhino.Inside", "C#", "Python", "Eto.Forms", "DirectShape", "ExtensibleStorage"].map((tag) => (
                  <span key={tag} className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-black/60 border border-white/5 text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-500">// GEOMETRY PIPELINE</span>
              <a
                href="https://github.com/K-android/rhino-to-revit-transfer"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/40 rounded text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
