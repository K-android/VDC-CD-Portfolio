import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# Replace header left
old_header_left = """        <div className="flex items-center gap-6 pl-2 md:pl-4">
          <div className="flex items-center font-sans text-lg md:text-xl font-bold tracking-tight text-white uppercase">
            <span className="text-[#00f2ff] font-mono font-normal text-xl opacity-80">{`>`}</span>
            <span className="text-[#00f2ff] font-mono font-normal text-xl -ml-0.5 mt-2 opacity-80">{`_`}</span>
            <span className="ml-3">KARTHIKRAJ_<span className="text-[#3B82F6]">NADAR</span></span>
          </div>
        </div>"""

new_header_left = """        <div className="flex items-center gap-6 pl-4 md:pl-6 lg:pl-8">
          <div className="flex items-center font-sans text-lg md:text-xl font-bold tracking-tight text-white uppercase">
            <span className="text-[#00f2ff] font-mono font-light text-xl opacity-70">{`>`}</span>
            <span className="text-[#00f2ff] font-mono font-light text-xl -ml-0.5 mt-2 opacity-70">{`_`}</span>
            <span className="ml-3 tracking-wide">KARTHIKRAJ_<span className="text-[#3B82F6]">NADAR</span></span>
          </div>
        </div>"""

app = app.replace(old_header_left, new_header_left)


# Replace header middle
old_header_mid = """        <div className="hidden md:flex flex-1 justify-center gap-10">
          <button onClick={() => document.getElementById("landing")?.scrollIntoView({ behavior: "smooth" })} className="relative group text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#6366F1] transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => document.getElementById("vdc-section")?.scrollIntoView({ behavior: "smooth" })} className="relative group text-sm font-medium text-gray-300 hover:text-[#6366F1] transition-colors duration-300">
            Workflows
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#6366F1] transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => document.getElementById("vdc-apps")?.scrollIntoView({ behavior: "smooth" })} className="relative group text-sm font-medium text-gray-300 hover:text-[#6366F1] transition-colors duration-300">
            Apps / Web
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#6366F1] transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" })} className="relative group text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300">
            Bio
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#6366F1] transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>"""

new_header_mid = """        <div className="hidden md:flex flex-1 justify-center gap-10">
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

app = app.replace(old_header_mid, new_header_mid)

with open('src/App.tsx', 'w') as f:
    f.write(app)
