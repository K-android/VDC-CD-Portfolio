import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Activity, ChevronRight, Download, Code2, Terminal, Database, Layers, Workflow, CheckCircle2, ChevronDown, ShieldCheck } from 'lucide-react';

export default function ArchSection({ 
  archArsenal, 
  experience, 
  setSelectedArsenalItem, 
  ProjectCard, 
  SoftwareStack,
  setExpandedMedia,
  getDriveId
}: any) {
  const archTimelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: archScroll } = useScroll({
    target: archTimelineRef,
    offset: ["start center", "end center"]
  });
  const archScaleY = useSpring(archScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (<>
<section id="arch-section" className="bg-white text-gray-900 font-serif w-full py-20 px-6 md:px-12 border-b border-gray-100 relative">
          <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
            
            {/* Arch Sub-Hero Header Grid */}
            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center font-serif">
              <div className="flex flex-col text-left font-serif">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-500 text-[8px] md:text-[10px] font-mono uppercase tracking-widest mb-4 w-fit whitespace-nowrap">
                  <Activity className="w-3 h-3 shrink-0 animate-pulse" /> <span className="pr-1 font-mono">Portfolio: Architectural Design</span>
                </div>
                
                <div className="mb-2 font-mono text-[10px] md:text-sm uppercase tracking-widest text-gray-400">
                  Karthikraj Nadar, Architect &amp; Spatial Visionary.
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
                    href="https://drive.google.com/file/d/1NedDKu8KdPfHPTFxYKGncsrrbla5c5Hc/view?usp=sharing" 
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
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/10 z-20 pointer-events-none" />
                
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden group/hero">
                  <img loading="lazy" 
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
                {archArsenal.filter(item => item.category !== 'Fabrication').map((item) => (<ProjectCard key={`arch-nf-${item.id}`} 
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
                {archArsenal.filter(item => item.category === 'Fabrication').map((item) => (<ProjectCard key={`arch-fab-${item.id}`} 
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
                      key={`exp-arch-${idx}`} 
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
        </section></>);}
