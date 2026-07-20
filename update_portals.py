import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# 1. Remove desktop button
old_desktop_btn = """          <button 
             onClick={() => document.getElementById("arch-section")?.scrollIntoView({ behavior: "smooth" })} 
             className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full border border-[#00f2ff]/30 bg-[#00f2ff]/10 text-[#00f2ff] text-xs font-mono tracking-widest uppercase hover:bg-[#00f2ff]/20 transition-colors"
          >
             <Box className="w-4 h-4" />
             Portal to Arch_Studio
          </button>"""

app = app.replace(old_desktop_btn, "")

# 2. Remove mobile jump portal
old_mobile_portal = """              <div className="pb-6 flex flex-col items-center gap-3.5 w-full">
                <div className="text-[10px] opacity-40 uppercase tracking-widest font-mono">Jump Portal</div>
                <button 
                  onClick={() => {
                    const el = document.getElementById(isHeaderArch ? "vdc-section" : "arch-section");
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className={`w-full max-w-[220px] px-5 py-2 border font-mono text-[9px] uppercase tracking-widest transition-all duration-500 rounded-sm shadow text-center ${
                    isHeaderArch 
                    ? "bg-black text-white border-black" 
                    : "bg-neon-cyan/10 text-neon-cyan border-white/10"
                  }`}
                >
                  {isHeaderArch ? "PORTAL TO VDC_CORE" : "PORTAL TO ARCH_STUDIO"}
                </button>
              </div>"""

app = app.replace(old_mobile_portal, "")

# 3. Add the floating toggle
# We can add it just above `{/* Progress Indicator */}`
old_progress = "      {/* Progress Indicator */}"
floating_toggle = """      {/* Floating Mode Selector */}
      <div className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center p-1.5 rounded-full backdrop-blur-xl border shadow-2xl transition-all duration-700 ${
        isArch ? "bg-white/80 border-gray-300" : "bg-[#0a0a0c]/80 border-white/10"
      }`}>
        <button 
          onClick={() => {
            const el = document.getElementById("vdc-section");
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`relative flex items-center justify-center px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-mono font-bold tracking-[0.15em] transition-all duration-500 z-10 ${
            !isArch ? "text-black" : "text-gray-500 hover:text-black"
          }`}
        >
          {!isArch && (
            <motion.div 
              layoutId="mode-pill"
              className="absolute inset-0 bg-neon-cyan rounded-full -z-10 shadow-[0_0_15px_rgba(0,242,255,0.4)]"
            />
          )}
          <Terminal className="w-3.5 h-3.5 mr-2" />
          VDC_DASHBOARD
        </button>
        
        <div className={`w-[1px] h-4 md:h-5 transition-colors duration-700 mx-1 ${isArch ? "bg-gray-300" : "bg-white/20"}`} />
        
        <button 
          onClick={() => {
            const el = document.getElementById("arch-section");
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`relative flex items-center justify-center px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-mono font-bold tracking-[0.15em] transition-all duration-500 z-10 ${
            isArch ? "text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          {isArch && (
            <motion.div 
              layoutId="mode-pill"
              className="absolute inset-0 bg-black rounded-full -z-10 shadow-lg"
            />
          )}
          <Box className="w-3.5 h-3.5 mr-2" />
          ARCH_STUDIO
        </button>
      </div>

      {/* Progress Indicator */}"""

app = app.replace(old_progress, floating_toggle)

with open('src/App.tsx', 'w') as f:
    f.write(app)
