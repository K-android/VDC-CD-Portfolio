import re

with open('src/components/VDCSection.tsx', 'r') as f:
    content = f.read()

replacement = '''        {/* STAGE 3: Massive Transition Gate Banner */}
        <div id="transition-banner" className="w-full min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden bg-white border-b border-gray-100 py-24 px-4">
          
          {/* Base White Layer with Blueprint Grid */}
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" 
               style={{ 
                 backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                 backgroundSize: '40px 40px' 
               }} 
          />

          {/* High-speed structural grid of thin vertical lines (White Layer) */}
          <div className="absolute inset-0 flex z-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div 
                key={i}
                className="flex-1 border-r border-black/[0.04] h-full origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: i * 0.03 + 0.5, duration: 0.8, ease: "circOut" }}
              />
            ))}
          </div>

          {/* Content Layer (White Background Version) */}
          <div className="text-center z-20 max-w-3xl w-full relative pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="inline-block font-sans text-[9px] md:text-xs text-center text-blue-600 tracking-[0.4em] mb-8 font-bold border border-blue-600/20 bg-blue-600/5 px-4 py-1.5 rounded-full"
            >
              --- MULTI-DISCIPLINARY COUPLING ---
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-4xl md:text-6xl font-medium text-black tracking-widest mb-6 leading-tight font-serif italic"
            >
              ARCHITECTURAL DESIGN <br />
              <span className="font-sans font-light bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 tracking-[0.25em] block mt-4 text-2xl md:text-4xl not-italic">PROJECT EXECUTION</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 1.0, duration: 1 }}
              className="text-xs md:text-sm font-sans text-gray-500 max-w-lg mx-auto leading-loose"
            >
              Where computation meets physical space. Connecting the power of automated drawings with sensible, real-world building design.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-12 flex justify-center gap-4 items-center font-sans animate-pulse"
            >
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-black/20" />
              <span className="text-[10px] font-sans tracking-[0.3em] text-black/40 font-bold">SCROLL DOWN TO STUDY</span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-black/20" />
            </motion.div>
          </div>

          {/* Dark Charcoal Layer that clips out horizontally */}
          <motion.div 
            className="absolute inset-0 bg-[#0a0a0c] z-30 flex items-center justify-center overflow-hidden pointer-events-none"
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            whileInView={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.17, 1] }} 
          >
            {/* Ambient Background Glow (Dark) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-[#3B82F6]/10 blur-[120px] rounded-full" />
            
            {/* High-speed structural grid of thin vertical lines (Dark Layer) */}
            <div className="absolute inset-0 flex z-0">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex-1 border-r border-white/[0.03] h-full" />
              ))}
            </div>

            {/* Ghosted Outline Text inside the dark layer */}
            <div className="text-center z-20 max-w-3xl w-full relative px-4 opacity-50 blur-[2px]">
              <div className="inline-block font-sans text-[9px] md:text-xs text-center text-neon-orange tracking-[0.4em] mb-8 font-bold border border-neon-orange/20 bg-neon-orange/5 px-4 py-1.5 rounded-full">
                --- MULTI-DISCIPLINARY COUPLING ---
              </div>

              <h2 className="text-4xl md:text-6xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20 tracking-widest mb-6 leading-tight font-serif italic">
                ARCHITECTURAL DESIGN <br />
                <span className="font-sans font-light bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-blue-400 tracking-[0.25em] block mt-4 text-2xl md:text-4xl not-italic">PROJECT EXECUTION</span>
              </h2>

              <p className="text-xs md:text-sm font-sans text-gray-400 max-w-lg mx-auto leading-loose">
                Where computation meets physical space. Connecting the power of automated drawings with sensible, real-world building design.
              </p>
            </div>
          </motion.div>
        </div>
      </>'''

start_idx = content.find('{/* STAGE 3: Massive Transition Gate Banner */}')
end_idx = content.find('</>', start_idx)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + replacement + content[end_idx+3:]
    with open('src/components/VDCSection.tsx', 'w') as f:
        f.write(content)
