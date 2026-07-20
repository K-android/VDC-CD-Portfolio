import re

with open('src/components/VDCSection.tsx', 'r') as f:
    content = f.read()

old_tier3 = """              {/* Tier 3: Experimental Tools */}
              <div>
                <h3 className="text-xl font-sans font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                  <span className="text-gray-400 font-mono text-xs uppercase tracking-widest border border-gray-600/50 bg-gray-800/50 px-2 py-0.5 rounded-sm">Tier 3</span>
                  Automation Lab
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {bimArsenal.filter((item: any) => ["BIM_08", "BIM_07", "BIM_01", "BIM_05"].includes(item.id)).map((item: any) => (
                    <div 
                      key={`tier3-${item.id}`}
                      onClick={() => setSelectedArsenalItem(item)}
                      className="group cursor-pointer border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 p-5 rounded-xl transition-all duration-300 flex flex-col"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-${item.color}/10 text-${item.color}`}>
                          {item.icon}
                        </div>
                        <h4 className="font-sans font-bold text-sm text-gray-200 group-hover:text-white leading-tight">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-400 group-hover:text-gray-300 line-clamp-2 mt-auto">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>"""

new_tier3 = """              {/* Tier 3: Experimental Tools */}
              <div>
                <h3 className="text-xl font-sans font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                  <span className="text-gray-400 font-mono text-xs uppercase tracking-widest border border-gray-600/50 bg-gray-800/50 px-2 py-0.5 rounded-sm">Tier 3</span>
                  Automation Lab // Production Micro-Cabinet
                </h3>
                <div className="flex flex-col border border-white/10 rounded-xl bg-[#0a0a0c] overflow-hidden">
                  {bimArsenal.filter((item: any) => ["BIM_08", "BIM_07", "BIM_01", "BIM_05"].includes(item.id)).map((item: any, index: number, arr: any[]) => (
                    <div 
                      key={`tier3-${item.id}`}
                      onClick={() => setSelectedArsenalItem(item)}
                      className={`group cursor-pointer p-5 flex items-start gap-4 hover:bg-white/5 transition-colors ${index !== arr.length - 1 ? 'border-b border-white/5' : ''}`}
                    >
                      <div className="mt-1">
                        <Code2 className="w-4 h-4 text-gray-500 group-hover:text-neon-cyan transition-colors" />
                      </div>
                      <div className="flex flex-col gap-1.5 flex-1">
                        <h4 className="font-sans font-bold text-sm text-gray-200 group-hover:text-white transition-colors">
                          {item.title}
                        </h4>
                        <div className="text-[9px] font-mono tracking-widest text-[#6366F1] uppercase">
                          {item.domain}
                        </div>
                        <p className="text-xs text-gray-400 font-mono leading-relaxed mt-1">
                          {item.intel}
                        </p>
                      </div>
                      <div>
                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>"""

content = content.replace(old_tier3, new_tier3)

with open('src/components/VDCSection.tsx', 'w') as f:
    f.write(content)
