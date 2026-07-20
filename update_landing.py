import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

new_hero_section = """        <section id="landing" className={`min-h-screen h-[100dvh] md:h-screen w-full relative flex flex-col justify-center bg-[#0a0a0c]`}>
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none" />
          
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col justify-center h-full pt-16">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-sans font-black tracking-tighter text-white leading-[0.95] mb-6">
              Automating Architecture.<br/>
              <span className="text-gray-400">Engineering Compliant</span><br/>
              <span className="text-[#3B82F6]">BIM Pipelines.</span>
            </h1>
            
            <p className="text-gray-400 font-sans text-base md:text-xl font-medium max-w-2xl leading-relaxed mb-12">
              Developing custom Python and Dynamo workflows to streamline database extraction, model validation, and scalable ISO 19650 compliance.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-16">
              <button 
                onClick={() => {
                  const el = document.getElementById("vdc-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-[#3B82F6] text-white rounded-full font-bold font-sans hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                View Automation Tools
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById("arch-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold font-sans hover:bg-white/10 transition-colors duration-300"
              >
                View Design Projects
              </button>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl md:text-5xl font-black text-[#3B82F6] tracking-tighter mb-1">11+</div>
                <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">Automation Scripts</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-black text-[#3B82F6] tracking-tighter mb-1">100%</div>
                <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">ISO 19650 Compliant</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-black text-[#3B82F6] tracking-tighter mb-1">Python</div>
                <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">Dynamo & APIs</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-black text-[#3B82F6] tracking-tighter mb-1">8M+</div>
                <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">Sq.Ft Modeled & Coordinated</div>
              </div>
            </div>
          </div>
        </section>"""

pattern = r'<section id="landing".*?</section>'
app = re.sub(pattern, new_hero_section, app, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(app)
