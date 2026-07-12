import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Activity, ChevronRight, Download, Terminal, Database, Code2, Layers, Workflow, CheckCircle2, ChevronDown, ShieldCheck } from 'lucide-react';
import { AECWebAppsCabinet } from './AECWebAppsCabinet';

export default function VDCSection({ 
  bimArsenal, 
  experience, 
  setSelectedArsenalItem, 
  ProjectCard, 
  SoftwareStack,
  setExpandedMedia,
  getDriveId
}: any) {
  const vdcTimelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: vdcScroll } = useScroll({
    target: vdcTimelineRef,
    offset: ["start center", "end center"]
  });
  const vdcScaleY = useSpring(vdcScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (<>
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
                  KARTHIKRAJ NADAR // COMPUTATIONAL DESIGNER &amp; VDC ENGINEER
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
                    href="https://drive.google.com/file/d/1NedDKu8KdPfHPTFxYKGncsrrbla5c5Hc/view?usp=sharing" 
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
                <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-neon-cyan/20 text-right leading-tight z-0">
                  BIM_DATA_STREAM_8829<br/>
                  COORD_SYS: WGS84<br/>
                  LOD: 400
                </div>
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-neon-cyan/20 shadow-[0_0_15px_rgba(0,242,255,0.3)] animate-scan z-20 pointer-events-none" />
                
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full group">
                    <img loading="lazy" 
                      src="https://lh3.googleusercontent.com/d/1KWO0JcGakYmARq4aDTMo6BG7CoK1Kt33" 
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {bimArsenal.map((item) => (<ProjectCard key={`bim-${item.id}`} 
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
                    key={`exp-terminal-${idx}`} 
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
          </div>
    
        </section>

        {/* STAGE 3: Massive Transition Gate Banner */}
        <div id="transition-banner" className="w-full min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#0c0f12] via-[#0d1013] to-white border-b border-gray-100 py-24 px-6">
          {/* Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="text-center z-10 max-w-3xl w-full px-8 py-16 md:py-20 bg-[#0c0f12]/90 backdrop-blur-2xl border border-white/5 rounded-3xl md:rounded-[2.5rem] shadow-[0_35px_80px_-20px_rgba(0,0,0,0.9)] relative overflow-hidden group"
          >
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="inline-block font-mono text-[9px] md:text-xs text-center text-neon-orange tracking-[0.4em] uppercase mb-8 font-bold border border-neon-orange/20 bg-neon-orange/5 px-4 py-1.5 rounded-full"
            >
              --- MULTI-DISCIPLINARY COUPLING ---
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-medium text-white uppercase tracking-widest mb-6 leading-tight font-serif italic"
            >
              ARCHITECTURAL DESIGN <br />
              <span className="font-sans font-light bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-blue-400 tracking-[0.25em] block mt-4 text-2xl md:text-4xl not-italic">PROJECT EXECUTION</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-xs md:text-sm font-mono text-gray-400 max-w-lg mx-auto leading-loose"
            >
              Where computation meets physical space. Connecting the power of automated drawings with sensible, real-world building design.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-12 flex justify-center gap-4 items-center font-sans animate-pulse"
            >
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/30" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase">SCROLL DOWN TO STUDY</span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/30" />
            </motion.div>
          </motion.div>
        </div>
      </>
  );
}
