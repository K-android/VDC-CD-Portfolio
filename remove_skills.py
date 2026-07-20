import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

skills_matrix = """                  <div className="space-y-4 col-span-1 md:col-span-2">
                    <div className={`text-xs uppercase tracking-widest font-bold ${isArch ? "text-black" : "text-neon-cyan"}`}>Skills Matrix</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className={`flex flex-col gap-2 p-3 border transition-colors duration-700 ${isArch ? "border-gray-200 bg-gray-50/50" : "border-white/10 bg-[#0a0a0c]/80"}`}>
                         <Layers className={`w-5 h-5 ${isArch ? "text-gray-600" : "text-neon-cyan"}`} />
                         <span className={`text-xs font-bold ${isArch ? "text-black" : "text-gray-200"}`}>BIM Modeling</span>
                         <span className={`text-[11px] leading-tight ${isArch ? "text-gray-500" : "text-gray-400"}`}>Revit, Navisworks, Vectorworks</span>
                      </div>
                      <div className={`flex flex-col gap-2 p-3 border transition-colors duration-700 ${isArch ? "border-gray-200 bg-gray-50/50" : "border-white/10 bg-[#0a0a0c]/80"}`}>
                         <Terminal className={`w-5 h-5 ${isArch ? "text-gray-600" : "text-neon-cyan"}`} />
                         <span className={`text-xs font-bold ${isArch ? "text-black" : "text-gray-200"}`}>Automation</span>
                         <span className={`text-[11px] leading-tight ${isArch ? "text-gray-500" : "text-gray-400"}`}>Python, Dynamo, Revit API</span>
                      </div>
                      <div className={`flex flex-col gap-2 p-3 border transition-colors duration-700 ${isArch ? "border-gray-200 bg-gray-50/50" : "border-white/10 bg-[#0a0a0c]/80"}`}>
                         <Component className={`w-5 h-5 ${isArch ? "text-gray-600" : "text-neon-cyan"}`} />
                         <span className={`text-xs font-bold ${isArch ? "text-black" : "text-gray-200"}`}>Computational</span>
                         <span className={`text-[11px] leading-tight ${isArch ? "text-gray-500" : "text-gray-400"}`}>Rhino, Grasshopper (Wallacei, Galapagos, Ladybug Tools, Rhino.Inside)</span>
                      </div>
                      <div className={`flex flex-col gap-2 p-3 border transition-colors duration-700 ${isArch ? "border-gray-200 bg-gray-50/50" : "border-white/10 bg-[#0a0a0c]/80"}`}>
                         <Database className={`w-5 h-5 ${isArch ? "text-gray-600" : "text-neon-cyan"}`} />
                         <span className={`text-xs font-bold ${isArch ? "text-black" : "text-gray-200"}`}>VDC & Data</span>
                         <span className={`text-[11px] leading-tight ${isArch ? "text-gray-500" : "text-gray-400"}`}>ISO 19650, 5D Harvesting</span>
                      </div>
                      <div className={`flex flex-col gap-2 p-3 border transition-colors duration-700 ${isArch ? "border-gray-200 bg-gray-50/50" : "border-white/10 bg-[#0a0a0c]/80"}`}>
                         <Camera className={`w-5 h-5 ${isArch ? "text-gray-600" : "text-neon-cyan"}`} />
                         <span className={`text-xs font-bold ${isArch ? "text-black" : "text-gray-200"}`}>Visualization</span>
                         <span className={`text-[11px] leading-tight ${isArch ? "text-gray-500" : "text-gray-400"}`}>D5 Render, Enscape, AI Imagery</span>
                      </div>
                      <div className={`flex flex-col gap-2 p-3 border transition-colors duration-700 ${isArch ? "border-gray-200 bg-gray-50/50" : "border-white/10 bg-[#0a0a0c]/80"}`}>
                         <Code className={`w-5 h-5 ${isArch ? "text-gray-600" : "text-neon-cyan"}`} />
                         <span className={`text-xs font-bold ${isArch ? "text-black" : "text-gray-200"}`}>Web Dev</span>
                         <span className={`text-[11px] leading-tight ${isArch ? "text-gray-500" : "text-gray-400"}`}>React, TypeScript, Tailwind</span>
                      </div>
                    </div>
                  </div>"""

app = app.replace(skills_matrix, "")

with open('src/App.tsx', 'w') as f:
    f.write(app)
