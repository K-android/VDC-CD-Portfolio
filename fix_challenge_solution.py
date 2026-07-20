import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_challenge = """                        <div className="space-y-4">
                          <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black" : "text-neon-orange"}`}>
                            // 05 . THE CHALLENGE
                          </div>
                          <p className={`text-sm leading-loose transition-colors duration-700 ${isArch ? "text-gray-700 italic" : "text-gray-400 font-mono"}`}>
                            {selectedArsenalItem.details.challenge}
                          </p>
                        </div>"""

new_challenge = """                        <div className="space-y-4">
                          <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black font-bold" : "text-neon-orange"}`}>
                            // 05 . THE CHALLENGE
                          </div>
                          <p className={`text-xs tracking-wide leading-relaxed transition-colors duration-700 ${isArch ? "text-gray-700 italic font-serif" : "text-zinc-400 font-mono"}`}>
                            {selectedArsenalItem.details.challenge}
                          </p>
                        </div>"""

app = app.replace(old_challenge, new_challenge)

old_solution = """                        <div className="space-y-4">
                          <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black" : "text-neon-cyan"}`}>
                            // 06 . THE SOLUTION
                          </div>
                          <p className={`text-sm leading-loose transition-colors duration-700 ${isArch ? "text-gray-700 italic" : "text-gray-400 font-mono"}`}>
                            {selectedArsenalItem.details.solution}
                          </p>
                        </div>"""

new_solution = """                        <div className="space-y-4">
                          <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black font-bold" : "text-neon-cyan"}`}>
                            // 06 . THE SOLUTION
                          </div>
                          <p className={`text-xs tracking-wide leading-relaxed transition-colors duration-700 ${isArch ? "text-gray-700 italic font-serif" : "text-zinc-400 font-mono"}`}>
                            {selectedArsenalItem.details.solution}
                          </p>
                        </div>"""

app = app.replace(old_solution, new_solution)

with open('src/App.tsx', 'w') as f:
    f.write(app)
