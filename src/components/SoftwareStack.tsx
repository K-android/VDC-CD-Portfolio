import React from 'react';
import { motion } from 'motion/react';
import { Code2, Database, ChevronRight, ChevronDown, ShieldCheck, Cpu } from 'lucide-react';

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
    { name: "Excel / SQL", category: "Data" },
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
  const urlLower = imgUrl.toLowerCase();
  
  // 1. Explicit Anchors check (absolute precedence)
  const anchor = imgUrl.includes("#") ? imgUrl.split("#")[1].toLowerCase() : "";
  if (anchor === "video" || urlLower.endsWith(".mp4") || urlLower.endsWith(".mov") || imgUrl.includes("1h89DNz0NAtQeH_rtLlNxXqN0ZI_9FXuk") || !!getYoutubeId(imgUrl)) {
    return "video";
  }
  if (anchor === "drawing" || anchor === "sheet" || anchor === "tech" || anchor === "blueprint" || anchor === "cad" || anchor === "detail" || anchor === "draft") {
    return "drawing";
  }
  if (anchor === "render" || anchor === "image" || anchor === "visual" || anchor === "scene") {
    return "render";
  }

  // 2. Keyword check on URL
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
    urlLower.includes("pdf") ||
    urlLower.includes("unrolled") ||
    urlLower.includes("workflow") ||
    urlLower.includes("code") ||
    urlLower.includes("script") ||
    urlLower.includes("chart")
  ) {
    return "drawing";
  }
  
  // 3. Project-Specific Overrides for implicit URLs
  if (projectId === "ARCH_01") {
    if ([2, 3, 4, 5].includes(idx)) return "drawing";
    return "render";
  }
  
  if (projectId === "ARCH_02") {
    if (idx >= 5) return "drawing"; 
    return "render";
  }
  
  if (projectId === "ARCH_04") {
    if (idx >= 4) return "drawing";
    return "render";
  }
  
  if (projectId === "ARCH_05") {
    if (idx >= 4) return "drawing";
    return "render";
  }
  
  if (projectId === "ARCH_06") {
    if (idx >= 6) return "drawing";
    return "render";
  }
  
  if (projectId === "ARCH_07") {
    if ([3, 4, 5].includes(idx)) return "drawing";
    return "render";
  }
  
  if (projectId === "ARCH_08") {
    if (idx === 3) return "drawing";
    return "render";
  }
  
  if (projectId === "ARCH_09") {
    if (idx >= 3 && idx !== 10) return "drawing";
    return "render";
  }

  // 4. Default by category prefix
  if (projectId.startsWith("BIM_")) {
    return "drawing"; // BIM tools, charts, workflows, calculations, and Dynamo code screenshots
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

const FlowArrow = ({ isArch, horizontal = false }: { isArch: boolean; horizontal?: boolean; key?: any }) => {
  if (horizontal) {
    return (
      <div className="flex items-center justify-center px-1 shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="overflow-visible opacity-50">
          <line 
            x1="0" y1="12" x2="24" y2="12" 
            stroke={isArch ? "#000000" : "#01f2ff"} 
            strokeWidth="1.5" 
            strokeDasharray={isArch ? "2 2" : "3 3"} 
          />
          <path 
            d="M16 8L20 12L16 16" 
            stroke={isArch ? "#000000" : "#01f2ff"} 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center py-1 shrink-0">
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
    <div className={`font-mono text-xs rounded-lg p-4 md:p-6 transition-all duration-700 ${
      isArch 
        ? "bg-gray-50/50 border border-gray-150 text-gray-800" 
        : "bg-[#04070a] border border-terminal-border/20 text-gray-400"
    }`}>
      {/* Mobile/Vertical View */}
      <div className="flex flex-col items-center gap-2 lg:hidden w-full">
        {/* Start Node */}
        <div className="flex flex-col items-center w-full max-w-sm">
          <div 
            className={`px-4 py-3 rounded-xl border text-center shadow-sm w-full ${
              isArch
                ? "border-black text-black font-semibold bg-white"
                : "border-emerald-500/85 text-emerald-400 bg-emerald-950/15"
            }`}
          >
            <div className="text-[8px] opacity-75 uppercase tracking-widest font-bold">START</div>
            <div className="text-[11px] font-bold mt-1">{data.start.title}</div>
            <div className="text-[9.5px] opacity-80 font-normal leading-relaxed mt-0.5">{data.start.subtitle}</div>
          </div>
          <FlowArrow isArch={isArch} horizontal={false} />
        </div>

        {/* Nodes */}
        {data.nodes.map((node, i) => (
          <React.Fragment key={`node-${i}`}>
            <div
              className={`border rounded-xl p-3.5 transition-all duration-500 relative overflow-hidden w-full max-w-sm ${
                isArch
                  ? "border-black bg-white text-black"
                  : "border-terminal-border/30 bg-[#080b0e] text-gray-300"
              }`}
            >
              <div className="flex justify-between items-start gap-1 mb-1.5">
                <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${
                  isArch 
                    ? "bg-black text-white" 
                    : "bg-terminal-border/10 text-neon-cyan border border-terminal-border/20"
                }`}>
                  PHASE 0{i + 1}
                </span>
                
                {node.metric && (
                  <span className={`text-[8px] font-bold ${
                    isArch ? "text-stone-500" : "text-neon-orange"
                  }`}>
                    {node.metric}
                  </span>
                )}
              </div>
              <div className="flex gap-2 items-start">
                <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${
                  isArch
                    ? "border-black text-black bg-white"
                    : "border-terminal-border/40 text-gray-400 bg-black/40"
                }`}>
                  <Cpu className="w-3 h-3" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className={`text-[11px] font-bold tracking-tight ${
                    isArch ? "text-black" : "text-gray-100"
                  }`}>
                    {node.title}
                  </h4>
                  <p className={`text-[10px] leading-relaxed mt-1 font-normal ${
                    isArch ? "text-gray-600" : "text-gray-400"
                  }`}>
                    {node.subtitle}
                  </p>
                </div>
              </div>
            </div>
            <FlowArrow isArch={isArch} horizontal={false} />
          </React.Fragment>
        ))}

        {/* End Node */}
        <div 
          className={`px-4 py-3 rounded-xl border text-center w-full max-w-sm ${
            isArch
              ? "border-black bg-white text-black font-semibold shadow"
              : "border-emerald-500/60 bg-emerald-950/30 text-emerald-300"
          }`}
        >
          <div className="text-[8px] opacity-75 uppercase tracking-widest font-bold">DISPATCH</div>
          <div className="text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1.5 mt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{data.end.title}</span>
          </div>
          <div className="text-[9.5px] opacity-80 font-normal leading-relaxed mt-1">{data.end.desc || data.end.subtitle}</div>
        </div>
      </div>

      {/* Desktop View - 2 Rows of 3 elements */}
      <div className="hidden lg:flex flex-col gap-6 w-full">
        {/* Row 1: Start -> Phase 1 -> Phase 2 */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {/* Start Node */}
          <div className="relative">
            <div 
              className={`h-full min-h-[110px] flex flex-col justify-center p-4 rounded-xl border text-center shadow transition-all duration-700 ${
                isArch
                  ? "border-black text-black font-semibold bg-white"
                  : "border-emerald-500/60 bg-emerald-950/10 text-emerald-300"
              }`}
            >
              <div className="text-[8px] opacity-75 uppercase tracking-widest font-bold mb-1">START</div>
              <div className="text-[11px] font-bold text-emerald-400 tracking-tight">{data.start.title}</div>
              <div className="text-[10px] opacity-90 font-normal mt-1 leading-relaxed">{data.start.subtitle}</div>
            </div>
            
            {/* Connector Arrow pointing right */}
            <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 flex items-center justify-center">
              <ChevronRight className={`w-4 h-4 shadow-sm bg-[#04070a] border rounded-full p-0.5 ${
                isArch ? "text-black border-stone-300 bg-white" : "text-neon-cyan border-terminal-border/20 bg-black"
              }`} />
            </div>
          </div>

          {/* Phase 01 */}
          <div className="relative">
            <div className={`h-full min-h-[110px] border rounded-xl p-4 transition-all duration-500 flex flex-col justify-between ${
              isArch ? "border-black bg-white text-black" : "border-terminal-border/30 bg-[#080b0e] text-gray-300"
            }`}>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                    isArch ? "bg-black text-white" : "bg-terminal-border/10 text-neon-cyan border border-terminal-border/20"
                  }`}>PHASE 01</span>
                  {data.nodes[0]?.metric && (
                    <span className={`text-[8px] font-mono font-bold uppercase ${isArch ? "text-stone-500" : "text-neon-orange"}`}>
                      {data.nodes[0].metric}
                    </span>
                  )}
                </div>
                <h4 className={`text-[11px] font-bold tracking-tight ${isArch ? "text-black font-sans" : "text-white font-mono"}`}>
                  {data.nodes[0]?.title}
                </h4>
                <p className={`text-[10px] leading-relaxed mt-1 font-normal ${isArch ? "text-stone-600" : "text-gray-400"}`}>
                  {data.nodes[0]?.subtitle}
                </p>
              </div>
            </div>
            
            {/* Connector Arrow pointing right */}
            <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 flex items-center justify-center">
              <ChevronRight className={`w-4 h-4 shadow-sm bg-[#04070a] border rounded-full p-0.5 ${
                isArch ? "text-black border-stone-300 bg-white" : "text-neon-cyan border-terminal-border/20 bg-black"
              }`} />
            </div>
          </div>

          {/* Phase 02 */}
          <div>
            <div className={`h-full min-h-[110px] border rounded-xl p-4 transition-all duration-500 flex flex-col justify-between ${
              isArch ? "border-black bg-white text-black" : "border-terminal-border/30 bg-[#080b0e] text-gray-300"
            }`}>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                    isArch ? "bg-black text-white" : "bg-terminal-border/10 text-neon-cyan border border-terminal-border/20"
                  }`}>PHASE 02</span>
                  {data.nodes[1]?.metric && (
                    <span className={`text-[8px] font-mono font-bold uppercase ${isArch ? "text-stone-500" : "text-neon-orange"}`}>
                      {data.nodes[1].metric}
                    </span>
                  )}
                </div>
                <h4 className={`text-[11px] font-bold tracking-tight ${isArch ? "text-black font-sans" : "text-white font-mono"}`}>
                  {data.nodes[1]?.title}
                </h4>
                <p className={`text-[10px] leading-relaxed mt-1 font-normal ${isArch ? "text-stone-600" : "text-gray-400"}`}>
                  {data.nodes[1]?.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transition Downward Connection Line */}
        <div className="flex justify-between items-center px-6 -my-2.5">
          <div className="h-[1px] flex-1 border-t border-dashed border-terminal-border/20 mr-4 opacity-50"></div>
          <div className="flex items-center gap-2 font-mono text-[9px] opacity-50 px-3 py-1 rounded bg-black/40 border border-terminal-border/10 text-neon-cyan uppercase">
            <span>CONTINUE PROCESSING</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
          <div className="h-[1px] flex-1 border-t border-dashed border-terminal-border/20 ml-4 opacity-50"></div>
        </div>

        {/* Row 2: Phase 3 -> Phase 4 -> Dispatch / End */}
        <div className="grid grid-cols-3 gap-4 w-full">
          
          {/* Phase 03 */}
          <div className="relative">
            <div className={`h-full min-h-[110px] border rounded-xl p-4 transition-all duration-500 flex flex-col justify-between ${
              isArch ? "border-black bg-white text-black" : "border-terminal-border/30 bg-[#080b0e] text-gray-300"
            }`}>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                    isArch ? "bg-black text-white" : "bg-terminal-border/10 text-neon-cyan border border-terminal-border/20"
                  }`}>PHASE 03</span>
                  {data.nodes[2]?.metric && (
                    <span className={`text-[8px] font-mono font-bold uppercase ${isArch ? "text-stone-500" : "text-neon-orange"}`}>
                      {data.nodes[2].metric}
                    </span>
                  )}
                </div>
                <h4 className={`text-[11px] font-bold tracking-tight ${isArch ? "text-black font-sans" : "text-white font-mono"}`}>
                  {data.nodes[2]?.title}
                </h4>
                <p className={`text-[10px] leading-relaxed mt-1 font-normal ${isArch ? "text-stone-600" : "text-gray-400"}`}>
                  {data.nodes[2]?.subtitle}
                </p>
              </div>
            </div>
            
            {/* Connector Arrow pointing right */}
            <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 flex items-center justify-center">
              <ChevronRight className={`w-4 h-4 shadow-sm bg-[#04070a] border rounded-full p-0.5 ${
                isArch ? "text-black border-stone-300 bg-white" : "text-neon-cyan border-terminal-border/20 bg-black"
              }`} />
            </div>
          </div>

          {/* Phase 04 */}
          <div className="relative">
            <div className={`h-full min-h-[110px] border rounded-xl p-4 transition-all duration-500 flex flex-col justify-between ${
              isArch ? "border-black bg-white text-black" : "border-terminal-border/30 bg-[#080b0e] text-gray-300"
            }`}>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                    isArch ? "bg-black text-white" : "bg-terminal-border/10 text-neon-cyan border border-terminal-border/20"
                  }`}>PHASE 04</span>
                  {data.nodes[3]?.metric && (
                    <span className={`text-[8px] font-mono font-bold uppercase ${isArch ? "text-stone-500" : "text-neon-orange"}`}>
                      {data.nodes[3].metric}
                    </span>
                  )}
                </div>
                <h4 className={`text-[11px] font-bold tracking-tight ${isArch ? "text-black font-sans" : "text-white font-mono"}`}>
                  {data.nodes[3]?.title}
                </h4>
                <p className={`text-[10px] leading-relaxed mt-1 font-normal ${isArch ? "text-stone-600" : "text-gray-400"}`}>
                  {data.nodes[3]?.subtitle}
                </p>
              </div>
            </div>
            
            {/* Connector Arrow pointing right */}
            <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 flex items-center justify-center">
              <ChevronRight className={`w-4 h-4 shadow-sm bg-[#04070a] border rounded-full p-0.5 ${
                isArch ? "text-black border-stone-300 bg-white" : "text-neon-cyan border-terminal-border/20 bg-black"
              }`} />
            </div>
          </div>

          {/* Dispatch End Node */}
          <div>
            <div 
              className={`h-full min-h-[110px] flex flex-col justify-between p-4 rounded-xl border transition-all duration-500 ${
                isArch
                  ? "border-black bg-white text-black font-semibold shadow"
                  : "border-emerald-500/60 bg-emerald-950/20 text-emerald-300"
              }`}
            >
              <div>
                <div className="text-[8px] opacity-75 uppercase tracking-widest font-bold mb-1.5">FINAL DISPATCH</div>
                <div className="text-[12px] font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-tight">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{data.end.title}</span>
                </div>
                <p className={`text-[10px] leading-relaxed mt-1.5 font-normal opacity-90 ${isArch ? "text-stone-600" : "text-stone-400"}`}>
                  {data.end.desc || data.end.subtitle}
                </p>
              </div>
              <div className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-900 border-dashed w-max mt-2">
                TRANSIT: LOGIC VERIFIED
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SoftwareStack;
