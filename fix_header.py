import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_header_links = """        <div className="hidden md:flex flex-1 justify-center gap-10">
          <button onClick={() => document.getElementById("landing")?.scrollIntoView({ behavior: "smooth" })} className="relative group text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">
            Home
          </button>
          <button onClick={() => document.getElementById("vdc-section")?.scrollIntoView({ behavior: "smooth" })} className="relative group text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors duration-300">
            Workflows
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#6366F1] transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => document.getElementById("vdc-apps")?.scrollIntoView({ behavior: "smooth" })} className="relative group text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors duration-300">
            Apps / Web
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#6366F1] transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" })} className="relative group text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">
            Bio
          </button>
        </div>"""

new_header_links = """        <div className="hidden md:flex flex-1 justify-center gap-10">
          <button onClick={() => document.getElementById("landing")?.scrollIntoView({ behavior: "smooth" })} className="relative group text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">
            Home
          </button>
          <button onClick={() => document.getElementById("vdc-section")?.scrollIntoView({ behavior: "smooth" })} className="relative group text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors duration-300">
            Workflows
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#6366F1] transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => document.getElementById("arch-section")?.scrollIntoView({ behavior: "smooth" })} className="relative group text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors duration-300">
            Design Projects
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#6366F1] transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => document.getElementById("vdc-apps")?.scrollIntoView({ behavior: "smooth" })} className="relative group text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors duration-300">
            Apps / Web
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#6366F1] transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" })} className="relative group text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">
            Contact & Bio
          </button>
        </div>"""

app = app.replace(old_header_links, new_header_links)

with open('src/App.tsx', 'w') as f:
    f.write(app)
