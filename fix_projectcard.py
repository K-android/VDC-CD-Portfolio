import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_project_card = """        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className={`text-xl md:text-2xl font-medium tracking-tight mb-1 transition-colors duration-700 ${isArch ? "text-black font-serif italic" : "text-white font-sans"}`}>
              {item.title}
            </h4>
            {item.role && (
              <div className={`text-[10px] md:text-[11px] font-mono tracking-widest uppercase transition-colors duration-700 ${isArch ? "text-gray-400" : "text-neon-orange"}`}>
                {item.role}
              </div>
            )}
          </div>
          {item.category && (
            <div className="flex items-center gap-2">
              <span className={`text-[8px] md:text-[9px] font-mono px-2 py-1 border transition-colors duration-700 ${isArch ? "border-black text-black" : "border-white/10 text-neon-cyan"}`}>
                {item.category}
              </span>
            </div>
          )}
        </div>"""

new_project_card = """        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col gap-3">
            <h4 className={`text-xl md:text-2xl font-medium tracking-tight transition-colors duration-700 ${isArch ? "text-black font-serif italic" : "text-white font-sans"}`}>
              {item.title}
            </h4>
            
            <div className="flex flex-col gap-1.5">
              {item.role && (
                <div className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-700 ${isArch ? "text-gray-500" : "text-gray-400"}`}>
                  {item.role}
                </div>
              )}
              {item.metric && !isArch && (
                <div className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-700 ${isArch ? "text-gray-500" : "text-neon-cyan"}`}>
                  {item.metric}
                </div>
              )}
            </div>
          </div>
          {item.category && (
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <span className={`text-[8px] md:text-[9px] font-mono px-2 py-1 border transition-colors duration-700 ${isArch ? "border-black text-black" : "border-white/10 text-neon-cyan"}`}>
                {item.category}
              </span>
            </div>
          )}
        </div>"""

app = app.replace(old_project_card, new_project_card)

with open('src/App.tsx', 'w') as f:
    f.write(app)
