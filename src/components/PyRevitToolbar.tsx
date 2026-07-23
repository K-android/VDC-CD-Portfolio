import React, { useState } from 'react';
import { Terminal, FileSearch, FileEdit, Eye, ClipboardCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const tools = [
  {
    id: 'finder',
    title: 'Finder & Auditor',
    icon: <FileSearch className="w-8 h-8" strokeWidth={1.5} />,
    description: 'A localized, read-only search engine for your Revit model.',
    function: 'Searches the model using natural language and highlights elements matching specific parameter queries, targeted names, levels, phases, or worksets. Fully unit-aware for dimensional filtering (e.g., "Find doors with Height > 7ft").',
    outputTitle: 'Output',
    output: 'Visually overrides elements in gold and silently generates temporary CSV reports for external database tracking and schedules.'
  },
  {
    id: 'editor',
    title: 'Parameter Editor',
    icon: <FileEdit className="w-8 h-8" strokeWidth={1.5} />,
    description: 'Translates text prompts into direct database edits with built-in unit conversion.',
    function: 'Securely handles string, double, and integer (Yes/No) modifications across multiple elements or types simultaneously.',
    outputTitle: 'Safety Checkpoint',
    output: 'Features a mandatory UI confirmation dialogue to verify transaction quantities, target parameters, active metric conversions, and exact values before committing changes to the Revit database.'
  },
  {
    id: 'manipulator',
    title: 'View Manipulator',
    icon: <Eye className="w-8 h-8" strokeWidth={1.5} />,
    description: 'An automated virtual camera operator for 3D views.',
    function: 'Automates Revit camera and visibility graphics. Instantly calculates collective element bounding boxes to generate precise 3D section boxes around specific target elements, or temporarily isolates specialized categories via text prompt.',
    outputTitle: 'Output',
    output: 'Isolates and creates precise 3D views for coordination and visualization instantly.'
  },
  {
    id: 'auditor',
    title: 'Data & Compliance Auditor',
    icon: <ClipboardCheck className="w-8 h-8" strokeWidth={1.5} />,
    description: 'A targeted QA/QC tool for validating architectural intent and schedule readiness.',
    function: 'Instantly flags missing model data (e.g., blank fire ratings) and dimensional code violations (e.g., minimum egress widths).',
    outputTitle: 'Output',
    output: 'Overrides offending geometry in bright red for immediate visual feedback, replacing tedious manual schedule reviews.'
  }
];

export const PyRevitToolbar = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  return (
    <div className="mb-16 border border-white/10 rounded-xl bg-black/40 overflow-hidden font-sans shadow-2xl relative group/toolbar">
      {/* Decorative Header */}
      <div className="bg-[#0f1115] border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-neon-cyan" />
          <h3 className="text-sm font-semibold tracking-wide text-gray-200 flex items-center gap-2">
            AEC Automator <span className="text-gray-600 font-normal">|</span> PyRevit AI Suite
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-neon-cyan transition-colors px-3 py-1 rounded-full border border-white/5 bg-white/5 hover:bg-neon-cyan/10"
          >
            {showInfo ? 'Hide Info' : 'Project Info'}
          </button>
          <a href="https://github.com/K-android/AEC-Automator-PyRevit-Suite" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-neon-cyan transition-colors px-3 py-1 rounded-full border border-white/5 bg-white/5 hover:bg-neon-cyan/10 hidden md:block">
            View Repository
          </a>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col items-center">
        
        {/* Project Info Section */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full max-w-5xl mb-12 space-y-8 overflow-hidden"
            >
              <div className="space-y-4 text-center md:text-left">
                 <p className="text-sm text-gray-400 leading-relaxed max-w-4xl mx-auto md:mx-0">
                   A robust, custom Revit extension built with PyRevit, Python, and the Revit API. This toolset leverages Google Gemini's Large Language Model (LLM) to translate natural language prompts into safe, precise, and predictable BIM workflows.
                 </p>
                 <p className="text-sm text-gray-400 leading-relaxed max-w-4xl mx-auto md:mx-0">
                   Designed for Design Technologists and BIM Coordinators, this suite accelerates day-to-day architectural modeling, enforces data integrity for strict ISO-compliant deliverables, and bridges the gap between conversational AI and hard-coded Revit API transactions.
                 </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-4">
                 <div className="space-y-2 bg-white/5 p-5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                    <div className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase mb-3 flex items-center gap-2">
                      <span className="opacity-50">01.</span> Self-Diagnosing Engine
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">Employs fuzzy-logic matching to auto-correct slight parameter misspellings (e.g., mapping "fire code" to "Fire Rating"). Generates diagnostic reports if a parameter doesn't exist.</p>
                 </div>
                 <div className="space-y-2 bg-white/5 p-5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                    <div className="text-xs font-mono tracking-widest text-[#10B981] uppercase mb-3 flex items-center gap-2">
                      <span className="opacity-50">02.</span> Dynamic Unit Math
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">Automatically extracts units (mm, cm, m, in, ft) from prompts and dynamically converts them to Revit's internal Decimal Feet format on the fly, ensuring safe dimensional scaling.</p>
                 </div>
                 <div className="space-y-2 bg-white/5 p-5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                    <div className="text-xs font-mono tracking-widest text-neon-cyan uppercase mb-3 flex items-center gap-2">
                      <span className="opacity-50">03.</span> Keyword Isolation
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">Prevents accidental bulk-editing by isolating elements via Family Names, Type Names, Marks, and Comments prior to transaction execution.</p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Toolbar UI to match the image */}
        <div className="w-full text-center mb-6">
           <h4 className="text-sm font-mono tracking-widest text-gray-200 uppercase flex items-center justify-center gap-2">
             <Terminal className="w-4 h-4 text-neon-cyan" /> The Toolkit
           </h4>
           <p className="text-xs text-gray-500 mt-2">The suite consists of four specialized tools, structured for maximum predictability and model safety.</p>
        </div>

        <div className="bg-[#353b48] border border-[#2d3436] rounded-md shadow-lg w-full max-w-4xl overflow-hidden flex flex-col items-center">
          <div className="flex w-full divide-x divide-transparent">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-3 py-6 px-2 transition-all duration-200
                  ${activeTool === tool.id 
                    ? 'bg-black/20 text-white' 
                    : 'text-gray-200 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <div className={`transition-transform duration-200 ${activeTool === tool.id ? 'scale-110 text-neon-cyan' : 'text-gray-300'}`}>
                  {tool.icon}
                </div>
                <span className="text-[13px] tracking-wide text-center leading-tight">
                  {tool.title}
                </span>
              </button>
            ))}
          </div>
          
          <div className="w-full text-center pb-2 pt-4 relative">
            <div className="absolute top-0 left-[2%] right-[2%] h-[1px] bg-white/10" />
            <span className="text-[11px] font-mono tracking-wider text-gray-300">Smart_Tools</span>
          </div>
        </div>

        {/* Info Panel Animation */}
        <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {activeTool && (
            <motion.div
              key={activeTool}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 overflow-hidden w-full"
            >
              <div className="p-6 md:p-8 bg-[#0a0a0c] border border-white/10 rounded-lg relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan rounded-l-lg"></div>
                
                {(() => {
                  const activeData = tools.find(t => t.id === activeTool);
                  if (!activeData) return null;
                  
                  return (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-bold text-gray-200 mb-2 flex items-center gap-3">
                          {activeData.title}
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-4xl">
                          {activeData.description}
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                        <div className="space-y-2">
                          <div className="text-[10px] font-mono tracking-widest text-[#3B82F6] uppercase">Function</div>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {activeData.function}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <div className="text-[10px] font-mono tracking-widest text-[#10B981] uppercase">{activeData.outputTitle}</div>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {activeData.output}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>

        {/* Technical Stack & Installation */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full max-w-5xl overflow-hidden"
            >
              <div className="mt-16 grid md:grid-cols-2 gap-8 border-t border-white/10 pt-12">
                  <div className="space-y-4">
                     <h4 className="text-sm font-bold text-gray-200 font-mono tracking-widest uppercase flex items-center gap-2">
                       <Terminal className="w-4 h-4 text-gray-500" /> Technical Stack
                     </h4>
                     <ul className="text-xs text-gray-400 space-y-3 font-mono">
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600 mt-0.5">&gt;</span>
                          <div><span className="text-gray-300">Environment:</span> Revit, PyRevit</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600 mt-0.5">&gt;</span>
                          <div><span className="text-gray-300">Languages:</span> Python, C# (.NET Framework)</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600 mt-0.5">&gt;</span>
                          <div><span className="text-gray-300">API Integration:</span> Autodesk Revit API, Google Gemini 2.5 Flash REST API</div>
                        </li>
                     </ul>
                  </div>
                  <div className="space-y-4">
                     <h4 className="text-sm font-bold text-gray-200 font-mono tracking-widest uppercase flex items-center gap-2">
                       <ClipboardCheck className="w-4 h-4 text-gray-500" /> Installation
                     </h4>
                     <ul className="text-xs text-gray-400 space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-1.5 shrink-0" />
                          <p>Install PyRevit and add the cloned extension folder via settings.</p>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan mt-1.5 shrink-0 shadow-[0_0_8px_rgba(0,243,255,0.5)]" />
                          <p>Securely set <code className="bg-black text-neon-cyan px-1.5 py-0.5 rounded border border-white/10 font-mono text-[10px]">GEMINI_API_KEY</code> in Windows Environment Variables to authenticate the AI.</p>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-1.5 shrink-0" />
                          <p>Reload PyRevit to initialize the ribbon.</p>
                        </li>
                     </ul>
                  </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
