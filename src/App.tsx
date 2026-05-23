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
  Zap
} from "lucide-react";

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
      {tools.map((tool) => (
        <motion.div 
          key={`${isArch ? 'arch' : 'bim'}-${tool.name}`}
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

const WorkloadGif = ({ 
  src, 
  alt, 
  className, 
  isArch,
  forcePlay = false,
  play
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  isArch: boolean;
  forcePlay?: boolean;
  play?: boolean;
}) => {
  const [isInternalHovered, setIsInternalHovered] = useState(false);
  const active = play !== undefined ? play : (forcePlay || isInternalHovered);
  
  const staticUrl = React.useMemo(() => {
    if (!src) return "";
    // Google Drive check
    if (src.includes('lh3.googleusercontent.com/d/')) {
      const id = src.split('/').pop();
      return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
    }
    // Giphy check
    if (src.includes('giphy.com/media/')) {
      // Giphy static version often uses _s suffix
      return src.replace('/giphy.gif', '/giphy_s.gif');
    }
    return src;
  }, [src]);

  return (
    <div 
      className="w-full h-full"
      onMouseEnter={() => setIsInternalHovered(true)}
      onMouseLeave={() => setIsInternalHovered(false)}
    >
      <img 
        src={active ? src : staticUrl} 
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
  onClick 
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
      {/* Status Bar / Metric Badge */}
      <div className={`p-3 border-b flex justify-between items-center bg-opacity-50 backdrop-blur-sm transition-colors duration-700 ${
        isArch ? "border-gray-100 bg-gray-50/50" : "border-terminal-border bg-black/50"
      }`}>
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-700 ${isArch ? "bg-black" : `bg-${item.color}`}`} />
          <span className={`font-mono text-[9px] uppercase tracking-widest ${isArch ? "text-gray-400" : "text-gray-500"}`}>
            Output_Metric
          </span>
        </div>
        <div className={`font-mono text-[10px] font-bold px-2 py-0.5 border transition-all duration-700 ${
          isArch 
          ? "border-black text-black bg-white" 
          : `border-${item.color} text-${item.color} shadow-[0_0_10px_rgba(var(--color-${item.color}),0.2)]`
        }`}>
          {item.metric}
        </div>
      </div>

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
            {item.tags.map(tag => (
              <span key={tag} className={`text-[8px] md:text-[9px] font-mono px-2 py-0.5 border transition-colors duration-700 ${isArch ? "border-gray-100 text-gray-400" : "border-terminal-border/50 text-gray-500 group-hover:text-neon-cyan/70 group-hover:border-neon-cyan/20"}`}>
                {tag}
              </span>
            ))}
          </div>
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
  const [selectedArsenalItem, setSelectedArsenalItem] = useState<ArsenalItem | null>(null);

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
          "https://picsum.photos/seed/housing1/800/450?grayscale", 
          "https://picsum.photos/seed/housing2/800/450?grayscale"
        ],
        reportUrl: "https://drive.google.com/file/d/1CqV2ZUK7VDxh0zOxQze9lkTSIEavsr12/view?usp=sharing",
        videoUrl: "https://youtu.be/g0VIh64HiT8?si=hyFN6JXnnG_pqM5A"
      }
    },
    {
      id: "ARCH_02",
      title: "Sadhu Residence Complex",
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
      }
    },
    {
      id: "ARCH_03",
      title: "Tectonic Assemblies",
      description: "Exploring the intersection of material, structure, and detail to create expressive architectural forms.",
      icon: <Box className="w-6 h-6 text-gray-400" />,
      color: "gray-400",
      metric: "Materiality",
      gifUrl: "https://media.giphy.com/media/l41lTfuxR4R8E/giphy.gif",
      tags: ["Fabrication", "Detailing", "Structure"],
      category: "Research",
      workflow: {
        screenshotUrl: "https://picsum.photos/seed/arch-workflow-2/800/450?grayscale",
        steps: [
          "Research material properties and fabrication methods.",
          "Develop structural systems that integrate with design intent.",
          "Create detailed construction drawings and prototypes.",
          "Coordinate with consultants for technical feasibility."
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
        images: ["https://picsum.photos/seed/cafe1/800/450?grayscale", "https://picsum.photos/seed/cafe2/800/450?grayscale"]
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
        images: ["https://picsum.photos/seed/hospice1/800/450?grayscale", "https://picsum.photos/seed/hospice2/800/450?grayscale"]
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
      gifUrl: "https://media.giphy.com/media/l41lTfuxR4R8E/giphy.gif",
      tags: ["Fabrication", "Materiality", "On-Site Assembly"],
      category: "Fabrication",
      details: {
        overview: "The Recycled Bus Pavilion was a live design-build project aimed at demonstrating the potential of 'upcycling' industrial waste into community infrastructure.",
        challenge: "Working with a rigid, pre-existing structural shell (the bus) and adapting it to a new, open-ended public function while ensuring structural safety.",
        solution: "We stripped the bus to its chassis and reinforced it with reclaimed steel sections. The design featured a modular seating system and a translucent roof made from recycled polycarbonate sheets, creating a lightweight, airy community hub.",
        images: ["https://picsum.photos/seed/bus1/800/450?grayscale", "https://picsum.photos/seed/bus2/800/450?grayscale"]
      }
    },
    {
      id: "ARCH_07",
      title: "Bamboo Grid Pavilion",
      role: "Fabrication Lead",
      hook: "Exploring parametric joinery in organic materials.",
      description: "A lightweight, modular pavilion constructed entirely from bamboo. Focuses on sustainable joinery and rapid on-site assembly.",
      icon: <Hammer className="w-6 h-6 text-gray-400" />,
      color: "gray-400",
      metric: "Sustainable",
      gifUrl: "https://media.giphy.com/media/l41lTfuxR4R8E/giphy.gif",
      tags: ["Bamboo", "Parametric Design", "Hands-on"],
      category: "Fabrication",
      details: {
        overview: "The Bamboo Grid Pavilion was an experimental structure that merged traditional bamboo construction with computational design logic.",
        challenge: "Bamboo is a non-standard material with varying diameters and strengths, making precise joinery difficult for a complex grid shell.",
        solution: "We developed a parametric joint system that could accommodate variations in bamboo culm size. The entire structure was prefabricated in modules and assembled on-site in less than 48 hours.",
        images: ["https://picsum.photos/seed/bamboo1/800/450?grayscale", "https://picsum.photos/seed/bamboo2/800/450?grayscale"]
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
        ]
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
        reportUrl: "https://drive.google.com/file/d/1LetvlyhbGmUM-43bKoJR2OVGJQCNutWJ/view?usp=sharing"
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
      }
    },
    {
      id: "BIM_07",
      title: "Climate Automation",
      role: "Simulation Lead",
      hook: "Automating environmental and solar analysis.",
      description: "I automated environmental and solar analysis to achieve Net-Zero performance targets at the massing stage.",
      icon: <ShieldCheck className="w-6 h-6 text-neon-blue" />,
      color: "neon-blue",
      metric: "Net-Zero",
      gifUrl: "https://media.giphy.com/media/l41lTfuxR4R8E/giphy.gif",
      tags: ["Ladybug", "Honeybee", "Net-Zero"],
      workflow: {
        screenshotUrl: "https://picsum.photos/seed/workflow-7/800/450?grayscale",
        steps: [
          "Import massing geometry into Ladybug/Honeybee.",
          "Execute solar radiation and daylighting analysis.",
          "Iterate facade design based on heat map outputs.",
          "Validate performance against Net-Zero targets."
        ]
      }
    },
    {
      id: "BIM_08",
      title: "Corporate Data Standards",
      role: "Information Manager",
      hook: "ISO 19650 Information Management (Expert).",
      description: "I implemented ISO 19650 compliant workflows for large-scale corporate asset portfolios. I am a certified expert.",
      icon: <FileText className="w-6 h-6 text-neon-cyan" />,
      color: "neon-cyan",
      metric: "ISO 19650",
      gifUrl: "https://lh3.googleusercontent.com/d/1szL-O1_LuUqLzzsL3lJqB2JzX4K39dnt",
      tags: ["ISO 19650", "Information Management", "Expert"],
      isVerified: true,
      workflow: {
        screenshotUrl: "https://picsum.photos/seed/workflow-8/800/450?grayscale",
        steps: [
          "Define Organizational Information Requirements (OIR).",
          "Establish Common Data Environment (CDE) protocols.",
          "Audit project models for data naming and structure.",
          "Validate Asset Information Models (AIM) for handover."
        ]
      }
    },
    {
      id: "BIM_09",
      title: "Constructability Proof",
      role: "VDC Engineer",
      hook: "Bridging computational data with physical assembly.",
      description: "I bridged the gap between design and fabrication through detailed assembly modeling and site-ready shop drawings.",
      icon: <Hammer className="w-6 h-6 text-neon-orange" />,
      color: "neon-orange",
      metric: "Site-Ready",
      gifUrl: "https://lh3.googleusercontent.com/d/1P0FpPB-A9-Cs0bz1cywCumsfNBZyCA6j",
      tags: ["Solar Decathlon", "Fabrication", "Assembly"],
      workflow: {
        screenshotUrl: "https://picsum.photos/seed/workflow-9/800/450?grayscale",
        steps: [
          "Develop high-LOD assembly models (LOD 400).",
          "Extract precise cutting lists and fabrication data.",
          "Simulate assembly sequences for site logistics.",
          "Verify as-built conditions against design intent."
        ]
      },
      details: {
        overview: "Bridging computational data with physical assembly. Solar Decathlon Net-Zero Grand Winner & Hands-on fabrication.",
        challenge: "Translating complex simulation data into physical construction tolerances.",
        solution: "Developed a custom fabrication pipeline that mapped simulation outputs directly to CNC and manual assembly guides.",
        images: [
          "https://lh3.googleusercontent.com/d/1-BhZKRQJEpkQhE8Kuq6BURh0UYO7qYrH",
          "https://picsum.photos/seed/bamboo1/800/450?grayscale"
        ]
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
      description: "Navigating complex project coordination and assisting in large-scale architectural delivery. Managing digital 3D modeling pipelines and spatial coordination. Developed Python and Dynamo toolkits to automate repetitive data entry."
    },
    {
      year: "Jan 2025 - Present",
      company: "Self-Employed",
      role: "3D Visualizer",
      description: "Managed end-to-end digital delivery pipelines, translating complex client requirements into highly accurate 3D architectural models. Produced high-fidelity architectural visualizations and photorealistic renders using Enscape, D5 Render, and Twinmotion."
    },
    {
      year: "July 2025 - Sept 2025",
      company: "E.D.P Consultants",
      role: "Architectural Intern",
      description: "Prepared detailed working drawings and refined layouts for residential projects with a focus on accessibility and Vaastu compliance. Developed 3D models and high-quality renders for client presentations."
    },
    {
      year: "Sept 2024 - May 2025",
      company: "Anvaya",
      role: "Simulation Lead",
      description: "Directed building performance and environmental simulations for the Health and Well-being division of the Solar Decathlon India challenge. Optimized design outcomes for large-scale Construction Worker Housing."
    },
    {
      year: "Dec 2021 - March 2026",
      company: "BMS College of Architecture",
      role: "Bachelor of Architecture (B.Arch)",
      description: "Focusing on the intersection of traditional architecture and computational BIM workflows."
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
          {visibleSections.map((s, i) => (
            <button 
              key={s}
              onClick={() => handleSectionChange(i)}
              className={`hover:text-neon-cyan transition-colors ${activeSection === i ? (isHeaderArch ? "text-black font-semibold" : "text-neon-cyan") : ""}`}
            >
              {s === 'landing' ? 'Gateway' : s === 'vdc-section' ? 'VDC Core' : s === 'arch-section' ? 'Arch Studio' : 'Contact & Bio'}
            </button>
          ))}
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
              {visibleSections.map((s, i) => (
                <button 
                  key={s}
                  onClick={() => {
                    handleSectionChange(i);
                    setIsMenuOpen(false);
                  }}
                  className={`hover:scale-110 transition-transform ${activeSection === i ? "font-bold underline underline-offset-8" : ""}`}
                >
                  {s === 'landing' ? 'Gateway' : s === 'vdc-section' ? 'VDC Core' : s === 'arch-section' ? 'Arch Studio' : 'Contact & Bio'}
                </button>
              ))}
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
            
            {/* Scanning Laser Line */}
            <div className="absolute inset-x-0 h-[2px] bg-neon-cyan/20 shadow-[0_0_15px_rgba(0,255,255,0.4)] animate-scan z-20 pointer-events-none" />

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
                Sculpting tectonic structures, modular assemblies, and biophilic patterns. Merging prefabricated materiality with Net Zero.
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
        <section id="vdc-section" className="bg-[#0c0f12] text-gray-300 font-sans w-full py-20 px-6 md:px-12 border-b border-terminal-border/20 relative">
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
                  Weaponizing data to eliminate project latency and automate the impossible. Scaling BIM logic through high-fidelity VDC engineering.
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
                    href="https://drive.google.com/file/d/1kFrES9rHbMtKvonYpDor0wMecebhu1f-/view?usp=sharing" 
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
                />
              ))}
            </div>
          </div>

          {/* VDC CAREER HISTORY */}
          <div className="pt-16 border-t border-terminal-border/15">
            <div className="mb-12 text-center">
              <h2 className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] mb-3 text-neon-blue">
                Section_02 // Professional_Journey
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
        <div id="transition-banner" className="w-full min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#0c0f12] via-[#0d1013] to-white border-y border-gray-100 py-16 px-6">
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
              Morphing from the logical terminal of automated BIM scripting to the physical landscape of tectonic materiality. Tectonic form meets modular assemblies.
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
                
                <p className="text-xs md:text-sm italic font-sans mb-6 max-w-xl text-gray-500 leading-relaxed">
                  Exploring the intersection of tectonic form and phenomenological impact. Formulating award-winning bio-architectural layouts.
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
                    href="https://drive.google.com/file/d/1kFrES9rHbMtKvonYpDor0wMecebhu1f-/view?usp=sharing" 
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
                
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1-BhZKRQJEpkQhE8Kuq6BURh0UYO7qYrH" 
                    alt="Arch Hero GIF"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-100 transition-all duration-1000 pointer-events-none select-none animate-fadeIn"
                  />
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
              className={`w-full max-w-5xl border overflow-hidden flex flex-col h-full md:max-h-[90vh] transition-all duration-700 ${
                isModalArch ? "bg-white border-gray-200" : "bg-terminal-bg border-terminal-border"
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
                    <h4 className={`text-sm md:text-lg font-medium uppercase tracking-tighter transition-colors duration-700 ${isModalArch ? "text-black font-serif italic" : "text-white font-sans"}`}>
                      {selectedArsenalItem.title}
                    </h4>
                    <div className="text-[8px] md:text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                      {isArch ? "Workflow_Record_v1.0" : "VDC_Workflow_Data"} // {selectedArsenalItem.id}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedArsenalItem(null)}
                  className={`p-2 transition-colors border ${isArch ? "border-gray-200 hover:bg-black hover:text-white" : "brutalist-border hover:bg-white hover:text-black"}`}
                >
                  <Box className="w-4 h-4 md:w-5 md:h-5 rotate-45" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-grow overflow-y-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                  {/* Left: Media & Workflow */}
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-gray-400" : "text-neon-cyan"}`}>
                        01_{isArch ? "Visual_Narrative" : "Process_Visualization"}
                      </div>
                      <div className={`aspect-video border relative overflow-hidden transition-all duration-700 ${isArch ? "border-gray-100 bg-gray-50" : "brutalist-border bg-black"}`}>
                        <WorkloadGif 
                          src={selectedArsenalItem.gifUrl} 
                          alt="Workflow GIF"
                          isArch={isArch}
                          forcePlay={true}
                          className={`w-full h-full object-cover transition-all duration-700 pointer-events-none select-none ${isArch ? "opacity-100" : "opacity-60"}`}
                        />
                        {!isArch && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur font-mono text-[8px] text-neon-cyan border border-neon-cyan/20">
                            RAW_FEED_STREAMING...
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedArsenalItem.workflow && (
                      <div className="space-y-4 md:space-y-6">
                        <div className={`text-[10px] font-mono uppercase tracking-widest border-b pb-2 transition-colors duration-700 ${isArch ? "text-black border-gray-100" : "text-white border-terminal-border"}`}>
                          02_{isArch ? "Methodology" : "Execution_Logic"}
                        </div>
                        <div className="space-y-3 md:space-y-4">
                          {selectedArsenalItem.workflow.steps.map((step, i) => (
                            <div key={i} className="flex gap-3 md:gap-4 items-start">
                              <div className={`font-mono text-[10px] md:text-xs pt-0.5 md:pt-1 ${isArch ? "text-black font-semibold" : "text-neon-cyan"}`}>0{i + 1}</div>
                              <div className={`text-xs md:text-sm font-mono leading-relaxed transition-colors duration-700 ${isArch ? "text-gray-500 italic" : "text-gray-400"}`}>
                                {step}
                              </div>
                            </div>
                          ))}
                        </div>
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

                        {selectedArsenalItem.details.reportUrl && (
                          <div className="space-y-4 pt-4">
                            <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black" : "text-neon-cyan"}`}>
                              08_Documentation
                            </div>
                            <div className="flex flex-wrap gap-4">
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

                              {selectedArsenalItem.details.videoUrl && (
                                <a 
                                  href={selectedArsenalItem.details.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-2 px-4 py-2 border text-[10px] font-mono uppercase tracking-widest transition-all duration-700 ${
                                    isArch 
                                    ? "border-black bg-white text-black hover:bg-black hover:text-white" 
                                    : "brutalist-border bg-neon-orange/10 text-neon-orange hover:bg-neon-orange hover:text-black"
                                  }`}
                                >
                                  <Play className="w-3 h-3" />
                                  Watch Full Movie
                                </a>
                              )}
                            </div>
                          </div>
                        )}

                        {selectedArsenalItem.details.images && selectedArsenalItem.details.images.length > 0 && (
                          <div className="space-y-4 pt-4">
                            <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black" : "text-neon-cyan"}`}>
                              09_{isArch ? "Technical_Gallery" : "System_Drawings"}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {selectedArsenalItem.details.images.map((img, idx) => (
                                <div key={idx} className={`aspect-video border relative overflow-hidden transition-all duration-700 ${isArch ? "border-gray-100 bg-gray-50" : "brutalist-border bg-black"}`}>
                                  <img 
                                    src={img} 
                                    alt={`Gallery ${idx}`}
                                    onContextMenu={(e) => e.preventDefault()}
                                    onDragStart={(e) => e.preventDefault()}
                                    className={`w-full h-full object-cover transition-all duration-700 pointer-events-none select-none ${isArch ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    <div className={`p-6 border space-y-4 transition-all duration-700 ${isArch ? "border-gray-100 bg-gray-50" : "brutalist-border bg-terminal-border/10"}`}>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{isArch ? "Impact_Metric" : "Performance_Metric"}</div>
                      <div className="flex justify-between items-end">
                        <div className={`text-xl md:text-2xl font-medium tracking-tighter transition-colors duration-700 ${isArch ? "text-black font-serif italic" : "text-white font-sans"}`}>
                          {selectedArsenalItem.metric}
                        </div>
                        <Activity className={`w-6 h-6 transition-colors duration-700 ${isArch ? "text-black" : "text-neon-cyan animate-pulse"}`} />
                      </div>
                      <div className={`h-1 w-full rounded-full overflow-hidden transition-colors duration-700 ${isArch ? "bg-gray-200" : "bg-terminal-border"}`}>
                        <div className={`h-full w-[92%] transition-colors duration-700 ${isArch ? "bg-black" : "bg-neon-cyan"}`} />
                      </div>
                    </div>
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
      </AnimatePresence>
    </div>
  );
}
