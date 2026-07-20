import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_header = """        <div className="hidden md:flex flex-1 justify-center gap-8">
          <button onClick={() => document.getElementById("landing")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Home</button>
          <button onClick={() => document.getElementById("vdc-section")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Software Tools</button>
          <button onClick={() => document.getElementById("arch-section")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Design Projects</button>
        </div>"""

new_header = """        <div className="hidden md:flex flex-1 justify-center gap-8">
          <button onClick={() => document.getElementById("landing")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors">Home</button>
          <button onClick={() => document.getElementById("vdc-section")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors">Software Tools</button>
          <button onClick={() => document.getElementById("arch-section")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors">Design Projects</button>
          <button onClick={() => document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors">Bio</button>
        </div>"""

app = app.replace(old_header, new_header)

with open('src/App.tsx', 'w') as f:
    f.write(app)
