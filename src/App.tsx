/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "motion/react";
import { 
  Terminal, 
  Cpu, 
  Database, 
  Layers, 
  Code2, 
  Table, 
  FileText, 
  Github, 
  Linkedin, 
  Download,
  ChevronRight,
  Activity,
  Box,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  ShieldCheck,
  Hammer,
  Play,
  Zap,
  Maximize2,
  Globe
} from "lucide-react";

import { AECWebAppsCabinet } from "./components/AECWebAppsCabinet.tsx";

const SoftwareStack = ({ isArch }: { isArch: boolean }) => {
  const archTools = [
    { name: "Rhino / Grasshopper", category: "Computational" },
    { name: "Autodesk Revit", category: "BIM" },
    { name: "D5 Render / Enscape", category: "Visualization" },
    { name: "Adobe Creative Suite", category: "Design" },
    { name: "Midjourney / Stable Diffusion", category: "AI Imagery" },
    { name: "Physical Prototyping", category: "Fabrication" },
  ];

  const bimTools = [
    { name: "Autodesk Revit", category: "Modeling" },
    { name: "Navisworks Manage", category: "Coordination" },
    { name: "Dynamo / Python", category: "Automation" },
    { name: "PowerBI / SQL", category: "Data" },
    { name: "Rhino / Grasshopper", category: "Computational" },
    { name: "ISO 19650 Standards", category: "Management" },
  ];

  const tools = isArch ? archTools : bimTools;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      key={isArch ? 'arch' : 'bim'}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex flex-wrap justify-center lg:justify-start gap-3"
    >
      {tools.map((tool, idx) => (
        <motion.div 
          key={`${isArch ? 'arch' : 'bim'}-${tool.name}-${idx}`}
          variants={item}
          className={`px-3 py-1 border text-[10px] font-mono transition-all duration-700 ${
            isArch 
            ? "border-gray-100 bg-gray-50 text-gray-500" 
            : "border-terminal-border bg-terminal-border/20 text-neon-cyan"
          }`}
        >
          {tool.name} <span className="opacity-30 ml-1">[{tool.category}]</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

const getDriveId = (url: string) => {
  if (!url) return null;
  const clean = url.split('#')[0];
  
  if (clean.includes('lh3.googleusercontent.com/d/')) {
    const parts = clean.split('lh3.googleusercontent.com/d/');
    if (parts.length > 1) {
      return parts[1].split('/')[0].split('?')[0];
    }
  }
  
  if (clean.includes('drive.google.com/thumbnail')) {
    const match = clean.match(/[?&]id=([^&]+)/);
    if (match) {
      return match[1];
    }
  }

  if (clean.includes('drive.google.com/file/d/')) {
    const parts = clean.split('/file/d/');
    if (parts.length > 1) {
      return parts[1].split('/')[0].split('?')[0];
    }
  }

  return null;
};

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getGalleryItemType = (imgUrl: string, idx: number, projectId: string): "render" | "drawing" | "video" => {
  if (imgUrl.includes("#video") || imgUrl.toLowerCase().endsWith(".mp4") || imgUrl.toLowerCase().endsWith(".mov") || imgUrl.includes("1h89DNz0NAtQeH_rtLlNxXqN0ZI_9FXuk") || !!getYoutubeId(imgUrl)) {
    return "video";
  }
  
  const urlLower = imgUrl.toLowerCase();
  
  if (projectId === "ARCH_08") {
    if (urlLower.includes("plan") || idx === 3) return "drawing";
    return "render";
  }
  if (projectId === "ARCH_02") {
    if (urlLower.includes("detail") || urlLower.includes("design") || urlLower.includes("blueprint") || urlLower.includes("plan")) return "drawing";
    return "render";
  }
  
  if (
    urlLower.includes("plan") || 
    urlLower.includes("detail") || 
    urlLower.includes("drawing") || 
    urlLower.includes("sheet") || 
    urlLower.includes("vector") || 
    urlLower.includes("cad") || 
    urlLower.includes("blueprint") || 
    urlLower.includes("section") || 
    urlLower.includes("elevation") || 
    urlLower.includes("diagram") ||
    urlLower.includes("layout") ||
    urlLower.includes("draft") ||
    urlLower.includes("dwg") ||
    (projectId === "ARCH_01" && [2, 3, 4, 5].includes(idx)) ||
    (projectId === "ARCH_05" && [4, 5, 6, 7, 8, 9, 10, 11, 12].includes(idx)) ||
    (projectId === "ARCH_06" && (urlLower.includes("daiw") || urlLower.includes("hppo") || urlLower.includes("cnzu") || urlLower.includes("7vge") || urlLower.includes("thas") || urlLower.includes("gebl") || urlLower.includes("oqom") || urlLower.includes("emmd"))) ||
    (projectId === "ARCH_07" && (urlLower.includes("bmbn") || urlLower.includes("dnk3") || urlLower.includes("1142"))) ||
    (projectId === "ARCH_09" && [3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16].includes(idx))
  ) {
    return "drawing";
  }
  
  return "render";
};

const getStaticThumbnailUrl = (src: string) => {
  if (!src) return "";
  const clean = src.split('#')[0];
  
  if (clean.includes('drive.google.com/file/d/')) {
    const parts = clean.split('/file/d/');
    if (parts.length > 1) {
      const id = parts[1].split('/')[0].split('?')[0];
      return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
    }
  }

  if (clean.includes('lh3.googleusercontent.com/d/')) {
    const parts = clean.split('lh3.googleusercontent.com/d/');
    if (parts.length > 1) {
      const id = parts[1].split('/')[0].split('?')[0];
      return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
    }
  }

  if (clean.includes('drive.google.com/thumbnail')) {
    const match = clean.match(/[?&]id=([^&]+)/);
    if (match) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
    }
  }

  if (clean.includes('giphy.com/media/')) {
    return clean.replace('/giphy.gif', '/giphy_s.gif');
  }

  const ytId = getYoutubeId(clean);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/0.jpg`;
  }

  return clean;
};

const getPlayableVideoUrl = (url: string) => {
  if (!url) return "";
  const clean = url.split('#')[0];
  
  if (clean.includes('lh3.googleusercontent.com/d/')) {
    const parts = clean.split('lh3.googleusercontent.com/d/');
    if (parts.length > 1) {
      const id = parts[1].split('/')[0].split('?')[0];
      return `https://drive.google.com/uc?export=download&id=${id}`;
    }
  }
  
  if (clean.includes('drive.google.com/thumbnail')) {
    const match = clean.match(/[?&]id=([^&]+)/);
    if (match) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
  }

  if (clean.includes('drive.google.com/file/d/')) {
    const parts = clean.split('/file/d/');
    if (parts.length > 1) {
      const id = parts[1].split('/')[0].split('?')[0];
      return `https://drive.google.com/uc?export=download&id=${id}`;
    }
  }
  
  return clean;
};

const getSimLogsForProject = (id: string, stepIdx: number) => {
  switch (id) {
    case "BIM_01":
      return [
        ">> Authenticating handshake with Google Vertex AI / Gemini API...\n>> [SUCCESS] Token established. Payload: 4,096 tokens max.\n>> Streaming neural panelization geometry parameters...",
        ">> Received JSON geometry schema (128KB payload).\n>> Validating 5,000 vertices constraints with structural integrity boundaries.\n>> JSON parsed successfully.",
        ">> Initiating Grasshopper spatial solver...\n>> Mapping mathematical bezier surfaces to parametric NURBS curves.\n>> Sub-division tessellation factor: 0.85.",
        ">> Projecting complex geometry onto flat plane (unrolling NURBS).\n>> Auto-nesting 2D CNC cut-sheets...\n>> Cut-sheets populated in /output/cut_sheets/."
      ][stepIdx];
    case "BIM_02":
      return [
        ">> Parsing excel datasheet matrices...\n>> Mapping 450 views to standard template viewports.\n>> Initiating coordinate alignment parameters.",
        ">> Calculating layout viewport spacing parameters.\n>> Aligning floor-plans, sections, and elevation views cleanly inside sheet grids.",
        ">> Fetching project metadata indexes...\n>> Overwriting 10 fields across all linked dynamic legends.\n>> DB state synchronized.",
        ">> Commencing automated batch drawing export...\n>> Compiling 350 PDF sheets with structured custom tag names.\n>> Saved 32.5 working hours this run."
      ][stepIdx];
    case "BIM_03":
      return [
        ">> Scanning active Revit master project database elements...\n>> Indexing 24,500 instance elements across active worksets.",
        ">> Executing regex filter and nomenclature compliance tests.\n>> Corrected 85 mismatched parameter fields dynamically.",
        ">> Establishing direct JDBC connection with financial spreadsheet catalogs.\n>> Recalculating material cost vs volume tolerances.",
        ">> Packaging verified material takeoffs with ERP payload.\n>> Exporting data streams to ERP database system (Oracle/SAP link).\n>> Completed with 0 exceptions."
      ][stepIdx];
    case "BIM_04":
      return [
        ">> Loading federated Structural and MEP models into memory...\n>> Initiating hard clash test iterations (tolerance: 5.0mm).",
        ">> Detected 412 raw intersections. Distilling results...\n>> Grouped clashes by physical zone and priority tags (High priority: 12).",
        ">> Applying automated neon override colors to clash points.\n>> Injecting target viewpoints into coordinates tracking dataset.",
        ">> Compiling coordination review dataset report.\n>> Exporting HTML/BCF compatibility charts for review team."
      ][stepIdx];
    case "BIM_05":
      return [
        ">> Extracting dimensional clearances guidelines for structural grid systems.",
        ">> Executing Vectorworks custom placement script model.\n>> Generated 2,400 parametric terminal pipe items.",
        ">> Verifying structural MEP pipe joins consistency inline.",
        ">> Exporting bill of materials schedules and verification audits."
      ][stepIdx];
    case "BIM_06":
      return [
        ">> Parsing complete Project schedule file data structures.",
        ">> Integrating timelines elements with Navisworks API data matrices.",
        ">> Setting material installation and phase profile overlays.",
        ">> Running multi-scenario schedule conflict analyses."
      ][stepIdx];
    case "BIM_07":
      return [
        ">> Formulating parametric louver definitions and active sun vectors inside Rhino.\n>> Setting independent variable bounds: rotAngle [0-90°], louvDepth [100-400mm], spacing [150-500mm].",
        ">> Running Galapagos evolutionary engine (Single-weighted objective score)...\n>> Gen 20 reached. Best weighted fitness score: 0.812 (Convergence locked).",
        ">> Dispatching Wallacei Pareto optimization (Independent dual targets)...\n>> Generation 50 computed. Mapping non-dominated design spaces.\n>> Pareto Front generated with 34 distinct optimal candidate structures.",
        ">> Benchmarking solvers. Wallacei selection achieved further 18% weight savings vs Galapagos at same solar shade rating.\n>> Pipeline complete. Data charts synchronized successfully."
      ][stepIdx];
    case "BIM_09":
      return [
        ">> Voronoi algorithm executing on point clouds.\n>> Generating Biomimetic Space Frame shell.\n>> Total count: 5,124 nodes processed.",
        ">> Extracting pure geometric topological vertices and axes matrices.\n>> Distilled: 4,500 linear struts (Lines) and 1,200 joints (Points). Ready for stream.",
        ">> Packaging node data into JSON format.\n>> Dispatching 12MB serialized asset metadata payload via Raven AI serialization bridge.",
        ">> Revit custom listener active on socket.\n>> Stream received: instantiating 4,500 native Parametric Structural Struts instantly.\n>> Bypassed legacy imports. Pipeline complete."
      ][stepIdx];
    default:
      return [
        ">> Fetching workflow node parameters.",
        ">> Executing topological math matrix computation.",
        ">> Resolving external references & dependencies.",
        ">> Stream flushed successfully."
      ][stepIdx] || ">> Step execution finished.";
  }
};

const getFlowchartData = (projectId: string, steps: string[]) => {
  const defaultSteps = steps || [];
  switch (projectId) {
    case "BIM_01":
      return {
        start: { title: "DESIGN GENERATION", subtitle: "Design Specifications & Criteria", desc: "User requirements and dimensional criteria loaded" },
        nodes: [
          { title: "AI Parameters Solver", subtitle: "Uses Gemini API to interpret prompt constraints into structural dimensions", metric: "Gemini Engine" },
          { title: "Boundary Check", subtitle: "Verifies dimensions comply with local building clearance guidelines", metric: "Safety Filter" },
          { title: "Nesting Optimization", subtitle: "Arranges flat pieces tightly on timber sheets to minimize fabrication waste", metric: "Waste Reduced 18%" },
          { title: "Laser Cut-Path Prep", subtitle: "Formats cutting lines and coordinates into digital fabrication commands", metric: "G-Code Ready" }
        ],
        decision: { title: "SPATIAL COHERENCE CHECK", gate: "Do components overlap or exceed tolerances?", yes: "PASS / READY", no: "RE-RUN AUTO-ALIGN", desc: "Verifies component alignments before manufacture" },
        end: { title: "FABRICATION DISPATCH", subtitle: "Digital Worksheets Sent", desc: "Optimal panel designs queued for workshop cutting" }
      };
    case "BIM_02":
      return {
        start: { title: "VIEWPORT SETS MATRIX", subtitle: "Drawing Views Register", desc: "Imports current sheet index spreadsheet" },
        nodes: [
          { title: "Auto-Templater", subtitle: "Selects corresponding sheet sizes and scales for each drawing category", metric: "Scale-to-Fit" },
          { title: "Coordinate Alignment", subtitle: "Centers model viewports within designated viewport borders", metric: "Grid Centered" },
          { title: "Dynamic Text Updates", subtitle: "Syncs project names, dates, page numbers, and custom revision logs", metric: "Titleblocks Active" },
          { title: "Batch PDF Compiler", subtitle: "Prepares drawings for unified high-resolution printing queue", metric: "Print Engine" }
        ],
        decision: { title: "ISO STANDARDS CHECK", gate: "Are drawing titles and scales properly configured?", yes: "COMPLIANT", no: "RE-CHECK NAMES", desc: "Validates name structures against standardized layouts" },
        end: { title: "PORTFOLIO COMMITTED", subtitle: "Autodesk Construction Cloud", desc: "Drawing sets approved and synchronized for on-site execution" }
      };
    case "BIM_03":
      return {
        start: { title: "3D MODEL PARSER", subtitle: "Revit Model Database (.RVT)", desc: "Scans active physical element registers" },
        nodes: [
          { title: "Model Auditor", subtitle: "Identifies unique material identifiers and associated physical dimensions", metric: "Audit Valid" },
          { title: "Format Normalization", subtitle: "Cleans irregular parameter naming to match unified database structure", metric: "Strings Synced" },
          { title: "Quantity Survey Link", subtitle: "Calculates total volumetric quantities and binds them to inventory costs", metric: "Excel Synced" },
          { title: "Office Ledger Sync", subtitle: "Formats completed material estimates for database contribution", metric: "API Dispatcher" }
        ],
        decision: { title: "ESTIMATE DEVIATION REVIEW", gate: "Does cost estimate fall within target budget limits?", yes: "APPROVED", no: "FLAG DEVIATION", desc: "Compares current calculation against project budget boundaries" },
        end: { title: "ESTIMATE VERIFIED", subtitle: "Schedules Synchronized", desc: "Detailed costs recorded successfully in office database" }
      };
    case "BIM_04":
      return {
        start: { title: "FEDERATED MODEL", subtitle: "Combined Structural & Trade Systems", desc: "Imports structural and mechanical coordinate grids" },
        nodes: [
          { title: "Intersection Search", subtitle: "Detects physical collisions between various structural and utility paths", metric: "System Clashes" },
          { title: "Priority Classification", subtitle: "Sorts clashes by location to separate major frame issues from small utility pipe overlaps", metric: "Clash Matrix" },
          { title: "Visual Highlights", subtitle: "Applies clear high-contrast coloring to model components for revision review", metric: "Highlight Active" },
          { title: "Coordination Log Compiler", subtitle: "Bundles clash screenshots and camera angles for repair sheets", metric: "Issue Packager" }
        ],
        decision: { title: "STRUCTURAL VIOLATIONS", gate: "Does clash directly compromise core frame walls or slabs?", yes: "RESOLVED", no: "RE-ROUTE LAYOUT", desc: "Prioritizes immediate load-bearing support clearances" },
        end: { title: "COORDINATION COMPLETE", subtitle: "Log Released Successfully", desc: "Coordinated systems approved, saving thousands in visual field rework" }
      };
    case "BIM_05":
      return {
        start: { title: "SPACE LIMITS", subtitle: "Wall Dimensions & Ceiling Boundaries", desc: "Loads clearance paths in structural rooms" },
        nodes: [
          { title: "Pathway Scanner", subtitle: "Identifies designated wall sleeves and allowable plumbing corridors", metric: "Clearance Filter" },
          { title: "Automatic Path Router", subtitle: "Lays layout pipes and joints programmatically based on structural standards", metric: "Solver Active" },
          { title: "Revit Anchor Align", subtitle: "Binds generated fittings and pipes back to active model components", metric: "Model Synced" },
          { title: "Schedule Compiler", subtitle: "Summarizes calculated total component counts and pipe segment lengths", metric: "Schedule Ready" }
        ],
        decision: { title: "PLUMBING CONTIGUITY AUDIT", gate: "Are pipeline routes continuous without disconnects?", yes: "CONTIGUOUS", no: "FIX SECTIONS", desc: "Verifies pipeline path safety across connections" },
        end: { title: "FABRICATION FILES READY", subtitle: "Modular Shop Drawings", desc: "Layout details finalized and formatted for pre-fabricated plumbing assemblies" }
      };
    case "BIM_06":
      return {
        start: { title: "TIMELINE OUTLINE", subtitle: "Milestone Build Schedule (.MPP)", desc: "Imports phased timeline and milestones" },
        nodes: [
          { title: "Schedule Sequence Parser", subtitle: "Interprets Gantt tasks into ordered construction stages", metric: "Timeline Loaded" },
          { title: "Revit Model Connector", subtitle: "Binds scheduling dates to corresponding structural 3D objects", metric: "ID Linkages" },
          { title: "Build State Overlay", subtitle: "Colors components dynamically to show active, pre-built, or demolished phases", metric: "Render Active" },
          { title: "4D Simulation Solver", subtitle: "Analyzes construction step timing to detect trade site overlap conflicts", metric: "Conflict Solver" }
        ],
        decision: { title: "LOGISTICS CLASH VERIFICATION", gate: "Are worker crew areas clear of timing collisions?", yes: "CLEAR", no: "STAGGER DATES", desc: "Verifies layout spacing during rapid building periods" },
        end: { title: "TIMELINE APPROVED", subtitle: "Operational Schedule Synced", desc: "Sequence animated successfully, reducing potential site delay hours" }
      };
    case "BIM_07":
      return {
        start: { title: "CLIMATE DATA ENGINES", subtitle: "Solar Angle & Weather Matrices", desc: "Loads regional epw and solar radiation files" },
        nodes: [
          { title: "Parametric Facade Modeler", subtitle: "Formulates customizable louver dimensions and spacing vectors", metric: "Grasshopper Solver" },
          { title: "Galapagos Single-Loop", subtitle: "Computes single weighted score using solar heat and volume variables", metric: "Genetic Algorithm" },
          { title: "Wallacei Pareto Engine", subtitle: "Computes independent Pareto-front trade space of shade indices, cost, & mass", metric: "Evolutionary Engine" },
          { title: "Chart Plots on Canvas", subtitle: "Visualizes parallel coordinates and benchmark graphs", metric: "18% Weight Reduced" }
        ],
        decision: { title: "PARETO FRONT SELECTION", gate: "Do options provide >= 80% shade & active mass reduction?", yes: "EXCELLED SELECTION", no: "RE-RUN SOLVERS", desc: "Evaluates multi-dimensional trade space to find non-dominated options" },
        end: { title: "BENCHMARKED WRITER", subtitle: "Sustainable Architecture", desc: "Custom facade geometry exported with optimal balance of carbon, cost, and active shade" }
      };
    case "BIM_09":
      return {
        start: { title: "PHYSICAL CONTAINER OUTLINE", subtitle: "Free-form Boundary Shapes", desc: "Imports custom geometry outlines" },
        nodes: [
          { title: "Mesh Pattern Builder", subtitle: "Compiles uniform structural struts and hubs along curving shapes", metric: "Grid Solver" },
          { title: "Struts & Hubs Separator", subtitle: "Splits coordinates into distinct lists for linear poles and connection hubs", metric: "Clean Profiles" },
          { title: "Spatial Data Packer", subtitle: "Packs geometric properties into compact, shareable coordinates format", metric: "Matrix Synced" },
          { title: "Revit Endpoint Feeder", subtitle: "Streams coordinate tables into the active drawing viewer program", metric: "Revit API Connect" }
        ],
        decision: { title: "STRUCTURALLY SOUND TEST", gate: "Do strut widths conform to default stability regulations?", yes: "STABLE", no: "RE-RUN SOLVER", desc: "Checks material thicknesses before building model" },
        end: { title: "RE-PREPARED MODEL OUTLET", subtitle: "Rebuilt Native Objects", desc: "Successfully rebuilt 5,700 items with physical data back in active drawer" }
      };
    default:
      return {
        start: { title: "INPUT DATASTREAM", subtitle: "Parameters Ingestion", desc: "Initialize pipeline triggers" },
        nodes: [
          { title: "Extract Parameters", subtitle: defaultSteps[0] || "Process node metrics", metric: "Active" },
          { title: "Verify Integrity", subtitle: defaultSteps[1] || "Process node metrics", metric: "Checked" },
          { title: "Model Alignment", subtitle: defaultSteps[2] || "Process node metrics", metric: "Linked" },
          { title: "Layout Ready", subtitle: defaultSteps[3] || "Process node metrics", metric: "Done" }
        ],
        decision: { title: "VALIDATION DIAGNOSTIC", gate: "Do bounds pass integrity limit?", yes: "SUCCESS", no: "RE-EVALUATE", desc: "Dynamic diagnostic checks" },
        end: { title: "OUTPUT SYSTEM STREAM", subtitle: "Pipeline Finished", desc: "Data serialized and sent instantly" }
      };
  }
};

const FlowArrow = ({ isArch }: { isArch: boolean; key?: any }) => {
  return (
    <div className="flex flex-col items-center justify-center py-1">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="overflow-visible opacity-50">
        <line 
          x1="12" y1="0" x2="12" y2="24" 
          stroke={isArch ? "#000000" : "#01f2ff"} 
          strokeWidth="1.5" 
          strokeDasharray={isArch ? "2 2" : "3 3"} 
        />
        <path 
          d="M8 16L12 20L16 16" 
          stroke={isArch ? "#000000" : "#01f2ff"} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </div>
  );
};

const WorkflowFlowchart = ({ 
  projectId, 
  steps, 
  isArch,
  color 
}: { 
  projectId: string; 
  steps: string[]; 
  activeSimStep?: number; 
  isSimRunning?: boolean; 
  isArch: boolean;
  color: string;
}) => {
  const data = getFlowchartData(projectId, steps);

  return (
    <div className={`font-mono text-xs rounded-lg p-2 md:p-5 transition-all duration-700 ${
      isArch 
        ? "bg-gray-50/50 border border-gray-150 text-gray-800" 
        : "bg-[#04070a] border border-terminal-border/20 text-gray-400"
    }`}>
      {/* Start Node */}
      <div className="flex flex-col items-center">
        <div 
          className={`px-4 py-2 rounded-full border text-center shadow-sm max-w-full ${
            isArch
              ? "border-black text-black font-semibold bg-white"
              : "border-emerald-500/85 text-emerald-400 bg-emerald-950/15"
          }`}
        >
          <div className="text-[8px] opacity-75 uppercase tracking-widest font-bold">START</div>
          <div className="text-[10px] md:text-xs font-bold">{data.start.title}</div>
          <div className="text-[9px] opacity-80 font-normal">{data.start.subtitle}</div>
        </div>
        
        <FlowArrow isArch={isArch} />
      </div>

      {/* Sequential Process Nodes */}
      {data.nodes.map((node, i) => {
        return (
          <React.Fragment key={i}>
            <div
              className={`border rounded p-3.5 transition-all duration-500 relative overflow-hidden ${
                isArch
                  ? "border-black bg-white text-black"
                  : "border-terminal-border/30 bg-[#080b0e] text-gray-300"
              }`}
            >
              <div className="flex justify-between items-start gap-2 mb-1.5">
                <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${
                  isArch 
                    ? "bg-black text-white" 
                    : "bg-terminal-border/10 text-neon-cyan border border-terminal-border/20"
                }`}>
                  PHASE 0{i + 1}
                </span>
                
                {node.metric && (
                  <span className={`text-[9px] font-bold ${
                    isArch ? "text-black" : "text-neon-orange"
                  }`}>
                    {node.metric}
                  </span>
                )}
              </div>

              <div className="flex gap-2.5 items-start">
                <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-full border flex items-center justify-center ${
                  isArch
                    ? "border-black text-black bg-white"
                    : "border-terminal-border/40 text-gray-400 bg-black/40"
                }`}>
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className={`text-[11px] font-bold tracking-tight ${
                    isArch ? "text-black" : "text-gray-100"
                  }`}>
                    {node.title}
                  </h4>
                  <p className={`text-[10px] leading-relaxed mt-0.5 font-normal ${
                    isArch ? "text-gray-600" : "text-gray-400"
                  }`}>
                    {node.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Render arrow pointing to next step */}
            {i === 2 ? (
              <div className="flex flex-col items-center py-2" key={`dec-${i}`}>
                <FlowArrow isArch={isArch} />
                
                {/* Decision Gate Diamond Node */}
                <div className="flex justify-center items-center my-2 relative max-w-full">
                  <div className={`relative px-4 py-4 rounded-xl border flex flex-col items-center justify-center max-w-xs ${
                    isArch 
                      ? "border-black bg-white text-black text-center shadow-md font-semibold"
                      : "border-neon-cyan/40 bg-black/60 text-white shadow-[0_0_15px_rgba(1,242,255,0.05)]"
                  }`}>
                    {/* Branch Labels */}
                    <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 flex items-center font-bold text-[8px] text-red-500/70 select-none">
                      <span>[ALT]</span>
                      <span className="shrink-0 h-[1px] w-3 bg-red-850 ml-1" />
                    </div>
                    <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 flex items-center font-bold text-[8px] text-emerald-400/80 select-none">
                      <span className="shrink-0 h-[1px] w-3 bg-emerald-800 mr-1" />
                      <span>[APPROVED]</span>
                    </div>

                    <div className="text-[7.5px] uppercase font-bold tracking-widest text-gray-500">ASSURANCE GATE</div>
                    <div className="text-[10px] font-bold text-center mt-1 text-neon-orange">{data.decision.title}</div>
                    <div className="text-[9px] font-medium text-center border border-dashed border-terminal-border/10 px-2 py-0.5 rounded mt-1.5 bg-black/40 text-gray-400">
                      Rule: {data.decision.gate}
                    </div>
                    
                    <div className={`text-[8px] font-bold uppercase tracking-wider mt-1.5 px-2 py-0.5 rounded ${
                      isArch ? "bg-black text-white" : "bg-emerald-950/40 text-emerald-400 border border-emerald-900"
                    }`}>
                      STATUS: {data.decision.yes}
                    </div>
                  </div>
                </div>

                <FlowArrow isArch={isArch} />
              </div>
            ) : i < 3 ? (
              <FlowArrow isArch={isArch} key={`arr-${i}`} />
            ) : null}
          </React.Fragment>
        );
      })}

      {/* Connect Node 4 to END TERMINATE Node */}
      <FlowArrow isArch={isArch} />

      {/* End Node */}
      <div className="flex flex-col items-center">
        <div 
          className={`px-4 py-2.5 rounded-xl border text-center max-w-full ${
            isArch
              ? "border-black bg-white text-black font-semibold shadow-md"
              : "border-emerald-500/60 bg-emerald-950/30 text-emerald-300"
          }`}
        >
          <div className="text-[8px] opacity-75 uppercase tracking-widest font-bold">DISPATCH TARGET</div>
          <div className="text-[10px] md:text-xs font-bold text-emerald-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {data.end.title}
          </div>
          <div className="text-[9px] font-normal opacity-90 mt-0.5">{data.end.desc}</div>
        </div>
      </div>
    </div>
  );
};

const WorkloadGif = ({ 
  src, 
  alt, 
  className, 
  isArch,
  forcePlay = false,
  play,
  isInModal = false
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  isArch: boolean;
  forcePlay?: boolean;
  play?: boolean;
  isInModal?: boolean;
}) => {
  const [isInternalHovered, setIsInternalHovered] = useState(false);
  const active = play !== undefined ? play : (forcePlay || isInternalHovered);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const isVideo = React.useMemo(() => {
    if (!src) return false;
    return src.includes("#video") || src.toLowerCase().endsWith(".mp4") || src.toLowerCase().endsWith(".mov") || src.includes("1h89DNz0NAtQeH_rtLlNxXqN0ZI_9FXuk");
  }, [src]);

  React.useEffect(() => {
    if (isVideo && videoRef.current) {
      if (active) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [active, isVideo]);

  const staticUrl = React.useMemo(() => {
    if (!src) return "";
    // Google Drive check
    if (src.includes('lh3.googleusercontent.com/d/')) {
      const id = src.split('/').pop()?.split('#')[0];
      return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
    }
    // Giphy check
    if (src.includes('giphy.com/media/')) {
      return src.replace('/giphy.gif', '/giphy_s.gif');
    }
    return src;
  }, [src]);

  if (isVideo && isInModal) {
    const googleDriveId = getDriveId(src);
    if (googleDriveId) {
      return (
        <div 
          className="w-full h-full relative"
          onMouseEnter={() => setIsInternalHovered(true)}
          onMouseLeave={() => setIsInternalHovered(false)}
        >
          {active ? (
            <iframe
              src={`https://drive.google.com/file/d/${googleDriveId}/preview?autoplay=1&mute=1`}
              className={`${className} border-0 pointer-events-auto`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <img 
              src={staticUrl} 
              alt={alt}
              referrerPolicy="no-referrer"
              className={className}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          )}
        </div>
      );
    }

    const cleanSrc = getPlayableVideoUrl(src);
    return (
      <div 
        className="w-full h-full relative"
        onMouseEnter={() => setIsInternalHovered(true)}
        onMouseLeave={() => setIsInternalHovered(false)}
      >
        <video 
          ref={videoRef}
          src={cleanSrc} 
          loop 
          muted 
          playsInline
          className={className}
          poster={staticUrl}
        />
        {!active && (
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
            {/* Subtle overlay when paused */}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full"
      onMouseEnter={() => setIsInternalHovered(true)}
      onMouseLeave={() => setIsInternalHovered(false)}
    >
      <img 
        src={isVideo ? staticUrl : (active ? src : staticUrl)} 
        alt={alt}
        referrerPolicy="no-referrer"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        className={className}
      />
    </div>
  );
};

const ProjectCard = ({ 
  item, 
  isArch, 
  onClick,
  onShowScript,
  onShowVideo
}: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
      }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`group relative overflow-hidden border transition-all duration-700 cursor-pointer flex flex-col h-full ${
        isArch 
        ? "border-gray-100 bg-white hover:border-black hover:shadow-2xl hover:shadow-black/5" 
        : "border-terminal-border bg-black/40 hover:border-neon-cyan hover:shadow-[0_0_30px_rgba(0,255,255,0.05)]"
      }`}
    >
      <div className="aspect-[16/11] overflow-hidden relative">
        <WorkloadGif 
          src={item.gifUrl} 
          alt={item.title}
          isArch={isArch}
          play={isHovered}
          className={`w-full h-full object-cover transition-all duration-1000 scale-100 group-hover:scale-105 pointer-events-none select-none ${
            isArch 
            ? "grayscale group-hover:grayscale-0" 
            : "opacity-40 group-hover:opacity-80"
          }`}
        />
        {/* Engineering Scanner Effect */}
        {!isArch && (
          <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-cyan/30 shadow-[0_0_10px_rgba(0,255,255,0.5)] opacity-0 group-hover:opacity-100 group-hover:animate-scan z-10" />
        )}
        
        <div className={`absolute inset-0 transition-opacity duration-700 ${isArch ? "bg-black/5 opacity-0 group-hover:opacity-100" : "bg-neon-cyan/5 opacity-0 group-hover:opacity-100"}`} />
        
        {item.scriptUrl && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onShowScript) {
                onShowScript(item.scriptUrl, item.title);
              }
            }}
            className={`absolute bottom-3 left-3 px-3 py-1.5 text-[9px] font-mono tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 z-30 pointer-events-auto shadow-md ${
              isArch 
                ? "bg-white text-black hover:bg-black hover:text-white border border-gray-200" 
                : "bg-black/95 text-neon-cyan hover:bg-neon-cyan hover:text-black border border-neon-cyan/35"
            }`}
          >
            <Code2 className="w-3.5 h-3.5 animate-pulse" />
            Show Script
          </button>
        )}

        <div className={`absolute top-4 right-4 p-3 rounded-full border transition-all duration-700 bg-black/80 backdrop-blur-md z-20 ${
          isArch 
          ? "border-gray-200 text-black hidden" 
          : `border-${item.color}/30 text-${item.color} scale-90 group-hover:scale-100`
        }`}>
          {item.icon}
        </div>
      </div>

      <div className="p-6 md:p-8 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className={`text-xl md:text-2xl font-medium tracking-tight mb-1 transition-colors duration-700 ${isArch ? "text-black font-serif italic" : "text-white font-sans"}`}>
              {item.title}
            </h4>
            {item.role && (
              <div className={`text-[10px] md:text-[11px] font-mono tracking-widest uppercase transition-colors duration-700 ${isArch ? "text-gray-400" : "text-neon-orange"}`}>
                {item.role}
              </div>
            )}
          </div>
          {item.category && (
            <div className="flex items-center gap-2">
              <span className={`text-[8px] md:text-[9px] font-mono px-2 py-1 border transition-colors duration-700 ${isArch ? "border-black text-black" : "border-neon-cyan text-neon-cyan"}`}>
                {item.category}
              </span>
            </div>
          )}
        </div>

        {item.hook && (
          <div className={`text-[10px] md:text-[11px] font-mono mb-4 py-2 border-y transition-colors duration-700 border-dashed ${isArch ? "text-gray-600 italic border-gray-100" : "text-neon-cyan border-terminal-border"}`}>
            {`// ${item.hook}`}
          </div>
        )}
        
        <p className={`text-sm md:text-base mb-8 line-clamp-3 leading-relaxed transition-colors duration-700 ${isArch ? "text-gray-500 italic" : "text-gray-400 font-mono"}`}>
          {item.description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {item.tags.map((tag, idx) => (
              <span key={`${item.id}-${tag}-${idx}`} className={`text-[8px] md:text-[9px] font-mono px-2 py-0.5 border transition-colors duration-700 ${isArch ? "border-gray-100 text-gray-400" : "border-terminal-border/50 text-gray-500 group-hover:text-neon-cyan/70 group-hover:border-neon-cyan/20"}`}>
                {tag}
              </span>
            ))}
          </div>

          {/* Compact Workflow Steps Preview */}
          {!isArch && item.workflow?.steps && (
            <div className="mt-4 pt-3.5 border-t border-terminal-border/10 flex items-center justify-between font-mono text-[9px] text-gray-400">
              <span className="flex items-center gap-1.5 text-neon-cyan/70 font-semibold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 animate-pulse text-neon-cyan" />
                Pipeline Flow:
              </span>
              <div className="flex gap-1.5 items-center">
                {/* Node 1 */}
                <span className="w-4 h-4 rounded-full border border-terminal-border/30 bg-black/60 flex items-center justify-center text-[7.5px] text-neon-cyan font-bold" title="Start Data Stream">1</span>
                
                <span className="text-terminal-border/30 text-[7px]">→</span>
                
                {/* Node 2 */}
                <span className="w-4 h-4 rounded-full border border-terminal-border/30 bg-black/60 flex items-center justify-center text-[7.5px] text-neon-cyan font-bold" title="Process Logic mapping">2</span>
                
                <span className="text-terminal-border/30 text-[7px]">→</span>
                
                {/* Node 3 */}
                <span className="w-4 h-4 rounded-full border border-terminal-border/30 bg-black/60 flex items-center justify-center text-[7.5px] text-neon-cyan font-bold" title="Parameter Verification">3</span>
                
                <span className="text-terminal-border/30 text-[7px]">→</span>
                
                {/* Decision Diamond */}
                <span className="w-4 h-4 rotate-45 border border-neon-orange/40 bg-neon-orange/10 flex items-center justify-center text-neon-orange scale-95" title="Decision Check Gate">
                  <span className="-rotate-45 text-[7px] font-extrabold font-sans">◆</span>
                </span>
                
                <span className="text-terminal-border/30 text-[7px]">→</span>
                
                {/* Node 4 */}
                <span className="w-4 h-4 rounded-full border border-emerald-500/40 bg-emerald-950/10 flex items-center justify-center text-[7.5px] text-emerald-400 font-bold" title="End dispatch node">✔</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const CodeSnippet = () => (
  <div className="bg-black p-4 rounded border border-terminal-border font-mono text-xs text-neon-cyan overflow-hidden">
    <div className="flex gap-2 mb-2 opacity-50">
      <div className="w-2 h-2 rounded-full bg-red-500" />
      <div className="w-2 h-2 rounded-full bg-yellow-500" />
      <div className="w-2 h-2 rounded-full bg-green-500" />
    </div>
    <pre className="overflow-x-auto">
      {`def generate_geometry(params):
    # Algorithmic spatial generation
    mesh = Revit.CreateMesh(params)
    for face in mesh.faces:
        if face.area > threshold:
            optimize_topology(face)
    return mesh.deploy()`}
    </pre>
  </div>
);

const HeroTerminal = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const logPool = [
    "ATTACHING_REVIT_DATABASE...",
    "PARSING_ISO_19650_SCHEMA",
    "MAPPING_SPATIAL_PARAMETERS",
    "OPTIMIZING_COMPONENT_PLACEMENT",
    "VERIFYING_CLEARANCE_CLASHES",
    "SYNCING_COBIE_METADATA",
    "GENERATING_AUTOMATION_NODES",
    "VALIDATING_LOD_400_GEOMETRY",
    "PUSHING_DATA_TO_POWERBI",
    "CALCULATING_VOLUME_M3",
    "DETECTION_LATENCY: 12ms",
    "SYSTEM_STATUS: NOMINAL"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, logPool[Math.floor(Math.random() * logPool.length)]];
        if (next.length > 8) return next.slice(1);
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[9px] text-neon-cyan/60 p-4 space-y-1">
      {logs.map((log, i) => (
        <motion.div 
          key={`${log}-${i}`}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-neon-orange opacity-50">{">"}</span> {log}
        </motion.div>
      ))}
      <div className="w-1 h-3 bg-neon-cyan/50 animate-pulse inline-block ml-1" />
    </div>
  );
};

const DataTable = () => (
  <div className="bg-black rounded border border-terminal-border font-mono text-[10px] overflow-hidden">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-bottom border-terminal-border bg-terminal-border/30">
          <th className="p-2 text-neon-orange">ID_TAG</th>
          <th className="p-2 text-neon-orange">VOLUME_M3</th>
          <th className="p-2 text-neon-orange">COST_EST</th>
        </tr>
      </thead>
      <tbody>
        {[
          ["VDC_001", "124.5", "$12,450"],
          ["VDC_002", "89.2", "$8,920"],
          ["VDC_003", "210.7", "$21,070"],
          ["VDC_004", "15.4", "$1,540"],
        ].map(([id, vol, cost], i) => (
          <tr key={i} className="border-bottom border-terminal-border/50">
            <td className="p-2 text-gray-400">{id}</td>
            <td className="p-2 text-neon-cyan">{vol}</td>
            <td className="p-2 text-white">{cost}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SECTIONS = ["hero", "arsenal", "fabrication", "experience", "terminal"];

interface ArsenalItem {
  id: string;
  title: string;
  role?: string;
  hook?: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  metric: string;
  content?: React.ReactNode;
  gifUrl: string;
  tags: string[];
  category?: string;
  isVerified?: boolean;
  scriptUrl?: string;
  workflow?: {
    screenshotUrl: string;
    steps: string[];
  };
  details?: {
    overview: string;
    challenge: string;
    solution: string;
    images?: string[];
    reportUrl?: string;
    videoUrl?: string;
    sheetsUrl?: string;
    comparisonTable?: {
      headers: string[];
      rows: string[][];
    };
  };
}

interface ExperienceData {
  year: string;
  company: string;
  role: string;
  description: string;
}

const AmbientBackground = ({ isArch }: { isArch: boolean }) => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.6, 0.6, 0.3]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Ambient Gradients */}
      <motion.div 
        style={{ y: y1, opacity }}
        className={`absolute -top-1/2 -left-1/4 w-[150%] h-[150%] rounded-full blur-[120px] transition-colors duration-1000 ${
          isArch ? "bg-gray-100/30" : "bg-neon-cyan/5"
        }`}
      />
      <motion.div 
        style={{ y: y2, rotate, opacity }}
        className={`absolute -bottom-1/2 -right-1/4 w-[150%] h-[150%] rounded-full blur-[120px] transition-colors duration-1000 ${
          isArch ? "bg-gray-200/20" : "bg-neon-orange/5"
        }`}
      />
      
      {/* Grid Overlay */}
      <div className={`absolute inset-0 opacity-[0.03] transition-colors duration-700 ${isArch ? "text-black" : "text-white"}`}>
        <div className="w-full h-full grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)]">
          {Array.from({ length: 1600 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-current" />
          ))}
        </div>
      </div>
    </div>
  );
};

const ParallaxSection = ({ children, id, index, setActiveSection }: { children: React.ReactNode, id: string, index: number, setActiveSection: (i: number) => void }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [index === 0 ? 1 : 0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [index === 0 ? 1 : 0.8, 1, 1, 0.8]);

  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setActiveSection(index);
    }
  }, [isInView, index, setActiveSection]);

  return (
    <section 
      ref={ref} 
      id={id} 
      className="min-h-[60vh] md:min-h-[85vh] w-full flex items-center justify-center relative py-10 md:py-12 px-6 overflow-hidden"
    >
      <motion.div 
        style={{ y, opacity, scale }}
        className="w-full max-w-7xl z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isAppsActive, setIsAppsActive] = useState(false);
  const [selectedArsenalItem, setSelectedArsenalItem] = useState<ArsenalItem | null>(null);
  const [expandedMedia, setExpandedMedia] = useState<{ src: string; isVideo: boolean; isGif?: boolean; googleDriveId: string | null; alt: string } | null>(null);

  const vdcTimelineRef = useRef<HTMLDivElement>(null);
  const archTimelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: vdcScroll } = useScroll({
    target: vdcTimelineRef,
    offset: ["start center", "end center"]
  });

  const { scrollYProgress: archScroll } = useScroll({
    target: archTimelineRef,
    offset: ["start center", "end center"]
  });

  const vdcScaleY = useSpring(vdcScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const archScaleY = useSpring(archScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [mode, setMode] = useState<'bim' | 'arch'>('bim');
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // VDC Core Workflow Logic Processor States
  const [simulatingWorkflowId, setSimulatingWorkflowId] = useState<string | null>(null);
  const [activeSimStep, setActiveSimStep] = useState<number>(-1);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [isSimRunning, setIsSimRunning] = useState<boolean>(false);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'render' | 'drawing' | 'video'>('all');

  // Clear simulator on selection change
  useEffect(() => {
    setSimulatingWorkflowId(null);
    setActiveSimStep(-1);
    setSimulationLogs([]);
    setIsSimRunning(false);
    setGalleryFilter('all');
  }, [selectedArsenalItem]);

  // Comprehensive Visual Protection Layer (Block Saving, Copying, and Downloading of Media)
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Completely block right clicks across the page to secure source layers
      e.preventDefault();
    };

    const handleDragStart = (e: DragEvent) => {
      // Prevent any image, video, canvas, or iframe from being dragged out of the window coordinates
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'IMG' || target.tagName === 'VIDEO' || target.tagName === 'IFRAME' || target.tagName === 'CANVAS')) {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      
      // Ctrl+S / Cmd+S (Prevent saving page / assets compile)
      if (isCmdOrCtrl && e.key.toLowerCase() === 's') {
        e.preventDefault();
      }
      
      // Ctrl+U / Cmd+Option+U (Prevent View Source)
      if ((isCmdOrCtrl && e.key.toLowerCase() === 'u') || (isMac && isCmdOrCtrl && e.altKey && e.key.toLowerCase() === 'u')) {
        e.preventDefault();
      }

      // Ctrl+Shift+I / Cmd+Option+I (Prevent Inspect inspector)
      if ((isCmdOrCtrl && e.shiftKey && e.key.toLowerCase() === 'i') || (isMac && isCmdOrCtrl && e.altKey && e.key.toLowerCase() === 'i')) {
        e.preventDefault();
      }

      // Ctrl+Shift+C / Cmd+Option+C / Inspect visual trigger
      if ((isCmdOrCtrl && e.shiftKey && e.key.toLowerCase() === 'c') || (isMac && isCmdOrCtrl && e.altKey && e.key.toLowerCase() === 'c')) {
        e.preventDefault();
      }

      // Ctrl+Shift+J / Cmd+Option+J (Prevent Console drawer)
      if ((isCmdOrCtrl && e.shiftKey && e.key.toLowerCase() === 'j') || (isMac && isCmdOrCtrl && e.altKey && e.key.toLowerCase() === 'j')) {
        e.preventDefault();
      }

      // F12 (Inspect Developer console key)
      if (e.key === 'F12') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const runWorkflowSimulation = (projectId: string, steps: string[]) => {
    if (isSimRunning) return;
    setIsSimRunning(true);
    setSimulatingWorkflowId(projectId);
    setActiveSimStep(0);
    
    const initLogs = [
      `>> Handshaking secure listener endpoint for workflow assembly [${projectId}]...`,
      `>> Loading computational schema variables in local sandbox...`,
      `[STEP 01]: Running...`,
      getSimLogsForProject(projectId, 0)
    ];
    setSimulationLogs(initLogs);

    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep < steps.length) {
        setActiveSimStep(currentStep);
        const nextLog = getSimLogsForProject(projectId, currentStep);
        setSimulationLogs(prev => [
          ...prev, 
          `[STEP 0${currentStep + 1}]: Running...`, 
          nextLog
        ]);
      } else {
        clearInterval(interval);
        setActiveSimStep(steps.length);
        setSimulationLogs(prev => [
          ...prev, 
          `[SUCCESS]: PIPELINE FULLY SERIALIZED, COMPILED, AND INJECTED SUCESSFULLY. ENTIRE CALCULATION EXECUTED IN 42ms.`,
          `>> Dynamic system updates synced to parent portfolio dashboard.`
        ]);
        setIsSimRunning(false);
      }
    }, 1500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setFormError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to transmit message');
        }
        setIsSent(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSent(false), 5000);
      } else {
        // Handle non-JSON responses (like 404 HTML pages)
        const text = await response.text();
        console.error('Non-JSON response:', text);
        if (response.status === 404) {
          throw new Error('API_NOT_FOUND: The backend server is not responding to this route.');
        }
        throw new Error(`SERVER_ERROR: Received unexpected response format (${response.status})`);
      }
    } catch (err) {
      console.error('Transmission error:', err);
      setFormError(err instanceof Error ? err.message : 'CONNECTION_ERROR: UNABLE_TO_REACH_VDC_CORE');
    } finally {
      setIsSending(false);
    }
  };

  const isArch = mode === 'arch';
  const [terminalMode, setTerminalMode] = useState<'bim' | 'arch'>('bim');
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  const visibleSections = ["landing", "vdc-section", "arch-section", "terminal"];

  const menuItems = [
    { id: "landing", label: "Gateway", isSection: true, index: 0, elementId: "landing" },
    { id: "vdc-section", label: "VDC Core", isSection: true, index: 1, elementId: "vdc-section" },
    { id: "vdc-apps", label: "Apps / Web", isSection: false, elementId: "vdc-apps" },
    { id: "arch-section", label: "Arch Studio", isSection: true, index: 2, elementId: "arch-section" },
    { id: "terminal", label: "Contact & Bio", isSection: true, index: 3, elementId: "terminal" },
  ];

  const archArsenal: ArsenalItem[] = [
    {
      id: "ARCH_01",
      title: "Net-Zero Worker Housing",
      role: "Simulation Lead",
      hook: "National Grand Winner (Solar Decathlon India).",
      description: "Simulation Lead for Health and Well-being. Optimized design outcomes for large-scale Construction Worker Housing through data storytelling.",
      icon: <ShieldCheck className="w-6 h-6 text-gray-400" />,
      color: "gray-400",
      metric: "Net-Zero",
      gifUrl: "https://lh3.googleusercontent.com/d/1-BhZKRQJEpkQhE8Kuq6BURh0UYO7qYrH",
      tags: ["Performance Simulation", "DesignBuilder", "IESVE"],
      category: "Exterior",
      workflow: {
        screenshotUrl: "https://lh3.googleusercontent.com/d/1P0FpPB-A9-Cs0bz1cywCumsfNBZyCA6j",
        steps: [
          "Model complex building geometry for thermal analysis.",
          "Extract and scrub simulation data for optimization.",
          "Validate passive cooling strategies (EAX, Radiant).",
          "Present technical data narrative to jury panels."
        ]
      },
      details: {
        overview: "This project addressed the critical need for dignified, sustainable housing for construction workers in India. Our team won the National Grand Prize for our holistic approach to net-zero energy and water.",
        challenge: "Achieving thermal comfort in a hot-humid climate without active cooling, while keeping construction costs extremely low for scalability.",
        solution: "We implemented passive cooling strategies including earth-air heat exchangers and radiant cooling. My role involved extensive performance simulation to validate these strategies, resulting in a 40% reduction in predicted energy use compared to the baseline.",
        images: [
          "https://lh3.googleusercontent.com/d/1P0FpPB-A9-Cs0bz1cywCumsfNBZyCA6j",
          "https://lh3.googleusercontent.com/d/1PSV1JocI5rfTI7YN3pJTuZfHfC7VrErr",
          "https://lh3.googleusercontent.com/d/1Cva8sA6rByHMMdrSopwZ9nExSzl7tua2",
          "https://lh3.googleusercontent.com/d/1F7hEXo7cFfefXcQZkAtw8VD1ORVlbUF5",
          "https://lh3.googleusercontent.com/d/1VsF-1b3fSI0iGVvb5gw7YUcfE1bwk8v6",
          "https://lh3.googleusercontent.com/d/1T6NhY_HzNaA5KmDZ8gGQwsL7Q4VgAwDt",
          "https://lh3.googleusercontent.com/d/1_uB4eu_Sdt_0MJNhG5vjkc9qqWocySVb#video",
          "https://lh3.googleusercontent.com/d/1lP5dsWK4keZJ-mVAUGqbfzbCTjTECsyB#video",
          "https://lh3.googleusercontent.com/d/1HGwlS9XXgMU6SRxc6KdCuYKbJffCh3-r#video",
          "https://lh3.googleusercontent.com/d/1dB5qahGlL_OdCbpCnj0zgwUxDsLn_Xa1#video",
          "https://lh3.googleusercontent.com/d/1x3k1iHMCjOgRUqC4u8oy97EonAP1Gi56#video",
          "https://lh3.googleusercontent.com/d/1op-zIIk9ZTYHpaqFzP1jlqkWUBet1u8V#video",
          "https://lh3.googleusercontent.com/d/1NZ5bClvC2fRsykZkFubZosvNEPCWZiof#video",
          "https://lh3.googleusercontent.com/d/1tZkbfwAA5Al8zqCDQAPOIu1DmZKL_axo#video",
          "https://lh3.googleusercontent.com/d/1IJbgeznNn0qwVKCBzD--ZleqbjowBO7k#video",
          "https://lh3.googleusercontent.com/d/1pIA11NoDFafX6hNuXCDvp6XaoLvVVa9d#video",
          "https://lh3.googleusercontent.com/d/1N93o2rnSNbHFxC524i330sgD4Y2YqmMO#video"
        ],
        reportUrl: "https://drive.google.com/file/d/1CqV2ZUK7VDxh0zOxQze9lkTSIEavsr12/view?usp=sharing",
        videoUrl: "https://youtu.be/g0VIh64HiT8?si=hyFN6JXnnG_pqM5A"
      }
    },
    {
      id: "ARCH_08",
      title: "Villa Project - IMK internship",
      role: "Architectural Intern",
      hook: "Bespoke high-end residential villa utilizing passive microclimatic screening.",
      description: "Contributed directly to schematic spatial programming, detailed structural detailing, and interior custom-woodwork in Vectorworks. Produced high-fidelity real-time interactive landscape and climate renders via Twinmotion.",
      icon: <Box className="w-6 h-6 text-gray-400" />,
      color: "gray-400",
      metric: "Bespoke Villa",
      gifUrl: "https://lh3.googleusercontent.com/d/1szg4o6fK4gooWlBDS4d9qGr9EmG7QoRA",
      tags: ["Vectorworks", "Schematic Design", "Twinmotion", "IMK Internship", "Detailing"],
      category: "Conceptual",
      workflow: {
        screenshotUrl: "https://lh3.googleusercontent.com/d/1szg4o6fK4gooWlBDS4d9qGr9EmG7QoRA",
        steps: [
          "Establish bespoke spatial zoning guidelines tailored to private residential briefs.",
          "Synthesize localized wind-flow and sunpath charts to anchor physical canopy overhangs.",
          "Model custom modular millwork in high-fidelity LOD 350 within Vectorworks.",
          "Iterate multi-scenario lighting passes and natural materials inside Twinmotion."
        ]
      },
      details: {
        overview: "Developed as part of a rigorous design team during the IMK Internship, this private luxury residential villa project represents an seamless synthesis of luxury-class scale with regional climatic adaptability.",
        challenge: "Maintaining a sense of spatial transparency and expansive views across the double-height courtyards while preventing excessive glare and thermal gain in hot-dry seasons.",
        solution: "Engineered a parametric secondary structural lattice spanning key glazing zones. By setting dynamic spacing and depth parameters, we filtered peak summer sunpath vectors by 70% while distributing soft, uniform daylight throughout core living volumes.",
        images: [
          "https://lh3.googleusercontent.com/d/1szg4o6fK4gooWlBDS4d9qGr9EmG7QoRA",
          "https://picsum.photos/seed/villainterior/800/450?grayscale",
          "https://picsum.photos/seed/villaexterior/800/450?grayscale",
          "https://picsum.photos/seed/villaplan/800/450?grayscale"
        ]
      }
    },
    {
      id: "ARCH_02",
      title: "Sadhu Nivas Residence",
      role: "Architectural Designer & BIM Modeler",
      hook: "Modular prefabrication meeting minimalistic, tranquil spiritual living.",
      description: "Designed a modular, prefabricated residential community tailored for sadhus. Crafted precise Revit 3D modeling and detailed documentation for prefab wall/slab modules, and produced atmospheric, high-fidelity renders using Twinmotion & Snaptrude.",
      icon: <Layers className="w-6 h-6 text-gray-400" />,
      color: "gray-400",
      metric: "Prefab Modules",
      gifUrl: "https://lh3.googleusercontent.com/d/10bE7vtwgn9WTlx-7E85wnqciWxuwP_M9",
      tags: ["Revit", "Twinmotion", "Snaptrude", "Prefabricated Modules", "Modular Design"],
      category: "Conceptual",
      workflow: {
        screenshotUrl: "https://lh3.googleusercontent.com/d/10bE7vtwgn9WTlx-7E85wnqciWxuwP_M9",
        steps: [
          "Establish minimalistic spatial needs and rigid modular grids.",
          "Author precise Revit parametric families for prefabricated wall and slab modules.",
          "Integrate models dynamically between Snaptrude for rapid spatial alignment and Revit.",
          "Render tranquil landscapes and atmospheric materials in Twinmotion."
        ]
      },
      details: {
        overview: "The Sadhu Residence Complex is a visionary, non-institutional modular residential compound designed to support the minimalistic lifestyles and intense meditative routines of spiritual practitioners (sadhus).",
        challenge: "Balancing strict architectural modular grids required for low-cost prefabrication with warm, tranquil, and atmospheric spatial qualities appropriate for deep contemplation.",
        solution: "Engineered high-LOD Revit families for a repeating 3m x 3m precast wall/slab structural shell. Optimized layout groupings to maximize private courtyard thresholds, rendering the spiritual landscape in Twinmotion to assure acoustic safety and visual peace.",
        images: [
          "https://lh3.googleusercontent.com/d/1wTF4ThR7toYkbOtAQS_bQ226Ou_NIAM2",
          "https://lh3.googleusercontent.com/d/1Ds1UzgVlSWSDZu2sLBM8VJ7RR3k4ks5c",
          "https://lh3.googleusercontent.com/d/1tz7_0qKj9O7gMb9Y_9LRu1Nwm2kzzIYg",
          "https://lh3.googleusercontent.com/d/1Di8ozi0jUXqKojYWEaZ-KM3EYMsBVHep",
          "https://lh3.googleusercontent.com/d/1GsP_RnRX4wjf2BPgk93AzGhAxbzsbvyp",
          "https://lh3.googleusercontent.com/d/1W1shkPhmOT2Y-nhdv1_-D6hbkm-Sc8gx",
          "https://lh3.googleusercontent.com/d/16UI9YEMQHAphksfgTeCE6sBbBgC-jg0U",
          "https://lh3.googleusercontent.com/d/1KI8zKEskTYvEeUbJUo87o86QdEdA9_m1",
          "https://lh3.googleusercontent.com/d/1J3j_7LYpiKy8qrM9SZu7dc_vAECn4z2i",
          "https://lh3.googleusercontent.com/d/1cm0tohPLT8u_WnCNwzvoqi46rwLeCHsO",
          "https://lh3.googleusercontent.com/d/15wp51CpGqduNTeQLAXVpk7dBN9vS99Ku",
          "https://lh3.googleusercontent.com/d/1c4xsY78BVQDV2jomVFD8aeMzM_s-3uGU",
          "https://lh3.googleusercontent.com/d/1BpGCi_vwo8EG9yCysuWydBhmudsMEl8l",
          "https://lh3.googleusercontent.com/d/1gMFMRcdBS6DYQN7ZN5WRX8HGB_ELZhVJ",
          "https://lh3.googleusercontent.com/d/1lsUqSn-K-O5hI56tiHRXObaJwX_xeadE",
          "https://lh3.googleusercontent.com/d/1aV_9MlRN_LWOAUA-bFk0i82I119RBRMD",
          "https://lh3.googleusercontent.com/d/1v3uwvGvv0nB4Dx0KahIp3X47xKVCWxff",
          "https://lh3.googleusercontent.com/d/12YaZiM-2dt8hQbGtk_VQd2rewL44zXsS"
        ]
      }
    },
    {
      id: "ARCH_05",
      title: "Karunya Hospice",
      role: "Lead Architect (Thesis)",
      hook: "Designing for dignity, nature, and the final transition.",
      description: "Comprehensive hospice and palliative care facility designed to facilitate end-of-life care with dignity. Integrates nature into every space.",
      icon: <Activity className="w-6 h-6 text-gray-400" />,
      color: "gray-400",
      metric: "Biophilic",
      gifUrl: "https://lh3.googleusercontent.com/d/1cEY_3KZExGtCPAO_BJLjaEXJW2yUMLlM",
      tags: ["Healthcare Design", "Biophilic Architecture", "Thesis"],
      category: "Exterior",
      details: {
        overview: "Karunya Hospice is a 50-bed palliative care facility that redefines the environment of end-of-life care. It moves away from the clinical 'hospital' feel towards a domestic, nature-centric sanctuary.",
        challenge: "Balancing the high medical requirements of palliative care with a non-institutional, peaceful atmosphere that supports both patients and their grieving families.",
        solution: "The design uses a decentralized pavilion layout connected by sensory gardens. Each patient room has a private view of nature and direct access to outdoor terraces, ensuring that no patient is ever isolated from the natural world.",
        images: [
          "https://lh3.googleusercontent.com/d/1_Gcehq-yN--25n8qKIkSLTGIleQGQqve",
          "https://lh3.googleusercontent.com/d/1wPuVIXSD99yWsCg5AcQxJCC07R3VT3Bi",
          "https://lh3.googleusercontent.com/d/10eT2Y5ITVC2rjeHDXCh-yPD0Af-pk14j",
          "https://lh3.googleusercontent.com/d/12TPa10Mxy8wJ9Da9DOFD48-xJM4t3uiY",
          "https://lh3.googleusercontent.com/d/1KclgbyOUEM5eTVfDpOocFjSuVom3Xr_B",
          "https://lh3.googleusercontent.com/d/1cOskWjIzbsqhV1jlYbwSRFUgCJI14n2U",
          "https://lh3.googleusercontent.com/d/1wGJdJN6ZXf2WK28EafESDcnviVNcKF-p",
          "https://lh3.googleusercontent.com/d/13KSTSMy3wsQBVQJFRsasLFePVawzWjIR",
          "https://lh3.googleusercontent.com/d/1DGOkd7MY8sSAgzt0TzWYzW0ahkriXY7_",
          "https://lh3.googleusercontent.com/d/1L6LOgUmekOk3XJK2rji7DtpdAkReZ8_b",
          "https://lh3.googleusercontent.com/d/1znclz2rFpl0BS2zJfp9w7nrHm2QCgAFk",
          "https://lh3.googleusercontent.com/d/1zfEJf3Tm6qnhkQPXa4saAn0MZTtu_iii",
          "https://lh3.googleusercontent.com/d/1-qHLRSlDroUqLxAvqcYv14LNOM1vulwd",
          "https://lh3.googleusercontent.com/d/1V3yL6NdCiARmGbKN4b80j2h9fRx3gN0M",
          "https://lh3.googleusercontent.com/d/1vk8Blck2gZZrDQDAxt-OEU9oJFQF1IBq",
          "https://lh3.googleusercontent.com/d/1uZE-A0Cy92pzz7gWfdFr5vdeaa7TBMEc",
          "https://lh3.googleusercontent.com/d/1uKUbCflYtDqzWmYiSwtsjbL95Uxfw0q6",
          "https://lh3.googleusercontent.com/d/1La6OD3SJ0vYjtlG8GseC5b6iHqDwtgIW",
          "https://lh3.googleusercontent.com/d/1waqzjq0LVsh2vZuRcIX3rFrNMho5KTD",
          "https://lh3.googleusercontent.com/d/1EwxzT95gIriGk_KPSlspFuGd0dxOJQqw",
          "https://lh3.googleusercontent.com/d/1Btke20IAGtI8itws0GujFR2-nvKGDpgs",
          "https://lh3.googleusercontent.com/d/1vtmSPO5cY0bEyPfHB6q-8TK_N-EWR0Bw",
          "https://lh3.googleusercontent.com/d/1M5toemwPLORhUg-EygnGVp5G2zPyYqpH"
        ]
      }
    },
    {
      id: "ARCH_06",
      title: "Recycled Bus Pavilion",
      role: "Design & Build Lead",
      hook: "National Citation for functional adaptive reuse.",
      description: "Competition-winning pavilion repurposed from a discarded bus using 100% recycled materials. Hands-on fabrication experience.",
      icon: <Hammer className="w-6 h-6 text-gray-400" />,
      color: "gray-400",
      metric: "Upcycled",
      gifUrl: "https://lh3.googleusercontent.com/d/1UueeMY09uP6M6tZWtjhFKjzENJhUIpEs",
      tags: ["Fabrication", "Materiality", "On-Site Assembly"],
      category: "Fabrication",
      details: {
        overview: "The Recycled Bus Pavilion was a live design-build project aimed at demonstrating the potential of 'upcycling' industrial waste into community infrastructure.",
        challenge: "Working with a rigid, pre-existing structural shell (the bus) and adapting it to a new, open-ended public function while ensuring structural safety.",
        solution: "We stripped the bus to its chassis and reinforced it with reclaimed steel sections. The design featured a modular seating system and a translucent roof made from recycled polycarbonate sheets, creating a lightweight, airy community hub.",
        images: [
          "https://lh3.googleusercontent.com/d/1UueeMY09uP6M6tZWtjhFKjzENJhUIpEs",
          "https://lh3.googleusercontent.com/d/1BEgKY95IEr5g9vbVArBGeUGZe8lnuU53#video",
          "https://lh3.googleusercontent.com/d/1KZwCamzNHbMIJW9zjc__BPriQxhLQold#video",
          "https://lh3.googleusercontent.com/d/1XgZsHYRfq3RkWR-FSGAd9tEdbRK2aSAK#video",
          "https://lh3.googleusercontent.com/d/1Nqeb36k13kD_g49etHZ38_or4WD_icIG#video",
          "https://lh3.googleusercontent.com/d/1AsSVINu4uc7BdGmYxWBPvlA0Fed4Z_se#video",
          "https://drive.google.com/thumbnail?id=1RmOX0EQAvEfpyMT2BvwEKyJCvsyrDaiw&sz=w1600#image",
          "https://drive.google.com/thumbnail?id=1c47f6sBJ3JMR6g8IwiECxdT3ZTS01HPO&sz=w1600#image",
          "https://drive.google.com/thumbnail?id=1cnzuWz90XbBcYdk50dSv31Uwh4fT5QYo&sz=w1600#image",
          "https://drive.google.com/thumbnail?id=17VGEDYhfZh7FtjveivJ2fo2aleEOh26s&sz=w1600#image",
          "https://drive.google.com/thumbnail?id=1c0-tHAs0wqzvkj-d1OkutYU9OG-zot5j&sz=w1600#image",
          "https://drive.google.com/thumbnail?id=1gEbLBx6NJpVI2DF4m0dI6nn4FX47SAq3&sz=w1600#image",
          "https://drive.google.com/thumbnail?id=1oqomgOTfwlPTFn0exM3TTItAFF-a1xbi&sz=w1600#image",
          "https://drive.google.com/thumbnail?id=1EMMDNaPpprvKI0BsZs4bBxm-pvKKQtiu&sz=w1600#image"
        ],
        reportUrl: "https://drive.google.com/file/d/1AWBJs4XvGkUiEFGJieSWM8milptVdicH/view?usp=sharing",
        sheetsUrl: "https://drive.google.com/file/d/1t0PizcvO4hwx5g5Uye9kqVQv4B9mGvtR/view?usp=sharing",
        videoUrl: "https://www.youtube.com/watch?v=BOTCKXvGRNY"
      }
    },
    {
      id: "ARCH_07",
      title: "Bamboo Pavilion",
      role: "Fabrication Lead",
      hook: "Exploring parametric joinery in organic materials.",
      description: "A lightweight, modular pavilion constructed entirely from bamboo. Focuses on sustainable joinery and rapid on-site assembly.",
      icon: <Hammer className="w-6 h-6 text-gray-400" />,
      color: "gray-400",
      metric: "Sustainable",
      gifUrl: "https://lh3.googleusercontent.com/d/1h89DNz0NAtQeH_rtLlNxXqN0ZI_9FXuk",
      tags: ["Bamboo", "Parametric Design", "Hands-on"],
      category: "Fabrication",
      details: {
        overview: "The Bamboo Pavilion was an experimental structure that merged traditional bamboo construction with computational design logic.",
        challenge: "Bamboo is a non-standard material with varying diameters and strengths, making precise joinery difficult for a complex grid shell.",
        solution: "We developed a parametric joint system that could accommodate variations in bamboo culm size. The entire structure was prefabricated in modules and assembled on-site in less than 48 hours.",
        images: [
          "https://lh3.googleusercontent.com/d/1Bmav4R81p33aN0dg1aKeX6VBJ9aGkeVY#image",
          "https://lh3.googleusercontent.com/d/1EodFSHDesqz-0X1meS0jtxiG0LEnCoSL#image",
          "https://lh3.googleusercontent.com/d/1D3I9CqpZmVTto_OYqQD2YWHZhzF-KeXO#image",
          "https://drive.google.com/thumbnail?id=1NBbn76DHD2EhFslwUl9ePKT-e5dLQGg2&sz=w1600#image",
          "https://drive.google.com/thumbnail?id=1DNk35mYcu532xHIBGXCkzYuJNmTeypSl&sz=w1600#image",
          "https://drive.google.com/thumbnail?id=1142oZ-CPY8KvshZShnowDzb3M_weMLuA&sz=w1600#image",
          "https://lh3.googleusercontent.com/d/1UJHea_8A_tBCrKK8W0L9PFHvMtC57euo#video",
          "https://lh3.googleusercontent.com/d/1CTH0xsGyd1tFl__3V7rZDWXjmv7qmJVY#video",
          "https://lh3.googleusercontent.com/d/14V_8GGVsARfhPVS8es_QddTrvQBCxifw#video",
          "https://lh3.googleusercontent.com/d/1PJ5Fki5jFwaJOIjAmFjBmaXKXW3iXtsp#video",
          "https://lh3.googleusercontent.com/d/1jgjEnmP-41gyoudomhwtHAgpY9v36V5m#video",
          "https://lh3.googleusercontent.com/d/1w_oKE_o4wsF2vz-R4VoCb8yIWcZDEQst#video",
          "https://lh3.googleusercontent.com/d/12OIBjZ9IUXwNKrr47oZms-cRkXu8bH0G#video",
          "https://lh3.googleusercontent.com/d/17bRW4JZ7LvQ6JgA0VvGYBhm4oUe-k256#video",
          "https://lh3.googleusercontent.com/d/1a08B1mG9J6AyX_5kN00pree_QeFeMHo6#video",
          "https://lh3.googleusercontent.com/d/1A01VUrxvpTiarTeOCzGPfs_ew0TXZNX#video",
          "https://lh3.googleusercontent.com/d/1h89DNz0NAtQeH_rtLlNxXqN0ZI_9FXuk#video"
        ]
      }
    },
    {
      id: "ARCH_09",
      title: "Aura One office - Academic",
      role: "Lead Student Architect",
      hook: "High-performance ecological commercial tower with a self-shading double skin.",
      description: "An academic exploration of highly responsive commercial centers in Mangaluru. Integrated advanced Ladybug environmental analysis within Grasshopper to configure a self-shading double-skin facade that filters glare and daylight factors automatically.",
      icon: <Layers className="w-6 h-6 text-gray-400" />,
      color: "gray-400",
      metric: "Academic Core",
      gifUrl: "https://lh3.googleusercontent.com/d/1-13UZk0cblRjpTkrX_fwUGymHhEtcTYW",
      tags: ["Grasshopper", "Ladybug Analysis", "Double-Skin Facade", "Commercial Architecture", "Academic"],
      category: "Exterior",
      workflow: {
        screenshotUrl: "https://lh3.googleusercontent.com/d/1hG1dISPuq8c91Xk-BLArl32al89adqXa",
        steps: [
          "Formulate structural grids and flexible zoning parameters for grade-A office layouts.",
          "Write Grasshopper scripts to link solar path nodes directly with glass deflection metrics.",
          "Simulate annual Daylight Glare Probability (DGP) using Ladybug/Honeybee plugins.",
          "Draft highly-detailed structural connections for double-skin cavity framing."
        ]
      },
      details: {
        overview: "Aura One is a premium commercial concept designed around occupant wellness and self-sustaining micro-climates. The project challenges typical standard office designs by carving out internal multi-story green pocket gardens.",
        challenge: "Designing a high-glass facade that preserves uniform interior daylight while preventing localized glare discomfort and heavy cooling peak loads.",
        solution: "Developed an intelligent, responsive double skin facade. By dynamically optimizing individual glass louvers using Grasshopper routines, we successfully kept annual interior daylight factors above 3.5% across 90% of the desk area, while reducing overall cooling peak loads by 24%.",
        images: [
          "https://lh3.googleusercontent.com/d/1J8LFl6eA-Y2cUSSrwCO1Gqom_ABPS9yL",
          "https://lh3.googleusercontent.com/d/1_PI1qIU5K80hSqPvxvmVok-Je7HtJ0BK",
          "https://lh3.googleusercontent.com/d/1qe771x3P1_-J9rPqr6EKyKIO8Sn10h_U",
          "https://lh3.googleusercontent.com/d/1zqzgQq6FCJ9REyhh3JqsZN9-gaBD6tIp",
          "https://lh3.googleusercontent.com/d/1_t21ROExAPN-LgzrucRXE4X7Kej7M213",
          "https://lh3.googleusercontent.com/d/19fTGQagul-Bh_0TclKU-BOSVlaTtgTfw",
          "https://lh3.googleusercontent.com/d/1581Brz6nZrc053tWYmMUtbHiu-UUJa2n",
          "https://lh3.googleusercontent.com/d/1mwr6jAV-xBsp8xb0HmL2vX4Z1_4egzcp",
          "https://lh3.googleusercontent.com/d/1kqP--ijCQry4owJqse1-e2Xbse6Pbs24",
          "https://lh3.googleusercontent.com/d/1hG1dISPuq8c91Xk-BLArl32al89adqXa",
          "https://lh3.googleusercontent.com/d/1fEyhMZY41Wuyc4_9yPdsWdQC4R07lfHe#video",
          "https://lh3.googleusercontent.com/d/1R8NTkmalwYDmrUqX43hW-8un9nkDYD6G",
          "https://lh3.googleusercontent.com/d/1M5E67OFU8072ZB8nEW93bxNv4H2n7AKP",
          "https://lh3.googleusercontent.com/d/1gE8L7uXdB4AdOLcaOlPSp67XqDR3Y-CE",
          "https://lh3.googleusercontent.com/d/1idP_OHCVF7PUxrscYPqms53g3COkbyQM",
          "https://lh3.googleusercontent.com/d/1VYpZ0k2exBkERJotymz3BkTsPfKneVwe",
          "https://lh3.googleusercontent.com/d/1a1yxLTXN2c_h8cikVHPFW_4B8tqREk9d",
          "https://lh3.googleusercontent.com/d/1aSDa36ogz5AIxmFFNso7mKOnHOjlED8U",
          "https://lh3.googleusercontent.com/d/1s4YrypXR0ECMfMbqkYBbK6BJCh0hcevg",
          "https://lh3.googleusercontent.com/d/1JrQCaLKYu6gz-jx97bkCBN9IT66Iqz7t",
          "https://lh3.googleusercontent.com/d/1w4xMU7JuhLuiDK87oJ6wRgdjWrClJaRg",
          "https://lh3.googleusercontent.com/d/1GKGxoVfMSALH9uVTptNtIMokcmbNBzQu",
          "https://lh3.googleusercontent.com/d/1TBeTL0ZMJSw8pJHZPyKCABrVBFtksAVp",
          "https://lh3.googleusercontent.com/d/1KZczMWj_PuuDu75q6pksqJePr41OHGtz",
          "https://lh3.googleusercontent.com/d/1uGbrj_Lno6yqSiJrI-jtnIJL2kPkzvDc"
        ]
      }
    },
    {
      id: "ARCH_04",
      title: "The Caffeine Lab",
      role: "Interior Designer",
      hook: "A sensory experience defined by materiality and light.",
      description: "Contemporary cafe interior focusing on the tactile experience of materials. Uses raw concrete, warm wood, and strategic lighting.",
      icon: <Cpu className="w-6 h-6 text-gray-400" />,
      color: "gray-400",
      metric: "Atmospheric",
      gifUrl: "https://lh3.googleusercontent.com/d/1Ub86NTdcIwZLE58Cy0Ev5Zy1hYTF--ne",
      tags: ["Interior Design", "Materiality", "Lighting Design"],
      category: "Interior",
      details: {
        overview: "The Caffeine Lab is a boutique coffee house designed to be a sanctuary for urban dwellers. The project emphasizes the 'third space' concept—a place between home and work where community and creativity thrive.",
        challenge: "The primary challenge was to transform a narrow, deep commercial space with limited natural light into a vibrant and inviting environment without feeling claustrophobic.",
        solution: "We utilized a 'light-well' strategy, using reflective surfaces and a central skylight to pull light deep into the plan. A palette of raw, honest materials—exposed brick, reclaimed timber, and brushed brass—was used to create a layered, tactile experience.",
        images: [
          "https://lh3.googleusercontent.com/d/18Rc73l485-6jt6jQ-mz3lmv8lhe_uX3G",
          "https://lh3.googleusercontent.com/d/1wJxO8h7b4A6IzYVI8EEb5jJXyeIZgucl",
          "https://lh3.googleusercontent.com/d/1E-dMneOtLIUghE4uBpNibLrO6X3VYWfE",
          "https://lh3.googleusercontent.com/d/1Ub86NTdcIwZLE58Cy0Ev5Zy1hYTF--ne",
          "https://lh3.googleusercontent.com/d/10y2165C4vd8zanDADmq0-G2_QGnSjcQV",
          "https://lh3.googleusercontent.com/d/1wfnsQ87DBOiZwghYvPcCcq7GGzmu5Itr",
          "https://lh3.googleusercontent.com/d/1Iw_O4cMCPSFnQERK25agt88qj8jySHcb",
          "https://lh3.googleusercontent.com/d/1tmAzBTbdJ5bV7EK-kZcv7fJXfjfxqZy5",
          "https://lh3.googleusercontent.com/d/1EDB2yaMs74pxZ15dvY3DSqRv0ZcabRxU",
          "https://lh3.googleusercontent.com/d/1rTdEEaAGJgyhweJcCYPDhf-VH3UzPJbu"
        ]
      }
    }
  ];

  const bimArsenal: ArsenalItem[] = [
    {
      id: "BIM_01",
      title: "The LLM Fabrication Engine",
      role: "Computational Design Technologist",
      hook: "Generative AI API integration with physical CNC digital fabrication.",
      description: "Engineered a live API bridge between LLM logic (Gemini) and physical CNC manufacturing. The script dynamically generates optimal façade panelization constraints via JSON parsing, applies them to complex NURBS surfaces, and automatically unrolls the geometry into 2D cut-sheets for direct laser-cutter fabrication.",
      icon: <Cpu className="w-6 h-6 text-neon-cyan" />,
      color: "neon-cyan",
      metric: "Generative API",
      gifUrl: "https://lh3.googleusercontent.com/d/11sFI5d1bszNSdrgzSsTwC6NF1POaMzv1",
      tags: ["Python API", "Grasshopper", "Digital Fabrication", "JSON"],
      workflow: {
        screenshotUrl: "https://picsum.photos/seed/workflow-llm/800/450?grayscale",
        steps: [
          "Connect Grasshopper environment to Gemini API.",
          "Parse spatial panelization constraints from JSON return structure.",
          "Map geometric constraints to complex NURBS surfaces dynamically.",
          "Automate flat unrolling into production-ready 2D cut-sheets."
        ]
      },
      details: {
        overview: "The LLM Fabrication Engine establishes a direct link between modern large language model (LLM) APIs and precise physical fabrication pipelines. It translates descriptive, multi-modal prompts into standard geometric configurations without requiring manual CAD parameter manipulation.",
        challenge: "Generating deterministic, CNC-ready flat sheet templates from conversational, non-deterministic language models.",
        solution: "Implemented an integrated Grasshopper & Python routine that structures Gemini's responses into verified JSON schemas, drives spatial panelling calculations, and outputs high-fidelity structural outputs.",
        images: [
          "https://lh3.googleusercontent.com/d/12OMyHxHu87uIA87fmB3QJI-tMzHIi-yP",
          "https://lh3.googleusercontent.com/d/1OcgT2rCg6SVvVPYAgdgDyYfOwD2FybaL",
          "https://lh3.googleusercontent.com/d/1IUveGylPhmxyzS9J_zx8uIraB55FaoF2",
          "https://lh3.googleusercontent.com/d/1dyxHja4d3dCKcpRFqSjX2eCH8K4ETuqW",
          "https://lh3.googleusercontent.com/d/13DjBQVbIlicd12rixmddFV8VlEfY8nHy",
          "https://lh3.googleusercontent.com/d/16ElVn3XPrb32whEeHODV-F-qKOKaHDKG",
          "https://lh3.googleusercontent.com/d/1qVkvKXWhYvBXgHevFDyVhxJJ4YUvt28t"
        ],
        videoUrl: "https://drive.google.com/file/d/1fDtI938u2nmjRT0IjXtdQlvTGsM5LdAS/view?usp=sharing"
      }
    },
    {
      id: "BIM_02",
      title: "The Generative Documentation Engine",
      role: "BIM Automation Lead",
      hook: "Bypassing Revit UI limitations to automate large-scale sheet generation.",
      description: "A script that reads an Excel matrix and auto-generates hundreds of named, numbered sheets in Revit instantly. I proved I can eliminate manual drafting hours for an entire firm.",
      icon: <Code2 className="w-6 h-6 text-neon-cyan" />,
      color: "neon-cyan",
      metric: "Firm-Wide Scale",
      content: <CodeSnippet />,
      gifUrl: "https://lh3.googleusercontent.com/d/1m17edUmGzmk5KxO9aepinIVhFUjyCMjU",
      tags: ["Revit API", "Dynamo", "Python"],
      workflow: {
        screenshotUrl: "https://picsum.photos/seed/workflow-1/800/450?grayscale",
        steps: [
          "Batch select viewports and sheet templates.",
          "Execute auto-alignment and scaling logic.",
          "Synchronize metadata across all documentation sets.",
          "Generate PDF/DWG exports with automated naming."
        ]
      },
      details: {
        overview: "Automated large-scale sheet generation by reading Excel matrices directly into Revit, completely bypassing standard API limit bottlenecks.",
        challenge: "Generating hundreds of sheets manually can take days and is highly prone to numbering and naming errors.",
        solution: "Engineered a robust Dynamo and Python-based scripting suite that automates view alignment, template creation, and batch scaling from Excel data.",
        videoUrl: "https://drive.google.com/file/d/1qFTWKJWqE4zKuuKalI5X7WSVZlWd4bUl/view?usp=sharing"
      }
    },
    {
      id: "BIM_03",
      title: "The 5D Data Harvester",
      role: "VDC Data Engineer",
      hook: "Scrubbing massive Revit models to extract exact facility parameters.",
      description: "A workflow that scrubs massive Revit models to extract exact facility parameters (furniture, doors, MEP) and writes clean, formatted Bill of Quantities (BOQ) data to Excel. I proved I handle construction data, not just pretty pictures.",
      icon: <Database className="w-6 h-6 text-neon-orange" />,
      color: "neon-orange",
      metric: "100% Accuracy",
      content: <DataTable />,
      gifUrl: "https://lh3.googleusercontent.com/d/1o1McRNTDM1fwtEzORfJEz21-9udMX1CN",
      tags: ["Dynamo", "Excel"],
      workflow: {
        screenshotUrl: "https://picsum.photos/seed/workflow-2/800/450?grayscale",
        steps: [
          "Scan Revit database for non-compliant parameters.",
          "Apply regex-based scrubbing logic.",
          "Cross-reference with project financial spreadsheets.",
          "Export verified 5D data to Enterprise ERP."
        ]
      },
      details: {
        overview: "A specialized data extraction and scrubbing workflow built to harvest exact facility parameters from complex Revit models.",
        challenge: "Extracting precise quantities, material volumes, and facility parameters from large models usually yields fragmented and inconsistent data.",
        solution: "Engineered customized Dynamo and Python databases to cross-reference scheduling templates and output formatted, reliable Bill of Quantities data directly to financial spreadsheets.",
        videoUrl: "https://drive.google.com/file/d/1AiHanx4MA9nFEWaQotQpyHroxkHZcOuo/view?usp=sharing"
      }
    },
    {
      id: "BIM_04",
      title: "The Clash Matrix Pipeline",
      role: "BIM Coordinator",
      hook: "Streamlining multidisciplinary model coordination.",
      description: "A federated model hard-clash test. I rigged a structural model against an MEP plumbing model and captured the exact Red/Green intersections. I proved I can lead digital coordination and mitigate multi-million-dollar on-site errors.",
      icon: <Activity className="w-6 h-6 text-neon-cyan" />,
      color: "neon-cyan",
      metric: "Zero Errors",
      gifUrl: "https://lh3.googleusercontent.com/d/1G_5-CuXFQuIf9mft1d6CauX29EmntKOE",
      tags: ["Navisworks Manage", "Revit NWC Exporter"],
      workflow: {
        screenshotUrl: "https://picsum.photos/seed/workflow-4/800/450?grayscale",
        steps: [
          "Run hard clash tests between Structural and MEP federated models.",
          "Automate clash grouping by system and priority.",
          "Apply visual overrides for rapid identification.",
          "Generate coordination reports for site teams."
        ]
      },
      details: {
        overview: "Streamlining multidisciplinary model coordination through automated clash detection and resolution.",
        challenge: "Managing thousands of clashes across complex structural and MEP systems without manual oversight.",
        solution: "Implemented a federated model coordination pipeline in Navisworks that automated clash grouping and prioritized critical intersections for site teams.",
        reportUrl: "https://drive.google.com/file/d/1LetvlyhbGmUM-43bKoJR2OVGJQCNutWJ/view?usp=sharing",
        videoUrl: "https://drive.google.com/file/d/18k015r2LpCsmPb_POW3cQBtCoSXsIQ27/view?usp=sharing"
      }
    },
    {
      id: "BIM_05",
      title: "The MEP Component Automator",
      role: "VDC Engineer",
      hook: "Automated placement and configuration of MEP systems.",
      description: "An algorithmic workflow developed to automate the generation, placement, and parameter synchronization of MEP components within a BIM model.",
      icon: <Cpu className="w-6 h-6 text-neon-orange" />,
      color: "neon-orange",
      metric: "Automation",
      gifUrl: "https://lh3.googleusercontent.com/d/1dR5ajQdvGdR3YJOvScsAu_uteRfCiuVt",
      tags: ["Vectorworks", "Marionette", "BIM Model"],
      workflow: {
        screenshotUrl: "https://picsum.photos/seed/workflow-5/800/450?grayscale",
        steps: [
          "Define mechanical system parameters and clearance requirements.",
          "Execute Marionette algorithms for component placement.",
          "Synchronize parameters across the BIM model for real-time coordination.",
          "Generate automated reports and system verification schedules."
        ]
      },
      details: {
        overview: "An algorithmic workflow to automate the placement, routing, and parameter synchronization of mechanical, electrical, and plumbing elements in complex projects.",
        challenge: "Manually sizing, routing, and parameterizing components across extensive networks leads to coordinate errors and massive delays.",
        solution: "Engineered customized Vectorworks Marionette algorithms to automatically layout and dynamically assign parameters, ensuring complete coordination and accurate specification schedules.",
        videoUrl: "https://drive.google.com/file/d/10JAIqWYDsFVJFuBhUsFo730E31IfPLFe/view?usp=sharing"
      }
    },
    {
      id: "BIM_06",
      title: "The 4D Matrix (TimeLiner)",
      role: "Simulation Lead",
      hook: "Visualizing construction sequences over time.",
      description: "I integrated project schedules with 3D models to simulate construction sequences, identifying logistical bottlenecks before they happen on site.",
      icon: <ShieldCheck className="w-6 h-6 text-neon-blue" />,
      color: "neon-blue",
      metric: "4D Simulation",
      gifUrl: "https://lh3.googleusercontent.com/d/1qpMsNkw8HaPhf97qubs7GEV1BkZKsydz",
      tags: ["Navisworks Manage", "TimeLiner"],
      workflow: {
        screenshotUrl: "https://picsum.photos/seed/workflow-6/800/450?grayscale",
        steps: [
          "Import construction schedule into Navisworks.",
          "Link 3D model elements to schedule tasks.",
          "Configure appearance profiles for installation states.",
          "Execute 4D simulation to identify sequence conflicts."
        ]
      },
      details: {
        overview: "A comprehensive 4D sequence simulation integrating detailed project schedules directly with federated 3D models.",
        challenge: "Visualizing complex timelines and finding sequence conflicts in multi-phase projects is incredibly difficult using flat charts.",
        solution: "Established dynamic linkage between schedule tasks and BIM parameters in Navisworks Manage, simulating the complete construction sequence over time and mitigating sequence conflicts.",
        videoUrl: "https://drive.google.com/file/d/1lEe6jypAKbT_Fe0CXXVDaV3yXgarNeeF/view?usp=sharing"
      }
    },
    {
      id: "BIM_07",
      title: "The Multi-Objective Eco-Parametric Solver",
      role: "Simulation Lead & Computational Designer",
      hook: "Single vs. Multi-Objective Generative Evolutionary Solvers: Galapagos vs. Wallacei",
      description: "A generative optimization study benchmarking Galapagos (Single-Objective Genetic Algorithm) against Wallacei (Multi-Objective Evolutionary Engine) linked with Ladybug environmental analytics. This workflow evaluates structural material mass and carbon-shading profiles simultaneously, allowing stakeholders to contrast simple single-fitness curves with multi-dimensional Pareto-front exploration.",
      icon: <ShieldCheck className="w-6 h-6 text-neon-blue" />,
      color: "neon-blue",
      metric: "Comparative",
      gifUrl: "https://lh3.googleusercontent.com/d/1PHbRg6P6mh3Hmmw3yBPfp98sg0ihzO7F",
      tags: ["Galapagos", "Wallacei", "Ladybug", "Grasshopper", "Multi-Objective", "Pareto Front"],
      workflow: {
        screenshotUrl: "https://lh3.googleusercontent.com/d/1PHbRg6P6mh3Hmmw3yBPfp98sg0ihzO7F",
        steps: [
          "Formulate parametric facade & louver dimensions inside Grasshopper combined with Ladybug climate engines.",
          "Configure a Galapagos evolutionary loop using a unified weighted fitness function for single-objective optimization.",
          "Deploy a Wallacei multi-objective solver to evaluate Pareto-front trade-offs between shading, expense, and total mass.",
          "Compile comparative data visualizations directly on-canvas to benchmark performance curves and outputs."
        ]
      },
      details: {
        overview: "A deep comparative benchmark study contrasting single-objective (Galapagos) vs. multi-objective (Wallacei) genetic engines. By aligning both algorithms with Ladybug's solar heat gain calculations, we evaluated their geometric output, convergence velocity, and practical constructability across key building elevations.",
        challenge: "Single-objective algorithms like Galapagos require merging disparate criteria (such as material volume and heat deflection) into a single, artificial 'weighted score' function. This tends to hide critical spatial trade-offs and risks local minima trap-states. In contrast, multi-objective engines require advanced selection frameworks but natively present non-dominated solution sets.",
        solution: "Established a parallel comparative solver layout within Grasshopper. While Galapagos achieved rapid convergence toward a singular high-mass grid layout, Wallacei generated a multi-dimensional Pareto-front cloud. This provided stakeholders with 30+ optimized facade options which achieved a further 18% structural weight reduction while maintaining exceptional year-round shading.",
        videoUrl: "https://drive.google.com/file/d/11LHU93AbOVeVjjDI3RJB2zJmSvMmB77B/view?usp=sharing",
        comparisonTable: {
          headers: ["Optimized Parameters", "Galapagos (Single-Objective)", "Wallacei (Multi-Objective)"],
          rows: [
            ["Optimization Target", "Single weighted index (Shading x 0.7 - Mass x 0.3)", "Multi-Criteria Pareto Front (Shading, Mass, Cost independently)"],
            ["Average Search Gen Time", "7-12 Generations (Fast convergence but prone to local minima)", "40-60 Generations (Explaining multi-dimensional trade space)"],
            ["Structural Volume Impact", "Sub-optimal mass; compromized envelope structures to meet single scores", "Optimized mass (18% reduction) aligned with actual structural loads"],
            ["Decision Flexibility", "Static selection: single 'winner' geometry output", "Interactive Pareto-optimal cloud (30+ elegant design options)"],
            ["Stakeholder Insight", "Limited design variation; difficult to explain specific trade-offs", "Rich interactive parallel coordinate plots and cluster analysis charts"]
          ]
        },
        images: [
          "https://lh3.googleusercontent.com/d/1PHbRg6P6mh3Hmmw3yBPfp98sg0ihzO7F#render",
          "https://lh3.googleusercontent.com/d/1Unv_W8F89oCT5V_PIsoMMmy3ltvCoyoN#render",
          "https://lh3.googleusercontent.com/d/1ySj-S4Cu5uqlWjv6UhVHQXj67Q9Cp7zI#drawing",
          "https://lh3.googleusercontent.com/d/1sPPimcIWeztPLW6ClSUCM3XRLvQ_ZEY_#drawing",
          "https://lh3.googleusercontent.com/d/1UuKn3FCJ0VMBINEO5lnmmAnt66mHlG5H#drawing"
        ]
      }
    },
    {
      id: "BIM_09",
      title: "Rhino-to-Revit API Interoperability Pipeline",
      role: "Workflow Automation & Computational Research",
      hook: "AI-driven topology serialization & real-time BIM compilation.",
      description: "Addressing the critical loss of data integrity when translating segmented geometries from Rhino/Grasshopper to Autodesk Revit via an AI-driven serialization bridge parsing pure topological data.",
      icon: <Cpu className="w-6 h-6 text-neon-orange" />,
      color: "neon-orange",
      metric: "45s Compile",
      gifUrl: "https://lh3.googleusercontent.com/d/1gApYb78g5bpNXO0OLes5ymrUk9mEV1i8",
      tags: ["Grasshopper 3D", "Revit API", "Raven AI", "JSON", "Python"],
      workflow: {
        screenshotUrl: "https://lh3.googleusercontent.com/d/1gApYb78g5bpNXO0OLes5ymrUk9mEV1i8",
        steps: [
          "The Geometry Engine (Grasshopper): Generated a complex, 5,000-piece Biomimetic Space Frame using a Voronoi algorithm.",
          "Topological Extraction: Extracted pure mathematical and topological data from the algorithm, cleanly separating the system into 4,500 struts (Lines) and 1,200 joints (Points).",
          "The Serialization Bridge (Raven AI): Packaged this clean topological data into a lightweight JSON payload, bypassing traditional, heavy file exports.",
          "The Revit API Listener: Fired the JSON package directly into the Revit API via a custom listener script, instantly reading the node matrix and mapping the data to native elements."
        ]
      },
      details: {
        overview: "The project addresses a critical bottleneck in the AEC industry: the loss of data integrity and parametric intelligence when translating complex, highly segmented geometry from Rhino/Grasshopper into native BIM environments like Autodesk Revit.",
        challenge: "Rather than exporting 'dead' meshes or manually remodeling complex elements, this project uses an AI-driven serialization bridge to parse pure topological data.",
        solution: "Translating abstract geometric structures into fully parametric, native Revit components in under a minute.",
        images: [
          "https://lh3.googleusercontent.com/d/1ySj-S4Cu5uqlWjv6UhVHQXj67Q9Cp7zI",
          "https://lh3.googleusercontent.com/d/1sPPimcIWeztPLW6ClSUCM3XRLvQ_ZEY_",
          "https://lh3.googleusercontent.com/d/1UuKn3FCJ0VMBINEO5lnmmAnt66mHlG5H",
          "https://lh3.googleusercontent.com/d/1IEq87jiytcp-kmovxKTB06Mx0MgIeej2",
          "https://lh3.googleusercontent.com/d/19NIG86AOjoITlBvUJ6MauwYXAbpCf3Hs",
          "https://lh3.googleusercontent.com/d/17hced_pgHNJQoYY1fGrdpY1btoQyBIMO",
          "https://lh3.googleusercontent.com/d/1RQGFTa_pYMWC32QYx1uTJdFHZajkzgld",
          "https://lh3.googleusercontent.com/d/1BbpHEAEukpRAOjkjetrVYiH74h2f5p6x",
          "https://lh3.googleusercontent.com/d/1fE6fOeTeXnLfYv_FcF-V42KX3MYVH0Zq",
          "https://lh3.googleusercontent.com/d/1KwFfnUiN1-mXyk2aLf3IuscjpmUzHY2k",
          "https://lh3.googleusercontent.com/d/1bAsk7xTDzf3u3tUyAPMfvibnHxuCc8mV",
          "https://lh3.googleusercontent.com/d/1dNSoBn_mPFNXdPjBtReXrptMrMCyaNT7",
          "https://lh3.googleusercontent.com/d/16LSgJrKuY8L6ckAAv2D4MDEKfhT9PgE6",
          "https://lh3.googleusercontent.com/d/10kH71GxRRO92OOBFbNj3k2SA9fhePPfx"
        ],
        comparisonTable: {
          headers: ["Metric", "Traditional Workflow", "Automated API Pipeline"],
          rows: [
            ["Translation Time", "~3 Weeks (Manual modeling/clunky mesh cleanup)", "45 Seconds"],
            ["Geometry Quality", "'Dead' static meshes, loss of metadata", "100% Native BIM Elements"],
            ["Downstream Utility", "Poor; requires manual scheduling and reconstruction", "Automated CNC Cut-List & Ready"]
          ]
        }
      }
    }
  ];

  const arsenal = isArch ? archArsenal : bimArsenal;

  const GlitchText = ({ text }: { text: string }) => {
    if (isArch) return <>{text}</>;
    return (
      <span className="relative inline-block overflow-hidden">
        <motion.span
          initial={{ x: 0 }}
          animate={{ x: [-1, 1, -1, 0], opacity: [1, 0.8, 1] }}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 5 + 2 }}
          className="relative z-10"
        >
          {text}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0], x: [-2, 2, -2] }}
          transition={{ duration: 0.1, repeat: Infinity, repeatDelay: Math.random() * 5 + 2 }}
          className="absolute inset-0 z-0 text-neon-cyan/30 translate-x-[1px]"
        >
          {text}
        </motion.span>
      </span>
    );
  };

  const experience: ExperienceData[] = [
    {
      year: "Dec 2025 - Present",
      company: "IMK Architects",
      role: "Architectural Intern",
      description: "Assisting with large-scale design coordination and modeling pipelines. Writing custom scripts to automate repetitive drawing and data entry tasks."
    },
    {
      year: "Jan 2025 - Present",
      company: "Self-Employed",
      role: "3D Visualizer",
      description: "Modeling and rendering detailed, photorealistic 3D spaces for client projects using Twinmotion and D5."
    },
    {
      year: "July 2025 - Sept 2025",
      company: "E.D.P Consultants",
      role: "Architectural Intern",
      description: "Created construction drawing sets, layouts, and high-quality 3D renders for residential client presentations."
    },
    {
      year: "Sept 2024 - May 2025",
      company: "Anvaya",
      role: "Simulation Lead",
      description: "Managed energy-efficiency simulations and environmental studies for housing designs."
    },
    {
      year: "Dec 2021 - March 2026",
      company: "BMS College of Architecture",
      role: "Bachelor of Architecture (B.Arch)",
      description: "Studying modern architectural systems and automated modeling workflows."
    }
  ];

  const handleSectionChange = (index: number) => {
    if (index >= 0 && index < visibleSections.length) {
      const sectionId = visibleSections[index];
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      visibleSections.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(i);
          // Sync modes based on active scroll section
          if (id === "vdc-section") {
            setMode('bim');
          } else if (id === "arch-section") {
            setMode('arch');
          }
        }
      });

      // Track if vdc-apps is active (within viewport)
      const appsEl = document.getElementById("vdc-apps");
      const vdcSecEl = document.getElementById("vdc-section");
      if (appsEl && vdcSecEl) {
        const appsAbsoluteTop = vdcSecEl.offsetTop + appsEl.offsetTop;
        const archSecEl = document.getElementById("arch-section");
        const appsAbsoluteBottom = archSecEl ? archSecEl.offsetTop : appsAbsoluteTop + appsEl.offsetHeight;
        
        if (scrollPosition >= appsAbsoluteTop && scrollPosition < appsAbsoluteBottom) {
          setIsAppsActive(true);
        } else {
          setIsAppsActive(false);
        }
      } else {
        setIsAppsActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Simulate initial system check for BIM mode feel
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const loadingVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { duration: 0.8, ease: "circOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const isModalArch = selectedArsenalItem ? (selectedArsenalItem.id.startsWith("ARCH") || selectedArsenalItem.category === "Fabrication") : false;
  const isHeaderArch = isArch;

  return (
    <div className={`min-h-screen w-full transition-colors duration-700 ${isArch ? "bg-white text-gray-900 font-serif" : "bg-terminal-bg text-gray-300 font-sans"} relative overflow-x-hidden`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            variants={loadingVariants}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-terminal-bg"
          >
            <div className="w-12 h-12 relative mb-6">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-neon-cyan/20 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-1 border-2 border-neon-orange/40 rounded-full border-t-transparent"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Box className="w-4 h-4 text-neon-cyan" />
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="font-mono text-[10px] text-neon-cyan tracking-[0.4em] uppercase"
            >
              System_Initializing...
            </motion.div>
            <div className="absolute bottom-12 w-48 h-[1px] bg-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AmbientBackground isArch={isArch} />
      
      {/* Header / Nav */}
      <header className={`fixed top-0 w-full z-[60] backdrop-blur-md border-b px-4 md:px-6 py-3 md:py-3.5 flex justify-between items-center transition-all duration-700 ${isHeaderArch ? "bg-white/80 border-gray-100/80" : "bg-terminal-bg/80 border-terminal-border"}`}>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <Terminal className={`w-4 h-4 md:w-5 md:h-5 ${isHeaderArch ? "text-gray-400" : "text-neon-cyan"}`} />
            <span className={`font-mono font-semibold tracking-tighter text-xs md:text-sm transition-colors duration-700 ${isHeaderArch ? "text-black" : "text-white"}`}>KARTHIKRAJ_NADAR</span>
          </div>
          
          {/* Snap-thru Jumping Portal instead of a raw state-switch */}
          <button 
            onClick={() => {
              const el = document.getElementById(isHeaderArch ? "vdc-section" : "arch-section");
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[8px] md:text-[9px] font-mono uppercase tracking-widest transition-all duration-500 ${
              isHeaderArch 
              ? "bg-black text-white border-black hover:bg-gray-800" 
              : "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30 hover:bg-neon-cyan/25"
            }`}
          >
            {isHeaderArch ? <Terminal className="w-2.5 h-2.5 animate-pulse" /> : <Box className="w-2.5 h-2.5" />}
            <span className="hidden sm:inline">Portal to </span>{isHeaderArch ? "VDC_CORE" : "ARCH_STUDIO"}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className={`hidden md:flex gap-6 font-mono text-[10px] md:text-xs uppercase tracking-widest transition-colors duration-700 ${isHeaderArch ? "text-gray-600" : "text-gray-500"}`}>
          {menuItems.map((item) => {
            const isActive = item.id === "vdc-apps"
              ? isAppsActive
              : item.id === "vdc-section"
              ? (activeSection === 1 && !isAppsActive)
              : (activeSection === item.index);
            return (
              <button 
                key={item.id}
                onClick={() => {
                  if (item.isSection) {
                    handleSectionChange(item.index!);
                  } else {
                    const el = document.getElementById(item.elementId);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`hover:text-neon-cyan transition-colors ${isActive ? (isHeaderArch ? "text-black font-semibold" : "text-neon-cyan") : ""}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 transition-colors ${isHeaderArch ? "text-black hover:bg-gray-100" : "text-neon-cyan hover:bg-white/5"}`}
        >
          {isMenuOpen ? <Box className="w-5 h-5 rotate-45" /> : <Layers className="w-5 h-5" />}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              className={`fixed inset-0 z-[70] flex flex-col items-center justify-center gap-8 font-mono text-lg uppercase tracking-[0.3em] transition-colors duration-700 ${
                isHeaderArch ? "bg-white text-black" : "bg-terminal-bg text-neon-cyan"
              }`}
            >
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 p-2"
              >
                <Box className="w-8 h-8 rotate-45" />
              </button>
              {menuItems.map((item) => {
                const isActive = item.id === "vdc-apps"
                  ? isAppsActive
                  : item.id === "vdc-section"
                  ? (activeSection === 1 && !isAppsActive)
                  : (activeSection === item.index);
                return (
                  <button 
                    key={item.id}
                    onClick={() => {
                      if (item.isSection) {
                        handleSectionChange(item.index!);
                      } else {
                        const el = document.getElementById(item.elementId);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                      setIsMenuOpen(false);
                    }}
                    className={`hover:scale-110 transition-transform ${isActive ? "font-bold underline underline-offset-8" : ""}`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="text-[10px] opacity-40">Jump Location</div>
                <button 
                  onClick={() => {
                    const el = document.getElementById(isHeaderArch ? "vdc-section" : "arch-section");
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className={`px-6 py-3 border font-mono text-xs uppercase tracking-widest transition-all duration-500 ${
                    isHeaderArch 
                    ? "bg-black text-white border-black" 
                    : "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30"
                  }`}
                >
                  {isHeaderArch ? "PORTAL TO VDC_CORE" : "PORTAL TO ARCH_STUDIO"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Progress Indicator */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-4 items-center">
        {/* Scroll Progress Bar */}
        <div className={`absolute -right-4 top-0 bottom-0 w-1 transition-colors duration-700 rounded-full ${isHeaderArch ? "bg-gray-100" : "bg-terminal-border/40"}`}>
          <motion.div 
            style={{ scaleY: useScroll().scrollYProgress }}
            className={`absolute top-0 left-0 w-full origin-top transition-colors duration-700 rounded-full ${isHeaderArch ? "bg-black" : "bg-neon-cyan shadow-[0_0_15px_rgba(0,242,255,0.6)]"}`}
          />
        </div>

        <button 
          onClick={() => handleSectionChange(activeSection - 1)}
          disabled={activeSection === 0}
          className={`p-2 border transition-colors ${
            isHeaderArch 
            ? "border-gray-200 hover:bg-black hover:text-white" 
            : "brutalist-border hover:bg-neon-cyan hover:text-black"
          } disabled:opacity-20`}
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <div className="flex flex-col gap-2 relative">
          {visibleSections.map((_, i) => (
            <button 
              key={i}
              onClick={() => handleSectionChange(i)}
              className={`w-1 h-8 rounded-full transition-all duration-500 z-10 ${
                activeSection === i 
                ? (isHeaderArch ? "bg-black h-12" : "bg-neon-cyan h-12 shadow-[0_0_10px_rgba(0,255,255,0.8)]") 
                : (isHeaderArch ? "bg-gray-100" : "bg-terminal-border")
              }`}
            />
          ))}
        </div>
        <button 
          onClick={() => handleSectionChange(activeSection + 1)}
          disabled={activeSection === visibleSections.length - 1}
          className={`p-2 border transition-colors ${
            isHeaderArch 
            ? "border-gray-200 hover:bg-black hover:text-white" 
            : "brutalist-border hover:bg-neon-cyan hover:text-black"
          } disabled:opacity-20`}
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <main className="relative z-10">
        {/* STAGE 1: Vertical Split landing Gateway */}
        <section id="landing" className="min-h-screen md:h-screen w-full relative flex flex-col md:flex-row bg-[#080b0e] overflow-y-auto md:overflow-hidden">
          {/* VDC Side (Left) */}
          <div 
            onMouseEnter={() => setHoveredSide('left')}
            onMouseLeave={() => setHoveredSide(null)}
            className={`flex-1 md:h-full transition-all duration-700 ease-out relative flex flex-col justify-center items-center p-4 sm:p-6 md:p-12 border-b md:border-b-0 md:border-r border-terminal-border/20 ${
              hoveredSide === 'left' ? 'md:w-[54%] bg-[#06080a]' : hoveredSide === 'right' ? 'md:w-[46%] opacity-40 bg-black' : 'md:w-[50%] bg-[#0c0f12]'
            }`}
          >
            {/* Fine Tech Grid Background */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
              <div className="w-full h-full grid grid-cols-12 grid-[auto-rows_minmax(0,1fr)]">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-neon-cyan" />
                ))}
              </div>
            </div>
            
            {/* Left Header Overlay */}
            <div className="absolute top-4 left-4 font-mono text-[8px] text-neon-cyan/30 tracking-[0.2em] hidden md:block">
              SECURE_LINK::ACTIVE_PORT_3000
            </div>

            {/* Left Gateway Content */}
            <div className="z-10 text-center flex flex-col justify-center items-center max-w-sm md:max-w-md">
              <motion.div 
                animate={{ scale: hoveredSide === 'left' ? 1.05 : 1 }}
                className="w-10 h-10 md:w-12 md:h-12 rounded border border-neon-cyan/40 bg-black/50 flex items-center justify-center mb-4 md:mb-6 shadow-[0_0_15px_rgba(0,255,255,0.15)]"
              >
                <Terminal className="w-5 h-5 md:w-6 md:h-6 text-neon-cyan" />
              </motion.div>
              
              <span className="font-mono text-[8px] md:text-[9px] tracking-[0.3em] text-neon-cyan uppercase mb-1.5 md:mb-2 bg-neon-cyan/5 px-2 py-0.5 md:px-2.5 md:py-1 border border-neon-cyan/10">
                SYSTEMS_CORE_LINK
              </span>
              
              <h2 className="font-mono font-bold text-lg sm:text-xl md:text-[2.25rem] text-white tracking-widest leading-[1.1] mb-3 md:mb-4 uppercase">
                VDC &amp; SYSTEMS<br />
                <span className="text-neon-cyan">ARCHITECTURE</span>
              </h2>
              
              <p className="font-mono text-[10px] sm:text-xs md:text-[11px] text-gray-400 mb-6 md:mb-8 max-w-xs leading-relaxed">
                Platform-level workflow automations, BIM data scripting, and ISO 19650 protocols to drive complex deliveries.
              </p>

              {/* Action Button */}
              <button
                onClick={() => {
                  const el = document.getElementById("vdc-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 md:px-6 md:py-3 font-mono text-[10px] md:text-xs uppercase tracking-widest border border-neon-cyan bg-black text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
              >
                Access VDC_Core
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 font-mono text-[8px] text-gray-500">
              [VDC_PORTFOLIO_LINK]
            </div>
          </div>

          {/* Architecture Side (Right) */}
          <div 
            onMouseEnter={() => setHoveredSide('right')}
            onMouseLeave={() => setHoveredSide(null)}
            className={`flex-1 md:h-full transition-all duration-700 ease-out relative flex flex-col justify-center items-center p-4 sm:p-6 md:p-12 ${
              hoveredSide === 'right' ? 'md:w-[54%] bg-white' : hoveredSide === 'left' ? 'md:w-[46%] opacity-40 bg-gray-50' : 'md:w-[50%] bg-gray-50'
            }`}
          >
            {/* Fine Museum Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="w-full h-full grid grid-cols-[repeat(24,1fr)] grid-[auto-rows_minmax(0,1fr)]">
                {Array.from({ length: 576 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-black" />
                ))}
              </div>
            </div>

            {/* Right Header Overlay */}
            <div className="absolute top-4 right-4 font-serif italic text-[10px] text-gray-400 tracking-[0.1em] hidden md:block">
              Studio Arch // Vol I
            </div>

            {/* Right Gateway Content */}
            <div className="z-10 text-center flex flex-col justify-center items-center max-w-sm md:max-w-md font-serif">
              <motion.div 
                animate={{ scale: hoveredSide === 'right' ? 1.05 : 1 }}
                className="w-10 h-10 md:w-12 md:h-12 rounded border border-black/10 bg-white flex items-center justify-center mb-4 md:mb-6 shadow-sm"
              >
                <Box className="w-5 h-5 md:w-6 md:h-6 text-black" />
              </motion.div>
              
              <span className="italic text-[10px] md:text-xs tracking-widest text-gray-400 mb-1.5 md:mb-2 font-serif font-light">
                STUDIO_ARCH_v1.0
              </span>
              
              <h2 className="italic font-medium text-lg sm:text-xl md:text-[2.25rem] text-black tracking-tight leading-[1.1] mb-3 md:mb-4 uppercase">
                ARCHITECTURAL<br />
                <span className="font-sans font-light tracking-[0.2em] text-gray-500">DESIGN</span>
              </h2>
              
              <p className="font-sans font-light text-[10px] sm:text-xs text-gray-500 mb-6 md:mb-8 max-w-xs leading-relaxed">
                Designing elegant, functional buildings with a focus on sustainable materials and comfortable layouts.
              </p>

              {/* Action Button */}
              <button
                onClick={() => {
                  const el = document.getElementById("arch-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 md:px-6 md:py-3 font-sans font-medium text-[10px] md:text-xs uppercase tracking-widest border border-black bg-black text-white hover:bg-white hover:text-black transition-all duration-300 hover:shadow-lg"
              >
                Enter Arch_Studio
              </button>
            </div>
            
            <div className="absolute bottom-4 right-4 font-sans text-[8px] text-gray-400 uppercase tracking-widest">
              [ARCHITECTURAL_WORKS]
            </div>
          </div>
        </section>

        {/* STAGE 2: VDC & Systems Architecture Continuous Section */}
        <section id="vdc-section" className="bg-[#0c0f12] text-gray-300 font-sans w-full py-20 px-6 md:px-12 relative">
          <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
            
            {/* VDC Sub Hero Header Grid */}
            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="flex flex-col text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-[8px] md:text-[10px] font-mono uppercase tracking-widest mb-4 w-fit whitespace-nowrap">
                  <Activity className="w-3 h-3 shrink-0" /> <span className="pr-1 font-mono">System Online: Data Engineering</span>
                </div>
                
                <div className="mb-2 font-mono text-[10px] md:text-sm uppercase tracking-widest text-neon-cyan">
                  KARTHIKRAJ V NADAR // COMPUTATIONAL DESIGNER &amp; VDC ENGINEER
                </div>
                
                <h1 className="text-2xl md:text-5xl font-mono tracking-tighter leading-[1.1] mb-4 text-white uppercase font-bold">
                  Automating <span className="text-neon-cyan animate-pulse">AEC workflows</span> and managing <span className="text-neon-orange">ISO 19650</span> facility data.
                </h1>
                
                <p className="text-xs md:text-sm font-mono mb-6 max-w-xl text-gray-400">
                  Building automated workflows to expedite projects. Using reliable data models to ensure simple and scalable delivery.
                </p>
                
                <div className="mt-4">
                  <div className="font-mono text-[9px] text-neon-cyan/40 mb-2 tracking-[0.2em] uppercase">
                    [STACK_COMPONENTS]
                  </div>
                  <SoftwareStack isArch={false} />
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      const el = document.getElementById("vdc-workflows");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group px-6 py-3 font-mono font-semibold uppercase tracking-tighter flex items-center justify-center gap-3 transition-all duration-300 bg-neon-cyan text-black hover:bg-white"
                  >
                    Initialize Workflows
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a 
                    href="https://drive.google.com/file/d/1vU9ymieO9uISVZSdGznHRbVlwQ3fUpOU/view?usp=sharing" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-6 py-3 font-mono font-semibold uppercase tracking-tighter flex items-center justify-center gap-3 transition-all duration-300 bg-transparent text-neon-cyan hover:bg-neon-cyan/10 border border-neon-cyan hover:shadow-[0_0_20px_rgba(0,242,255,0.2)]"
                  >
                    <Download className="w-5 h-5" />
                    Download Resume
                  </a>
                </div>
              </div>

              {/* Hero Image Component for VDC */}
              <div className="relative aspect-video lg:aspect-square border border-terminal-border/40 bg-black overflow-hidden min-h-[350px] md:min-h-[450px] mx-auto w-full max-w-xl lg:max-w-none">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="w-full h-full grid grid-cols-12 grid-rows-12">
                    {Array.from({ length: 144 }).map((_, i) => (
                      <div key={i} className="border-[0.5px] border-neon-cyan/20" />
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-neon-cyan/20 text-right leading-tight z-0">
                  BIM_DATA_STREAM_8829<br/>
                  COORD_SYS: WGS84<br/>
                  LOD: 400
                </div>
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-neon-cyan/20 shadow-[0_0_15px_rgba(0,242,255,0.3)] animate-scan z-20 pointer-events-none" />
                
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full group">
                    <img 
                      src="https://lh3.googleusercontent.com/d/1Unv_W8F89oCT5V_PIsoMMmy3ltvCoyoN" 
                      alt="BIM Hero GIF"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-100 transition-all duration-1000 pointer-events-none select-none animate-fadeIn"
                    />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 font-mono text-[10px] text-neon-cyan/60 z-30">
                  [CORE_VD_v2.4_ENGINE]
                </div>
              </div>
            </div>

            {/* VDC WORKFLOWS / PORTFOLIO */}
            <div id="vdc-workflows" className="pt-16 border-t border-terminal-border/15 scroll-mt-24">
              <div className="mb-12">
                <h2 className="text-xs font-mono uppercase tracking-[0.3em] mb-3 text-neon-cyan">
                  Section_01 // Automation_Stack
                </h2>
                <h3 className="text-lg md:text-xl font-mono uppercase tracking-[0.1em] text-neon-cyan/80 font-bold">
                  <span className="opacity-40">{"["}</span> ACTIVE_WORKFLOWS <span className="opacity-40">{"]"}</span>
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {bimArsenal.map((item) => (
                <ProjectCard 
                  key={item.id} 
                  item={item} 
                  isArch={false} 
                  onClick={() => setSelectedArsenalItem(item)} 
                  onShowScript={(scriptUrl: string, title: string) => {
                    setExpandedMedia({
                      src: scriptUrl,
                      isVideo: false,
                      googleDriveId: getDriveId(scriptUrl),
                      alt: `Script: ${title}`
                    });
                  }}
                  onShowVideo={(gifUrl: string, title: string) => {
                    setExpandedMedia({
                      src: gifUrl,
                      isVideo: true,
                      googleDriveId: getDriveId(gifUrl),
                      alt: `Video: ${title}`
                    });
                  }}
                />
              ))}
            </div>
          </div>

          {/* VDC WEB APPS / TOOLS */}
          <div id="vdc-apps" className="pt-16 border-t border-terminal-border/15 scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-xs font-mono uppercase tracking-[0.3em] mb-3 text-neon-orange">
                Section_02 // Custom_Web_Applications_&_Web_Tools
              </h2>
              <h3 className="text-lg md:text-xl font-mono uppercase tracking-[0.1em] text-neon-orange/80 font-bold">
                <span className="opacity-40">{"["}</span> APPS_&_WEB_TOOLS <span className="opacity-40">{"]"}</span>
              </h3>
            </div>

            <AECWebAppsCabinet />
          </div>

          {/* VDC CAREER HISTORY */}
          <div className="pt-16 border-t border-terminal-border/15">
            <div className="mb-12 text-center">
              <h2 className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] mb-3 text-neon-blue">
                Section_03 // Professional_Journey
              </h2>
              <h3 className="text-lg md:text-xl font-mono uppercase tracking-[0.1em] text-neon-blue font-bold">
                <span className="opacity-40">{"{"}</span> EXPERIENCE_LOG_03 <span className="opacity-40">{"}"}</span>
              </h3>
            </div>

            <div ref={vdcTimelineRef} className="max-w-3xl mx-auto relative px-4 md:px-0">
              {/* Background Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-terminal-border/20" />
              {/* Glowing Interactive Scroll Line */}
              <motion.div 
                style={{ scaleY: vdcScaleY }} 
                className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-neon-cyan via-neon-blue to-neon-orange origin-top shadow-[0_0_10px_#00f2ff,0_0_20px_#00f2ff]" 
              />
              <div className="space-y-8 md:space-y-12 font-mono">
                {experience.map((exp, idx) => (
                  <div 
                    key={idx} 
                    className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-[6px] mt-1.5 border bg-black border-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)] z-10" />
                    <div className={`pl-10 md:pl-0 md:w-1/2 ${idx % 2 === 0 ? "md:pl-12" : "md:pr-12 text-left md:text-right"}`}>
                      <span className="text-[10px] md:text-xs font-mono mb-1 block text-neon-orange">
                        {exp.year}
                      </span>
                      <h4 className="text-base md:text-lg font-mono font-medium mb-1 text-white">
                        {exp.company}
                      </h4>
                      <div className="text-[10px] md:text-xs font-mono mb-2 md:mb-3 text-neon-blue">
                        {exp.role}
                      </div>
                      <p className="text-xs md:text-sm leading-relaxed text-gray-400 font-mono">
                        {exp.description}
                      </p>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STAGE 3: Massive Transition Gate Banner */}
        <div id="transition-banner" className="w-full min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#0c0f12] via-[#0d1013] to-white border-b border-gray-100 py-16 px-6">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="w-full h-full grid grid-cols-12 grid-rows-12">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-black" />
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center z-10 max-w-2xl w-full px-6 py-10 md:py-12 bg-[#0c0f12]/80 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
          >
            <div className="inline-block font-mono text-[9px] md:text-xs text-center text-neon-orange tracking-[0.4em] uppercase mb-5 font-bold border border-neon-orange/25 bg-neon-orange/5 px-3.5 py-1 rounded-full">
              --- MULTI-DISCIPLINARY COUPLING ---
            </div>
            
            <h2 className="text-3xl md:text-5xl font-medium text-white uppercase tracking-wider mb-5 leading-tight font-serif italic">
              ARCHITECTURAL DESIGN &amp; <br />
              <span className="font-sans font-light text-neon-cyan tracking-widest block mt-2 text-2xl md:text-4xl not-italic">PROJECT EXECUTION</span>
            </h2>
            
            <p className="text-xs md:text-sm font-mono text-gray-300 max-w-lg mx-auto leading-relaxed">
              Where computation meets physical space. Connecting the power of automated drawings with sensible, real-world building design.
            </p>
            
            <div className="mt-8 flex justify-center gap-2 items-center font-sans animate-bounce">
              <div className="w-8 h-[1px] bg-white/20" />
              <span className="text-[9px] font-mono tracking-widest text-[#00f2ff] font-bold">SCROLL DOWN TO STUDY</span>
              <div className="w-8 h-[1px] bg-white/20" />
            </div>
          </motion.div>
        </div>

        {/* STAGE 4: Architectural Design Studio Continuous Section */}
        <section id="arch-section" className="bg-white text-gray-900 font-serif w-full py-20 px-6 md:px-12 border-b border-gray-100 relative">
          <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
            
            {/* Arch Sub-Hero Header Grid */}
            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center font-serif">
              <div className="flex flex-col text-left font-serif">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-500 text-[8px] md:text-[10px] font-mono uppercase tracking-widest mb-4 w-fit whitespace-nowrap">
                  <Activity className="w-3 h-3 shrink-0 animate-pulse" /> <span className="pr-1 font-mono">Portfolio: Architectural Design</span>
                </div>
                
                <div className="mb-2 font-mono text-[10px] md:text-sm uppercase tracking-widest text-gray-400">
                  Karthikraj V Nadar, Architect &amp; Spatial Visionary.
                </div>
                
                <h1 className="text-2xl md:text-5xl font-serif font-light tracking-tighter leading-[1.1] mb-4 text-black italic">
                  Sculpting <span className="text-gray-400 font-normal">Space</span>, Light, and the Human <span className="text-gray-300 font-normal">Experience</span>.
                </h1>
                
                <p className="text-xs md:text-sm font-sans mb-6 max-w-xl text-gray-500 leading-relaxed">
                  Designing layouts and buildings that put comfort and eco-friendly standards first. Creating spaces with a focus on natural light and structural simplicity.
                </p>
                
                <div className="mt-4">
                  <div className="font-mono text-[9px] text-gray-400 mb-2 tracking-[0.2em] uppercase font-bold">
                    [DESIGN_COMPLIANCE]
                  </div>
                  <SoftwareStack isArch={true} />
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4 font-sans">
                  <button 
                    onClick={() => {
                      const el = document.getElementById("arch-works");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group px-6 py-3 font-semibold uppercase tracking-tighter flex items-center justify-center gap-3 transition-all duration-300 bg-black text-white hover:bg-gray-800"
                  >
                    Explore Works
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a 
                    href="https://drive.google.com/file/d/1vU9ymieO9uISVZSdGznHRbVlwQ3fUpOU/view?usp=sharing" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-6 py-3 font-semibold uppercase tracking-tighter flex items-center justify-center gap-3 transition-all duration-300 bg-white text-black hover:bg-black hover:text-white border border-black hover:shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    Download Resume
                  </a>
                </div>
              </div>

              {/* Hero Image Component for Arch */}
              <div className="relative aspect-video lg:aspect-square border border-gray-100 bg-gray-50 overflow-hidden min-h-[350px] md:min-h-[450px] mx-auto w-full max-w-xl lg:max-w-none">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <div className="w-full h-full grid grid-cols-12 grid-rows-12">
                    {Array.from({ length: 144 }).map((_, i) => (
                      <div key={i} className="border-[0.5px] border-black" />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/10 z-20 pointer-events-none" />
                
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden group/hero">
                  <img 
                    src="https://lh3.googleusercontent.com/d/13GmqWLU2dj4391dNM13FuLjcie7fDsKe" 
                    alt="Arch Hero GIF"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-100 transition-all duration-1000 pointer-events-none select-none animate-fadeIn"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/hero:bg-black/10 transition-all duration-300 flex items-end justify-end p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedMedia({
                          src: "https://lh3.googleusercontent.com/d/13L6_w4Eu0yGSNAaxq0zbR9dTiAjc95Df",
                          isVideo: false,
                          googleDriveId: getDriveId("https://lh3.googleusercontent.com/d/13L6_w4Eu0yGSNAaxq0zbR9dTiAjc95Df"),
                          alt: "Architectural Studio Grasshopper Script"
                        });
                      }}
                      className="px-4 py-2 bg-black text-white hover:bg-[#00f2ff] hover:text-black border border-white/20 hover:border-[#00f2ff] text-[10px] font-mono tracking-widest uppercase flex items-center gap-2 shadow-2xl transition-all duration-300 z-30 transform active:scale-95 pointer-events-auto cursor-pointer"
                    >
                      <Code2 className="w-4 h-4 animate-pulse" />
                      Show Script
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 font-mono text-[10px] text-gray-500 z-30 font-bold">
                  [ARCH_STUDIO_v1.0]
                </div>
              </div>
            </div>

            {/* ARCH PROJECTS */}
            <div id="arch-works" className="pt-16 border-t border-gray-100 scroll-mt-24">
              <div className="mb-12">
                <h2 className="text-xs font-mono uppercase tracking-[0.3em] mb-4 text-gray-800 font-bold">
                  Section_01 // Projects
                </h2>
                <h3 className="text-lg md:text-xl font-mono uppercase tracking-[0.1em] text-black font-bold">
                  <span className="opacity-40 font-serif">{"{"}</span> CORE_FOLIO_V1.0 <span className="opacity-40 font-serif">{"}"}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {archArsenal.filter(item => item.category !== 'Fabrication').map((item) => (
                  <ProjectCard 
                    key={item.id} 
                    item={item} 
                    isArch={true} 
                    onClick={() => setSelectedArsenalItem(item)} 
                    onShowScript={(scriptUrl: string, title: string) => {
                      setExpandedMedia({
                        src: scriptUrl,
                        isVideo: false,
                        googleDriveId: getDriveId(scriptUrl),
                        alt: `Script: ${title}`
                      });
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ARCH FABRICATION */}
            <div className="pt-16 border-t border-gray-100 font-serif">
              <div className="mb-12 font-serif">
                <h2 className="text-xs font-mono uppercase tracking-[0.3em] mb-4 text-gray-800 font-bold">
                  Section_02 // Fabrication &amp; Hands-on
                </h2>
                <h3 className="text-lg md:text-xl font-mono uppercase tracking-[0.1em] text-black italic font-bold">
                  <span className="opacity-40">{"<"}</span> PHYSICAL_PROTOTYPING <span className="opacity-40">{">"}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 font-sans">
                {archArsenal.filter(item => item.category === 'Fabrication').map((item) => (
                  <ProjectCard 
                    key={item.id} 
                    item={item} 
                    isArch={true} 
                    onClick={() => setSelectedArsenalItem(item)} 
                    onShowScript={(scriptUrl: string, title: string) => {
                      setExpandedMedia({
                        src: scriptUrl,
                        isVideo: false,
                        googleDriveId: getDriveId(scriptUrl),
                        alt: `Script: ${title}`
                      });
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ARCH CAREER PATH */}
            <div className="pt-16 border-t border-gray-100 font-serif">
              <div className="mb-12 text-center font-mono font-bold">
                <h2 className="text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 text-gray-800 font-bold">
                  Section_03 // Professional_Journey
                </h2>
                <h3 className="text-lg md:text-xl uppercase tracking-[0.1em] text-black italic font-serif font-bold">
                  <span className="opacity-40">{"{"}</span> EXPERIENCE_LOG_03 <span className="opacity-40">{"}"}</span>
                </h3>
              </div>

              <div ref={archTimelineRef} className="max-w-3xl mx-auto relative px-4 md:px-0 font-serif">
                {/* Background Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gray-100" />
                {/* Glowing Interactive Scroll Line */}
                <motion.div 
                  style={{ scaleY: archScaleY }} 
                  className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-black origin-top shadow-[0_0_10px_rgba(0,0,0,0.25)]" 
                />
                <div className="space-y-8 md:space-y-12">
                  {experience.map((exp, idx) => (
                    <div 
                      key={idx} 
                      className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                    >
                      <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-[6px] mt-1.5 border bg-white border-black z-10" />
                      <div className={`pl-10 md:pl-0 md:w-1/2 ${idx % 2 === 0 ? "md:pl-12" : "md:pr-12 text-left md:text-right"}`}>
                        <span className="text-[10px] md:text-xs font-mono mb-1 block text-gray-400 font-bold">
                          {exp.year}
                        </span>
                        <h4 className="text-base md:text-lg font-medium mb-1 text-black italic">
                          {exp.company}
                        </h4>
                        <div className="text-[10px] md:text-xs font-mono mb-2 md:mb-3 text-gray-500 font-sans">
                          {exp.role}
                        </div>
                        <p className="text-xs md:text-sm leading-relaxed text-gray-500 italic">
                          {exp.description}
                        </p>
                      </div>
                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        <ParallaxSection id="terminal" index={visibleSections.indexOf('terminal')} setActiveSection={setActiveSection}>
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="w-full"
          >
            <div className={`border p-4 md:p-6 font-mono text-xs relative overflow-hidden transition-all duration-700 ${
              isArch 
              ? "border-gray-100 bg-white" 
              : "brutalist-border bg-terminal-bg"
            }`}>
              <div className={`flex items-center gap-2 mb-4 md:mb-6 border-b pb-4 transition-colors duration-700 ${isArch ? "border-gray-100" : "border-terminal-border"}`}>
                <div className={`w-2 h-2 rounded-full ${isArch ? "bg-gray-200" : "bg-red-500/50"}`} />
                <div className={`w-2 h-2 rounded-full ${isArch ? "bg-gray-200" : "bg-yellow-500/50"}`} />
                <div className={`w-2 h-2 rounded-full ${isArch ? "bg-gray-200" : "bg-green-500/50"}`} />
                <span className="ml-2 text-gray-500 text-[8px] md:text-[10px]">{isArch ? "about_me_session" : "vdc_terminal_session"}</span>
              </div>
              
              <div className="space-y-4 overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                  <span className={isArch ? "text-black font-bold" : "text-neon-cyan"}>{isArch ? "arch@studio:~$ " : "guest@vdc_core:~$"}</span>
                  <span className={isArch ? "text-gray-400" : "text-white"}>whoami</span>
                </div>
                <div className="text-gray-400 italic text-[10px] md:text-xs">
                  {isArch 
                    ? "Karthikraj V Nadar. Architectural Intern. AEC Workflow Automation." 
                    : "BIM/VDC & ISO 19650. Computational Design. Dynamo • Python."}
                </div>
                
                <div className="flex gap-2 min-w-max">
                  <span className={isArch ? "text-black font-bold" : "text-neon-cyan"}>{isArch ? "arch@studio:~$ " : "guest@vdc_core:~$"}</span>
                  <span className={isArch ? "text-gray-400" : "text-white"}>cat ./certifications/iso19650.txt</span>
                </div>
                <div className={`p-3 md:p-4 border border-dashed transition-colors duration-700 ${isArch ? "border-gray-100 bg-gray-50/50" : "border-neon-cyan/30 bg-neon-cyan/5"}`}>
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded border flex items-center justify-center shrink-0 ${isArch ? "border-gray-200 bg-white" : "border-neon-cyan/50 bg-black"}`}>
                      <img 
                        src="https://lh3.googleusercontent.com/d/1szL-O1_LuUqLzzsL3lJqB2JzX4K39dnt" 
                        alt="Badge" 
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        className="w-6 h-6 md:w-8 md:h-8 object-contain pointer-events-none select-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className={`text-[10px] md:text-xs ${isArch ? "text-black font-bold" : "text-neon-cyan"}`}>ISO 19650 EXPERT - LEVEL 3</div>
                      <div className="text-[8px] md:text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Information Manager Certification</div>
                      <div className="text-[8px] md:text-[10px] text-gray-400 mt-2 leading-relaxed">
                        Verified expertise in global digital delivery standards, Common Data Environments (CDE), and information management protocols for large-scale infrastructure.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 min-w-max">
                  <span className={isArch ? "text-black font-bold" : "text-neon-cyan"}>{isArch ? "arch@studio:~$ " : "guest@vdc_core:~$"}</span>
                  <span className={isArch ? "text-gray-400" : "text-white"}>ls ./contact</span>
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-6">
                  <a href="mailto:karthikraj.v.nadar@gmail.com" className={`flex items-center gap-2 hover:underline transition-colors duration-700 text-[10px] md:text-xs ${isArch ? "text-black" : "text-neon-cyan"}`}>
                    <Mail className="w-3 h-3" /> karthikraj.v.nadar@gmail.com
                  </a>
                  <div className={`flex items-center gap-2 transition-colors duration-700 text-[10px] md:text-xs ${isArch ? "text-black" : "text-neon-cyan"}`}>
                    <Phone className="w-3 h-3" /> 8779228622
                  </div>
                  <a href="https://www.linkedin.com/in/karthikraj-nadar-07083526a" className={`flex items-center gap-2 hover:underline transition-colors duration-700 text-[10px] md:text-xs ${isArch ? "text-black" : "text-neon-cyan"}`}>
                    <Linkedin className="w-3 h-3" /> linkedin.com/in/karthikraj-nadar-07083526a
                  </a>
                </div>

                <div className="flex gap-2 mt-4 min-w-max">
                  <span className={isArch ? "text-black font-bold" : "text-neon-cyan"}>{isArch ? "arch@studio:~$ " : "guest@vdc_core:~$"}</span>
                  <span className={isArch ? "text-gray-400" : "text-white"}>cat ./skills</span>
                </div>
                <div className="text-gray-400 text-[9px] md:text-[10px] space-y-1">
                  <div>• BIM: Revit, Navisworks, Dynamo, Python</div>
                  <div>• Design: Rhino, Grasshopper, D5 Render, AI Imagery</div>
                  <div>• VDC: Clash Detection, ISO 19650, 5D Data Harvesting</div>
                </div>

                <div className="flex gap-2 mt-4 min-w-max">
                  <span className={isArch ? "text-black font-bold" : "text-neon-cyan"}>{isArch ? "arch@studio:~$ " : "guest@vdc_core:~$"}</span>
                  <span className={isArch ? "text-gray-400" : "text-white"}>ls ./languages</span>
                </div>
                <div className="text-gray-400 text-[9px] md:text-[10px] flex flex-wrap gap-x-4 gap-y-1">
                  <span>English [Full]</span>
                  <span>Hindi [Native]</span>
                  <span>Tamil [Native]</span>
                  <span>Marathi [Limited]</span>
                  <span>Kannada [Limited]</span>
                </div>

                <div className="flex gap-2 mt-4 min-w-max">
                  <span className={isArch ? "text-black font-bold" : "text-neon-cyan"}>{isArch ? "arch@studio:~$ " : "guest@vdc_core:~$"}</span>
                  <span className={isArch ? "text-gray-400" : "text-white"}>cat ./achievements</span>
                </div>
                <div className="text-gray-400 text-[9px] md:text-[10px] space-y-1">
                  <div>• Grand Winner | Solar Decathlon India (2024–2025)</div>
                  <div>• Citation | 66th Annual NASA Design Competition</div>
                  <div>• ISO 19650 Information Management Expert</div>
                  <div>• Net Zero Energy and Water Buildings Certified</div>
                </div>

                <div className="flex gap-2 mt-6 md:mt-8 min-w-max">
                  <span className={isArch ? "text-black font-bold" : "text-neon-cyan"}>{isArch ? "arch@studio:~$ " : "guest@vdc_core:~$"}</span>
                  <span className={isArch ? "text-gray-400" : "text-white"}>echo "Based in Mumbai. Available for corporate VDC roles starting May 2026."</span>
                </div>

                <div className="flex gap-2 mt-4 min-w-max">
                  <span className={isArch ? "text-black font-bold" : "text-neon-cyan"}>{isArch ? "arch@studio:~$ " : "guest@vdc_core:~$"}</span>
                  <span className={isArch ? "text-gray-400" : "text-white"}>./send_message.sh</span>
                </div>

                <div className={`mt-4 p-4 md:p-6 border transition-all duration-700 ${isArch ? "border-gray-100 bg-gray-50/30" : "border-neon-cyan/20 bg-black/40"}`}>
                  {isSent ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-8 text-center space-y-4"
                    >
                      <div className={`text-2xl ${isArch ? "text-black" : "text-neon-cyan"}`}>✓</div>
                      <div className={`font-mono text-xs uppercase tracking-widest ${isArch ? "text-black" : "text-white"}`}>
                        MESSAGE_TRANSMITTED_SUCCESSFULLY
                      </div>
                      <p className={`text-[10px] font-mono ${isArch ? "text-gray-400" : "text-gray-500"}`}>
                        ACKNOWLEDGMENT_ID: {Math.random().toString(16).substring(2, 10).toUpperCase()}
                      </p>
                    </motion.div>
                  ) : (
                    <form className="space-y-4" onSubmit={handleFormSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className={`text-[8px] md:text-[10px] uppercase tracking-widest ${isArch ? "text-gray-400" : "text-neon-cyan/50"}`}>Name</label>
                          <input 
                            type="text" 
                            required
                            value={formState.name}
                            onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="ENTER_NAME"
                            className={`w-full bg-transparent border-b p-2 outline-none transition-all duration-700 text-[10px] md:text-xs ${
                              isArch ? "border-gray-200 focus:border-black text-black" : "border-terminal-border focus:border-neon-cyan text-white"
                            }`}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className={`text-[8px] md:text-[10px] uppercase tracking-widest ${isArch ? "text-gray-400" : "text-neon-cyan/50"}`}>Email</label>
                          <input 
                            type="email" 
                            required
                            value={formState.email}
                            onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="ENTER_EMAIL"
                            className={`w-full bg-transparent border-b p-2 outline-none transition-all duration-700 text-[10px] md:text-xs ${
                              isArch ? "border-gray-200 focus:border-black text-black" : "border-terminal-border focus:border-neon-cyan text-white"
                            }`}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className={`text-[8px] md:text-[10px] uppercase tracking-widest ${isArch ? "text-gray-400" : "text-neon-cyan/50"}`}>Message</label>
                        <textarea 
                          rows={3}
                          required
                          value={formState.message}
                          onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="ENTER_MESSAGE_CONTENT"
                          className={`w-full bg-transparent border-b p-2 outline-none transition-all duration-700 text-[10px] md:text-xs resize-none ${
                            isArch ? "border-gray-200 focus:border-black text-black" : "border-terminal-border focus:border-neon-cyan text-white"
                          }`}
                        />
                      </div>
                      <button 
                        type="submit"
                        disabled={isSending}
                        className={`w-full py-3 border font-mono text-[10px] md:text-xs uppercase tracking-widest transition-all duration-700 flex items-center justify-center gap-2 ${
                          isSending ? "opacity-50 cursor-not-allowed" : ""
                        } ${
                          isArch 
                          ? "bg-black text-white hover:bg-gray-800" 
                          : "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30 hover:bg-neon-cyan hover:text-black"
                        }`}
                      >
                        {isSending ? (
                          <>
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-3 h-3 border-2 border-current border-t-transparent rounded-full"
                            />
                            TRANSMITTING...
                          </>
                        ) : "Transmit_Message"}
                      </button>
                      {formError && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[10px] font-mono text-red-500 uppercase tracking-widest text-center mt-2"
                        >
                          ERROR: {formError}
                        </motion.div>
                      )}
                    </form>
                  )}
                </div>

                <div className="flex gap-2 mt-6">
                  <span className={isArch ? "text-black font-bold" : "text-neon-cyan"}>{isArch ? "arch@studio:~$ " : "guest@vdc_core:~$"}</span>
                  <span className={`${isArch ? "text-black" : "text-white"} animate-pulse`}>_</span>
                </div>
              </div>
            </div>
            
            <footer className={`mt-12 md:mt-20 pt-8 border-t transition-colors duration-700 ${isArch ? "border-gray-100" : "border-terminal-border"}`}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
                <div className="flex flex-col items-center md:items-start gap-2">
                  <div className={isArch ? "text-black font-bold" : "text-white"}>© 2026 {isArch ? "KARTHIKRAJ NADAR ARCHITECTURE" : "VDC_CORE_ENGINEERING"}</div>
                  <div className="text-[8px] opacity-60">ALL RIGHTS RESERVED // MUMBAI, INDIA</div>
                </div>

                <div className="flex items-center gap-6">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isArch ? "hover:text-black" : "hover:text-neon-cyan"}`}>
                    <Github className="w-4 h-4" />
                  </a>
                  <a href="https://www.linkedin.com/in/karthikraj-nadar-07083526a" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isArch ? "hover:text-black" : "hover:text-neon-cyan"}`}>
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="mailto:karthikraj.v.nadar@gmail.com" className={`transition-colors ${isArch ? "hover:text-black" : "hover:text-neon-cyan"}`}>
                    <Mail className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex gap-4 md:gap-8 text-[8px] opacity-60">
                  <span>STATUS: {isArch ? "ACTIVE" : "OPTIMIZED"}</span>
                  <span>UPTIME: 99.99%</span>
                </div>
              </div>
            </footer>
          </motion.div>
        </ParallaxSection>
      </main>

      {/* Workflows Detail Modal */}
      <AnimatePresence>
        {selectedArsenalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`w-full max-w-7xl border overflow-hidden flex flex-col h-full md:max-h-[92vh] transition-all duration-700 ${
                isModalArch ? "bg-white border-gray-200 shadow-2xl" : "bg-terminal-bg border-terminal-border shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              }`}
            >
              {/* Modal Header */}
              <div className={`p-4 md:p-6 border-b flex justify-between items-center transition-all duration-700 ${isModalArch ? "bg-gray-50 border-gray-100" : "bg-black/50 border-terminal-border"}`}>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`p-2 rounded border transition-all duration-700 ${
                    isModalArch ? "bg-white border-gray-200 text-black" : `bg-${selectedArsenalItem.color}/10 border-${selectedArsenalItem.color}/20 text-${selectedArsenalItem.color}`
                  }`}>
                    {selectedArsenalItem.icon}
                  </div>
                  <div>
                    <h4 className={`text-sm md:text-xl font-semibold uppercase tracking-tighter transition-colors duration-700 ${isModalArch ? "text-black font-serif italic" : "text-white font-sans"}`}>
                      {selectedArsenalItem.title}
                    </h4>
                    <div className="text-[8px] md:text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                      {isArch ? "Workflow_Record_v1.0" : "VDC_Workflow_Data"} // {selectedArsenalItem.id}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedArsenalItem(null)}
                  className={`p-2 transition-colors border ${isArch ? "border-gray-200 hover:bg-black hover:text-white pointer-events-auto cursor-pointer" : "brutalist-border hover:bg-white hover:text-black pointer-events-auto cursor-pointer"}`}
                >
                  <Box className="w-4 h-4 md:w-5 md:h-5 rotate-45" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-grow overflow-y-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 md:gap-12">
                  {/* Left: Media & Workflow */}
                  <div className="space-y-8">
                    {selectedArsenalItem.id === "BIM_07" ? (
                      <div className="space-y-4">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[#00f3ff] flex items-center justify-between">
                          <span>01_Comparative_Process_Visualization</span>
                          <span className="text-[8px] text-gray-500">[Galapagos vs. Wallacei]</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Option A: Galapagos (Single-Objective) */}
                          <div className="space-y-2 group/pvizg">
                            <div className="flex justify-between items-center bg-black/45 p-2 border border-terminal-border/15 font-mono text-[9px] uppercase">
                              <span className="text-[#00f3ff] font-semibold">Option A: Galapagos</span>
                              <span className="text-gray-500">[Single-Objective]</span>
                            </div>
                            
                            <div className="w-full h-[220px] sm:h-[300px] md:h-[350px] border border-terminal-border/20 bg-[#020304] relative overflow-hidden flex items-center justify-center rounded transition-all duration-300">
                              <WorkloadGif 
                                src="https://lh3.googleusercontent.com/d/1PHbRg6P6mh3Hmmw3yBPfp98sg0ihzO7F" 
                                alt="Galapagos Loop"
                                isArch={false}
                                forcePlay={true}
                                isInModal={true}
                                className="w-full h-full object-contain p-1 pointer-events-none select-none opacity-90 transition-all duration-700"
                              />
                              
                              {/* Direct overlay blocking and status watermark */}
                              <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/85 backdrop-blur font-mono text-[7px] text-[#00f3ff] border border-terminal-border/25 select-none pointer-events-none">
                                GALAPAGOS_WEIGHTED_RUN: ACTIVE
                              </div>

                              {/* Transparent Absolute Overlay Shield preventing direct interactions */}
                              <div 
                                className="absolute inset-0 z-20 bg-transparent select-none pointer-events-auto" 
                                onContextMenu={(e) => e.preventDefault()}
                                onDragStart={(e) => e.preventDefault()}
                              />
                              
                              {/* Click to expand hover */}
                              <div 
                                onClick={() => {
                                  setExpandedMedia({
                                    src: "https://lh3.googleusercontent.com/d/1PHbRg6P6mh3Hmmw3yBPfp98sg0ihzO7F",
                                    isVideo: false,
                                    isGif: true,
                                    googleDriveId: getDriveId("https://lh3.googleusercontent.com/d/1PHbRg6P6mh3Hmmw3yBPfp98sg0ihzO7F"),
                                    alt: "Galapagos Single-Objective Evolutionary Study"
                                  });
                                }}
                                className="absolute inset-0 bg-black/40 opacity-0 group-hover/pvizg:opacity-100 flex items-center justify-center transition-all duration-300 cursor-zoom-in z-30 pointer-events-auto"
                              >
                                <div className="flex items-center gap-1.5 px-2 py-1 border border-[#00f3ff] bg-black/95 text-[#00f3ff] font-mono text-[8px] tracking-wider uppercase shadow-lg">
                                  <Maximize2 className="w-3 h-3" />
                                  Expand Galapagos
                                </div>
                              </div>
                            </div>
                            <p className="text-[10px] font-mono text-gray-400 leading-relaxed bg-[#020304] p-2 border border-terminal-border/10 rounded">
                              Calibrates a single weighted equation index. Galapagos achieves rapid local convergence but lacks the ability to explore independent Pareto-front trade-offs.
                            </p>
                          </div>

                          {/* Option B: Wallacei (Multi-Objective) */}
                          <div className="space-y-2 group/pvizw">
                            <div className="flex justify-between items-center bg-black/45 p-2 border border-terminal-border/15 font-mono text-[9px] uppercase">
                              <span className="text-[#00f3ff] font-semibold">Option B: Wallacei</span>
                              <span className="text-neon-cyan/80">[Multi-Objective]</span>
                            </div>
                            
                            <div className="w-full h-[220px] sm:h-[300px] md:h-[350px] border border-terminal-border/25 bg-[#020304] relative overflow-hidden flex items-center justify-center rounded transition-all duration-300">
                              <WorkloadGif 
                                src="https://lh3.googleusercontent.com/d/1Unv_W8F89oCT5V_PIsoMMmy3ltvCoyoN" 
                                alt="Wallacei Engine"
                                isArch={false}
                                forcePlay={true}
                                isInModal={true}
                                className="w-full h-full object-contain p-1 pointer-events-none select-none opacity-90 transition-all duration-700"
                              />
                              
                              {/* Direct overlay blocking and status watermark */}
                              <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/85 backdrop-blur font-mono text-[7px] text-neon-cyan border border-terminal-border/20 select-none pointer-events-none">
                                WALLACEI_PARETO_CLOUD: ACTIVE
                              </div>

                              {/* Transparent Absolute Overlay Shield preventing direct interactions */}
                              <div 
                                className="absolute inset-0 z-20 bg-transparent select-none pointer-events-auto" 
                                onContextMenu={(e) => e.preventDefault()}
                                onDragStart={(e) => e.preventDefault()}
                              />
                              
                              {/* Click to expand hover */}
                              <div 
                                onClick={() => {
                                  setExpandedMedia({
                                    src: "https://lh3.googleusercontent.com/d/1Unv_W8F89oCT5V_PIsoMMmy3ltvCoyoN",
                                    isVideo: false,
                                    isGif: true,
                                    googleDriveId: getDriveId("https://lh3.googleusercontent.com/d/1Unv_W8F89oCT5V_PIsoMMmy3ltvCoyoN"),
                                    alt: "Wallacei Multi-Objective Evolutionary Study"
                                  });
                                }}
                                className="absolute inset-0 bg-black/40 opacity-0 group-hover/pvizw:opacity-100 flex items-center justify-center transition-all duration-300 cursor-zoom-in z-30 pointer-events-auto"
                              >
                                <div className="flex items-center gap-1.5 px-2 py-1 border border-neon-cyan bg-black/95 text-neon-cyan font-mono text-[8px] tracking-wider uppercase shadow-lg">
                                  <Maximize2 className="w-3 h-3" />
                                  Expand Wallacei
                                </div>
                              </div>
                            </div>
                            <p className="text-[10px] font-mono text-gray-400 leading-relaxed bg-[#020304] p-2 border border-terminal-border/10 rounded">
                              Independently loops shading performance, structural mass, and cost factors, dynamically graphing a multi-dimensional Pareto non-dominated solution set.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-gray-400" : "text-neon-cyan"}`}>
                          01_{isArch ? "Visual_Narrative" : "Process_Visualization"}
                        </div>
                        <div className={`w-full h-[300px] sm:h-[420px] md:h-[520px] lg:h-[580px] xl:h-[640px] border relative overflow-hidden flex items-center group/pviz justify-center transition-all duration-700 ${isArch ? "border-gray-100 bg-[#f7f8f9]" : "brutalist-border bg-[#020304]"}`}>
                          <WorkloadGif 
                            src={selectedArsenalItem.gifUrl} 
                            alt="Workflow GIF"
                            isArch={isArch}
                            forcePlay={true}
                            isInModal={true}
                            className={`w-full h-full object-contain p-1 transition-all duration-700 pointer-events-none select-none ${isArch ? "opacity-100" : "opacity-95"}`}
                          />
                          {!isArch && (
                            <div className="absolute top-3 left-3 px-2 py-1 bg-black/55 backdrop-blur font-mono text-[8px] text-neon-cyan border border-neon-cyan/25">
                              RAW_FEED_STREAMING...
                            </div>
                          )}
                          {selectedArsenalItem.scriptUrl && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedMedia({
                                  src: selectedArsenalItem.scriptUrl!,
                                  isVideo: false,
                                  googleDriveId: getDriveId(selectedArsenalItem.scriptUrl!),
                                  alt: `Grasshopper Script - ${selectedArsenalItem.title}`
                                });
                              }}
                              className={`absolute bottom-3 left-3 px-3 py-1.5 text-[9px] font-mono tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 z-[30] pointer-events-auto shadow-md ${
                                isArch 
                                  ? "bg-white text-black hover:bg-black hover:text-white border border-gray-200" 
                                  : "bg-black/95 text-neon-cyan hover:bg-neon-cyan hover:text-black border border-neon-cyan/35"
                              }`}
                            >
                              <Code2 className="w-3.5 h-3.5 animate-pulse" />
                              Show Script
                            </button>
                          )}
                          {/* Hover overlay to expand */}
                          <div 
                            onClick={() => {
                              const isVid = selectedArsenalItem.gifUrl.includes("#video") || selectedArsenalItem.gifUrl.toLowerCase().endsWith(".mp4") || selectedArsenalItem.gifUrl.toLowerCase().endsWith(".mov") || selectedArsenalItem.gifUrl.includes("1h89DNz0NAtQeH_rtLlNxXqN0ZI_9FXuk");
                              const gdId = getDriveId(selectedArsenalItem.gifUrl);
                              setExpandedMedia({
                                src: selectedArsenalItem.gifUrl,
                                isVideo: isVid,
                                isGif: !isVid,
                                googleDriveId: gdId,
                                alt: "Process Visualization"
                              });
                            }}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover/pviz:opacity-100 flex items-center justify-center transition-all duration-300 cursor-zoom-in z-20 pointer-events-auto"
                          >
                            <div className={`flex items-center gap-2 px-3 py-1.5 border font-mono text-[10px] tracking-widest uppercase transition-all duration-500 transform scale-95 group-hover/pviz:scale-100 ${
                              isArch 
                                ? "border-black bg-white text-black font-bold shadow-lg" 
                                : "border-neon-cyan bg-black/90 text-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.25)]"
                            }`}>
                              <Maximize2 className="w-3.5 h-3.5" />
                              Expand View
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedArsenalItem.workflow && (
                      <div className="space-y-4 md:space-y-6">
                        <div className={`text-[10px] font-mono uppercase tracking-widest border-b pb-2 transition-colors duration-700 ${isArch ? "text-black border-gray-100" : "text-white border-terminal-border"}`}>
                          02_{isArch ? "Methodology" : "Execution_Logic"}
                        </div>
                        
                        {["ARCH_02", "ARCH_08"].includes(selectedArsenalItem.id) ? (
                          <div className={`space-y-4 p-4 md:p-5 rounded-lg ${
                            isArch 
                              ? "bg-gray-50/50 border border-gray-150" 
                              : "bg-[#04070a] border border-terminal-border/20"
                          }`}>
                            {selectedArsenalItem.workflow.steps.map((step, i) => (
                              <div key={i} className="flex gap-4 items-start">
                                <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded shrink-0 ${
                                  isArch 
                                    ? "bg-black text-white" 
                                    : "bg-terminal-border/10 text-neon-cyan border border-terminal-border/20"
                                }`}>
                                  0{i + 1}
                                </span>
                                <p className={`text-xs md:text-sm leading-relaxed ${
                                  isArch ? "text-gray-600" : "text-gray-300"
                                }`}>
                                  {step}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <WorkflowFlowchart 
                            projectId={selectedArsenalItem.id}
                            steps={selectedArsenalItem.workflow.steps}
                            isArch={isArch}
                            color={selectedArsenalItem.color}
                          />
                        )}
                      </div>
                    )}

                    {!isArch && selectedArsenalItem.content && (
                      <div className="space-y-4">
                        <div className={`text-[10px] font-mono uppercase tracking-widest border-b pb-2 transition-colors duration-700 ${isArch ? "text-black border-gray-100" : "text-white border-terminal-border"}`}>
                          03_System_Output
                        </div>
                        {selectedArsenalItem.content}
                      </div>
                    )}


                  </div>

                  {/* Right: Detailed Content */}
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black" : "text-neon-cyan"}`}>
                        04_Description
                      </div>
                      <p className={`text-sm leading-relaxed transition-colors duration-700 ${isArch ? "text-gray-500 italic" : "text-gray-400 font-mono"}`}>
                        {selectedArsenalItem.description}
                      </p>
                    </div>

                    {selectedArsenalItem.details && (
                      <>
                        <div className="space-y-4">
                          <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black" : "text-neon-cyan"}`}>
                            05_Project_Overview
                          </div>
                          <p className={`text-sm leading-relaxed transition-colors duration-700 ${isArch ? "text-gray-500 italic" : "text-gray-400 font-mono"}`}>
                            {selectedArsenalItem.details.overview}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black" : "text-neon-orange"}`}>
                            06_The_Challenge
                          </div>
                          <p className={`text-sm leading-relaxed transition-colors duration-700 ${isArch ? "text-gray-500 italic" : "text-gray-400 font-mono"}`}>
                            {selectedArsenalItem.details.challenge}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black" : "text-neon-cyan"}`}>
                            07_The_Solution
                          </div>
                          <p className={`text-sm leading-relaxed transition-colors duration-700 ${isArch ? "text-gray-500 italic" : "text-gray-400 font-mono"}`}>
                            {selectedArsenalItem.details.solution}
                          </p>
                        </div>

                        {((selectedArsenalItem.details && (selectedArsenalItem.details.reportUrl || selectedArsenalItem.details.sheetsUrl || selectedArsenalItem.details.videoUrl)) || selectedArsenalItem.scriptUrl) && (
                          <div className="space-y-4 pt-4">
                            <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black" : "text-neon-cyan"}`}>
                              08_Documentation
                            </div>
                            <div className="flex flex-wrap gap-4">
                              {selectedArsenalItem.details?.reportUrl && (
                                <a 
                                  href={selectedArsenalItem.details.reportUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-2 px-4 py-2 border text-[10px] font-mono uppercase tracking-widest transition-all duration-700 ${
                                    isArch 
                                    ? "border-black bg-black text-white hover:bg-white hover:text-black" 
                                    : "brutalist-border bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan hover:text-black"
                                  }`}
                                >
                                  <FileText className="w-3 h-3" />
                                  View Full Report
                                </a>
                              )}

                              {selectedArsenalItem.details?.sheetsUrl && (
                                <a 
                                  href={selectedArsenalItem.details.sheetsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-2 px-4 py-2 border text-[10px] font-mono uppercase tracking-widest transition-all duration-700 ${
                                    isArch 
                                    ? "border-black bg-white text-black hover:bg-black hover:text-white" 
                                    : "brutalist-border bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan hover:text-black"
                                  }`}
                                >
                                  <Layers className="w-3 h-3" />
                                  View Sheets
                                </a>
                              )}

                              {selectedArsenalItem.details?.videoUrl && (
                                <button 
                                  onClick={() => {
                                    setExpandedMedia({
                                      src: selectedArsenalItem.details!.videoUrl!,
                                      isVideo: true,
                                      googleDriveId: getDriveId(selectedArsenalItem.details!.videoUrl!),
                                      alt: "Full Presentation Movie"
                                    });
                                  }}
                                  className={`inline-flex items-center gap-2 px-4 py-2 border text-[10px] font-mono uppercase tracking-widest transition-all duration-700 pointer-events-auto cursor-pointer ${
                                    isArch 
                                    ? "border-black bg-white text-black hover:bg-black hover:text-white" 
                                    : "brutalist-border bg-neon-orange/10 text-neon-orange hover:bg-neon-orange hover:text-black"
                                  }`}
                                >
                                  <Play className="w-3 h-3 animate-pulse" />
                                  Watch Full Movie
                                </button>
                              )}

                              {selectedArsenalItem.scriptUrl && (
                                <button 
                                  onClick={() => {
                                    setExpandedMedia({
                                      src: selectedArsenalItem.scriptUrl!,
                                      isVideo: false,
                                      googleDriveId: getDriveId(selectedArsenalItem.scriptUrl!),
                                      alt: "Grasshopper Script"
                                    });
                                  }}
                                  className={`inline-flex items-center gap-2 px-4 py-2 border text-[10px] font-mono uppercase tracking-widest transition-all duration-700 pointer-events-auto cursor-pointer ${
                                    isArch 
                                    ? "border-black bg-black text-white hover:bg-white hover:text-black" 
                                    : "brutalist-border bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan hover:text-black"
                                  }`}
                                >
                                  <Code2 className="w-3 h-3 animate-pulse" />
                                  Show Script
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {selectedArsenalItem.details.comparisonTable && (
                          <div className="space-y-4 pt-4">
                            <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black" : "text-neon-cyan"}`}>
                              08_Key_Metrics_&_Performance_Impact
                            </div>
                            <div className="overflow-x-auto border brutalist-border bg-black/40">
                              <table className={`w-full text-left font-mono text-xs border-collapse ${isArch ? "border-gray-200" : "border-terminal-border/20"}`}>
                                <thead>
                                  <tr className={isArch ? "bg-gray-100/80 border-b border-gray-200" : "bg-black/60 border-b border-terminal-border/20"}>
                                    {selectedArsenalItem.details.comparisonTable.headers.map((hdr, idx) => (
                                      <th key={idx} className={`p-3 font-bold uppercase tracking-wider text-[10px] ${isArch ? "text-gray-700 font-sans" : "text-neon-cyan"}`}>
                                        {hdr}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className={`divide-y ${isArch ? "divide-gray-100" : "divide-terminal-border/10"}`}>
                                  {selectedArsenalItem.details.comparisonTable.rows.map((row, rIdx) => (
                                    <tr key={rIdx} className={`transition-colors duration-500 ${isArch ? "hover:bg-gray-50/50" : "hover:bg-white/[0.01]"}`}>
                                      {row.map((cell, cIdx) => {
                                        const isAutomatedCol = cIdx === 2;
                                        return (
                                          <td 
                                            key={cIdx} 
                                            className={`p-3 align-middle text-[11px] ${
                                              isAutomatedCol
                                                ? (isArch ? "text-emerald-600 font-bold bg-emerald-50/15" : "text-neon-orange font-bold bg-neon-orange/[0.02]")
                                                : (cIdx === 0 ? (isArch ? "text-black font-semibold font-sans" : "text-white font-semibold") : (isArch ? "text-gray-500 font-sans" : "text-gray-400"))
                                            }`}
                                          >
                                            {cell}
                                          </td>
                                        );
                                      })}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {selectedArsenalItem.details.images && selectedArsenalItem.details.images.length > 0 && (
                          <div className="space-y-4 pt-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-2">
                              <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black" : "text-neon-cyan"}`}>
                                09_{isArch ? "Technical_Gallery_&_Visuals" : "System_Drawings_&_Analytics"}
                              </div>
                              
                              {/* Gallery Navigation Tabs (Renders vs. Drawings) */}
                              <div className="flex flex-wrap gap-1">
                                <button
                                  type="button"
                                  onClick={() => setGalleryFilter('all')}
                                  className={`px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider border rounded transition-all cursor-pointer ${
                                    galleryFilter === 'all'
                                      ? isArch
                                        ? "bg-black text-white border-black font-bold"
                                        : "bg-neon-cyan/25 text-neon-cyan border-neon-cyan font-bold shadow-[0_0_6px_rgba(1,242,255,0.2)]"
                                      : isArch
                                        ? "border-gray-200 text-gray-500 hover:text-black hover:border-black bg-white"
                                        : "border-terminal-border/40 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan bg-black/40"
                                  }`}
                                >
                                  All ({selectedArsenalItem.details.images.length})
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setGalleryFilter('render')}
                                  className={`px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider border rounded transition-all cursor-pointer ${
                                    galleryFilter === 'render'
                                      ? isArch
                                        ? "bg-black text-white border-black font-bold"
                                        : "bg-neon-cyan/25 text-neon-cyan border-neon-cyan font-bold shadow-[0_0_6px_rgba(1,242,255,0.2)]"
                                      : isArch
                                        ? "border-gray-200 text-gray-500 hover:text-black hover:border-black bg-white"
                                        : "border-terminal-border/40 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan bg-black/40"
                                  }`}
                                >
                                  Renders ({
                                    selectedArsenalItem.details.images.filter((img, idx) => getGalleryItemType(img, idx, selectedArsenalItem.id) === 'render').length
                                  })
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setGalleryFilter('drawing')}
                                  className={`px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider border rounded transition-all cursor-pointer ${
                                    galleryFilter === 'drawing'
                                      ? isArch
                                        ? "bg-black text-white border-black font-bold"
                                        : "bg-neon-cyan/25 text-neon-cyan border-neon-cyan font-bold shadow-[0_0_6px_rgba(1,242,255,0.2)]"
                                      : isArch
                                        ? "border-gray-200 text-gray-500 hover:text-black hover:border-black bg-white"
                                        : "border-terminal-border/40 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan bg-black/40"
                                  }`}
                                >
                                  Drawings ({
                                    selectedArsenalItem.details.images.filter((img, idx) => getGalleryItemType(img, idx, selectedArsenalItem.id) === 'drawing').length
                                  })
                                </button>
                                {selectedArsenalItem.details.images.some((img, idx) => getGalleryItemType(img, idx, selectedArsenalItem.id) === 'video') && (
                                  <button
                                    type="button"
                                    onClick={() => setGalleryFilter('video')}
                                    className={`px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider border rounded transition-all cursor-pointer ${
                                      galleryFilter === 'video'
                                        ? isArch
                                          ? "bg-black text-white border-black font-bold"
                                          : "bg-neon-cyan/25 text-neon-cyan border-neon-cyan font-bold shadow-[0_0_6px_rgba(1,242,255,0.2)]"
                                        : isArch
                                          ? "border-gray-200 text-gray-500 hover:text-black hover:border-black bg-white"
                                          : "border-terminal-border/40 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan bg-black/40"
                                    }`}
                                  >
                                    Videos ({
                                      selectedArsenalItem.details.images.filter((img, idx) => getGalleryItemType(img, idx, selectedArsenalItem.id) === 'video').length
                                    })
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {selectedArsenalItem.details.images
                                .map((img, idx) => ({ img, idx, type: getGalleryItemType(img, idx, selectedArsenalItem.id) }))
                                .filter(item => galleryFilter === 'all' || item.type === galleryFilter)
                                .map(({ img, idx, type }) => {
                                  const isVideo = type === 'video';
                                  const googleDriveId = getDriveId(img);
                                  const thumbSrc = getStaticThumbnailUrl(img);
                                  return (
                                    <div 
                                      key={idx} 
                                      onClick={() => {
                                        setExpandedMedia({
                                          src: img,
                                          isVideo,
                                          googleDriveId,
                                          alt: type === 'drawing' ? `Technical Drawing Details ${idx + 1}` : `High Quality Render ${idx + 1}`
                                        });
                                      }}
                                      className={`aspect-video border relative overflow-hidden group/gal transition-all duration-700 cursor-zoom-in ${
                                        isArch ? "border-gray-100 bg-gray-50 hover:border-black" : "brutalist-border bg-black hover:border-neon-cyan"
                                      }`}
                                    >
                                      {/* Thumbnail Image */}
                                      <img 
                                        src={thumbSrc} 
                                        alt={type === 'drawing' ? `Technical Drawing details ${idx + 1}` : `Rendering ${idx + 1}`}
                                        onContextMenu={(e) => e.preventDefault()}
                                        onDragStart={(e) => e.preventDefault()}
                                        className={`w-full h-full object-cover transition-all duration-700 select-none pointer-events-none ${
                                          isArch ? "opacity-100 group-hover/gal:scale-105" : "opacity-70 group-hover/gal:opacity-100 group-hover/gal:scale-105"
                                        }`}
                                        referrerPolicy="no-referrer"
                                      />

                                      {/* Subtle Overlay Badge */}
                                      <div className={`absolute top-2 left-2 px-1.5 py-0.5 font-mono text-[7px] border transition-colors duration-700 tracking-wider ${
                                        isArch 
                                          ? "bg-white/90 backdrop-blur text-black border-gray-200 font-bold" 
                                          : "bg-black/90 backdrop-blur text-gray-400 border-gray-850"
                                      }`}>
                                        {type === 'video' 
                                          ? "VIDEO_FEED" 
                                          : type === 'drawing' 
                                            ? "TECHNICAL_DRAWING" 
                                            : "RENDER_VISUAL"}
                                      </div>

                                      {/* Play / Expand Overlay */}
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/gal:opacity-100 flex items-center justify-center transition-all duration-300">
                                        <div className={`p-2.5 rounded-full border transition-all duration-500 transform scale-95 group-hover/gal:scale-100 ${
                                          isArch 
                                            ? "bg-white border-black text-black shadow-lg" 
                                            : "bg-black/90 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.25)]"
                                        }`}>
                                          {isVideo ? <Play className="w-4 h-4 fill-current ml-0.5" /> : <Maximize2 className="w-4 h-4" />}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Removed Performance/Impact Metric box */}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className={`p-4 border-t flex justify-between items-center font-mono text-[10px] text-gray-600 transition-all duration-700 ${isArch ? "bg-gray-50 border-gray-100" : "bg-black/30 border-terminal-border"}`}>
                <div>{isArch ? "ARCH_REF: " : "VDC_REF: "}{selectedArsenalItem.id}</div>
                <div className="flex gap-4">
                  <span className={isArch ? "text-black" : "text-neon-cyan"}>{isArch ? "DOCUMENTATION_COMPLETE" : "DATA_INTEGRITY_VERIFIED"}</span>
                  <span>STATUS: READY</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {expandedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedMedia(null)}
            className="fixed inset-0 z-[110] flex flex-col items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl cursor-zoom-out"
          >
            {/* Elegant Header Info bar */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10 font-mono text-[9px] md:text-[10px] tracking-widest text-gray-500 uppercase">
              <div className="flex items-center gap-2">
                <span className={isArch ? "text-white" : "text-neon-cyan animate-pulse"}>●</span>
                <span>{expandedMedia.alt}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline">CLICK OUTSIDE OR BUTTON TO CLOSE</span>
                <Box className="w-3.5 h-3.5 rotate-45 text-gray-400" />
              </div>
            </div>

            {/* Media Canvas Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-5xl max-h-[82vh] aspect-video overflow-hidden flex items-center justify-center shadow-2xl pointer-events-auto border transition-all duration-700 ${
                isArch ? "border-gray-800 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.9)]" : "border-terminal-border bg-black shadow-[0_0_80px_rgba(0,243,255,0.15)]"
              }`}
            >
              {expandedMedia.isVideo ? (
                (() => {
                  const ytId = getYoutubeId(expandedMedia.src);
                  if (ytId) {
                    return (
                      <iframe
                        src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
                        className="w-full h-full border-0 absolute inset-0"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  }
                  if (expandedMedia.googleDriveId) {
                    return (
                      <iframe
                        src={`https://drive.google.com/file/d/${expandedMedia.googleDriveId}/preview?autoplay=1`}
                        className="w-full h-full border-0 absolute inset-0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    );
                  }
                  const cleanPlayable = getPlayableVideoUrl(expandedMedia.src);
                  return (
                    <video 
                      src={cleanPlayable}
                      controls
                      controlsList="nodownload"
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-contain absolute inset-0 select-none"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                  );
                })()
              ) : (
                (() => {
                  const googleDriveId = getDriveId(expandedMedia.src);
                  const fullSrc = googleDriveId 
                    ? `https://lh3.googleusercontent.com/d/${googleDriveId}` 
                    : expandedMedia.src.split('#')[0];
                  return (
                    <div className="w-full h-full relative select-none">
                      <img 
                        src={fullSrc} 
                        alt={expandedMedia.alt}
                        className="w-full h-full object-contain select-none pointer-events-none absolute inset-0"
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        referrerPolicy="no-referrer"
                      />
                      {/* Transparent Absolute Overlay Shield preventing direct interactions */}
                      <div 
                        className="absolute inset-0 z-20 bg-transparent select-none pointer-events-auto" 
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>
                  );
                })()
              )}

              {/* Close Button overlay */}
              <button
                onClick={() => setExpandedMedia(null)}
                className={`absolute top-4 right-4 p-2 transition-all z-25 border text-white ${
                  isArch 
                    ? "bg-white/10 hover:bg-white hover:text-black border-white/20" 
                    : "bg-black/80 hover:bg-white hover:text-black border-terminal-border hover:border-white"
                }`}
              >
                <Box className="w-4 h-4 rotate-45" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
