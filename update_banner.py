import re
with open('src/components/VDCSection.tsx', 'r') as f:
    vdc = f.read()

old_banner = r'        \{\/\* STAGE 3: Massive Transition Gate Banner \*\/\}[\s\S]*?(?=      \<\/)'

new_banner = """        {/* STAGE 3: Massive Transition Gate Banner */}
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
"""

vdc = re.sub(old_banner, new_banner, vdc)

with open('src/components/VDCSection.tsx', 'w') as f:
    f.write(vdc)
