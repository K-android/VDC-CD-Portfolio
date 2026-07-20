import re

with open('src/components/VDCSection.tsx', 'r') as f:
    content = f.read()

old_tier1 = """              {/* Tier 1: Heavy Hitters */}
              <div>
                <h3 className="text-xl font-sans font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                  <span className="text-[#3B82F6] font-mono text-xs uppercase tracking-widest border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-2 py-0.5 rounded-sm">Tier 1</span>
                  Hero Modules
                </h3>"""

new_tier1 = """              {/* Tier 1: Heavy Hitters */}
              <div>"""

content = content.replace(old_tier1, new_tier1)

old_tier2 = """              {/* Tier 2: Core Data Stack */}
              <div>
                <h3 className="text-xl font-sans font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                  <span className="text-[#00f2ff] font-mono text-xs uppercase tracking-widest border border-[#00f2ff]/30 bg-[#00f2ff]/10 px-2 py-0.5 rounded-sm">Tier 2</span>
                  Core Data Stack
                </h3>"""

new_tier2 = """              {/* Tier 2: Core Data Stack */}
              <div>"""

content = content.replace(old_tier2, new_tier2)

old_tier3 = """              {/* Tier 3: Experimental Tools */}
              <div>
                <h3 className="text-xl font-sans font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                  <span className="text-gray-400 font-mono text-xs uppercase tracking-widest border border-gray-600/50 bg-gray-800/50 px-2 py-0.5 rounded-sm">Tier 3</span>
                  Automation Lab // Production Micro-Cabinet
                </h3>"""

new_tier3 = """              {/* Tier 3: Experimental Tools */}
              <div>
                <div className="text-[11px] font-mono tracking-widest text-gray-500 uppercase mb-4 border-b border-white/5 pb-2">
                  // EXPERIMENTAL AUTOMATION LAB
                </div>"""

content = content.replace(old_tier3, new_tier3)

with open('src/components/VDCSection.tsx', 'w') as f:
    f.write(content)
