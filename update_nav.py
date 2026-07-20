import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

nav_pattern = r'<header className={`fixed top-0.*?<\/header>'
new_nav = """      <header className={`fixed top-0 w-full z-[60] backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center bg-[#0a0a0c]/80`}>
        <div className="flex items-center gap-1">
          <span className="font-sans font-bold text-lg md:text-xl text-white tracking-tight">Karthikraj</span>
          <span className="font-sans font-medium text-lg md:text-xl text-[#FF2E63] tracking-tight">Nadar</span>
        </div>
        
        <div className="hidden md:flex flex-1 justify-center gap-8">
          <button onClick={() => document.getElementById("landing")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Home</button>
          <button onClick={() => document.getElementById("vdc-section")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Software Tools</button>
          <button onClick={() => document.getElementById("arch-section")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Design Projects</button>
        </div>
        
        <div>
          <button className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors">
            Get In Touch
          </button>
        </div>
      </header>"""

app = re.sub(nav_pattern, new_nav, app, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(app)
