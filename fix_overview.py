import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_overview = """                        <div className="space-y-4">
                          <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black" : "text-neon-cyan"}`}>
                            // 04 . PROJECT OVERVIEW
                          </div>
                          <p className={`text-sm leading-loose transition-colors duration-700 ${isArch ? "text-gray-700 italic" : "text-gray-400 font-mono"}`}>
                            {selectedArsenalItem.details.overview}
                          </p>
                        </div>"""

new_overview = """                        <div className="space-y-4">
                          <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black font-bold" : "text-neon-cyan"}`}>
                            // 04 . PROJECT OVERVIEW
                          </div>
                          <p className={`text-xs tracking-wide leading-relaxed transition-colors duration-700 ${isArch ? "text-gray-700 italic font-serif" : "text-zinc-400 font-mono"}`}>
                            {selectedArsenalItem.details.overview}
                          </p>
                        </div>"""

app = app.replace(old_overview, new_overview)

with open('src/App.tsx', 'w') as f:
    f.write(app)
