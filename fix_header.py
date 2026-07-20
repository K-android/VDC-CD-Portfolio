import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_header_left = """        <div className="flex items-center gap-6">
          <div className="flex items-center font-sans text-lg md:text-xl font-bold tracking-tight text-white uppercase">
            <span className="text-[#00f2ff] font-mono text-xl">{`>`}</span>
            <span className="text-[#00f2ff] font-mono text-xl -ml-0.5 mt-2">{`_`}</span>
            <span className="ml-2">KARTHIKRAJ_<span className="text-[#3B82F6]">NADAR</span></span>
          </div>
          <button 
             onClick={() => document.getElementById("arch-section")?.scrollIntoView({ behavior: "smooth" })} 
             className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f2ff]/30 bg-[#00f2ff]/10 text-[#00f2ff] text-[10px] font-mono tracking-widest uppercase hover:bg-[#00f2ff]/20 transition-colors"
          >
             <Box className="w-3 h-3" />
             Portal to Arch_Studio
          </button>
        </div>"""

new_header_left = """        <div className="flex items-center gap-6">
          <div className="flex items-center font-sans text-lg md:text-xl font-bold tracking-tight text-white uppercase">
            <span className="text-[#00f2ff] font-mono text-xl">{`>`}</span>
            <span className="text-[#00f2ff] font-mono text-xl -ml-0.5 mt-2">{`_`}</span>
            <span className="ml-2">KARTHIKRAJ_<span className="text-[#3B82F6]">NADAR</span></span>
          </div>
        </div>"""

old_header_mid = """        <div className="hidden md:flex flex-1 justify-center gap-8">
          <button onClick={() => document.getElementById("landing")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors">Home</button>
          <button onClick={() => document.getElementById("vdc-section")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors">Workflows</button>
          <button onClick={() => document.getElementById("vdc-apps")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors">Apps / Web</button>
          <button onClick={() => document.getElementById("arch-section")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors">Design Projects</button>
          <button onClick={() => document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors">Bio</button>
        </div>"""

new_header_mid = """        <div className="hidden md:flex flex-1 justify-center gap-8">
          <button onClick={() => document.getElementById("landing")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors">Home</button>
          <button onClick={() => document.getElementById("vdc-section")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors">Workflows</button>
          <button onClick={() => document.getElementById("vdc-apps")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors">Apps / Web</button>
          <button onClick={() => document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors">Bio</button>
        </div>"""

old_header_right = """        <div>
          <button onClick={() => document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" })} className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors">
            Get In Touch
          </button>
        </div>"""

new_header_right = """        <div>
          <button 
             onClick={() => document.getElementById("arch-section")?.scrollIntoView({ behavior: "smooth" })} 
             className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full border border-[#00f2ff]/30 bg-[#00f2ff]/10 text-[#00f2ff] text-xs font-mono tracking-widest uppercase hover:bg-[#00f2ff]/20 transition-colors"
          >
             <Box className="w-4 h-4" />
             Portal to Arch_Studio
          </button>
        </div>"""

app = app.replace(old_header_left, new_header_left)
app = app.replace(old_header_mid, new_header_mid)
app = app.replace(old_header_right, new_header_right)

with open('src/App.tsx', 'w') as f:
    f.write(app)
