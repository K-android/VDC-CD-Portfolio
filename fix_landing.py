import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# 1. Update Buttons
old_buttons = """            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-16">
              <button 
                onClick={() => {
                  const el = document.getElementById("vdc-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-[#3B82F6] text-white rounded-full font-bold font-sans hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                View Automation Tools
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById("arch-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold font-sans hover:bg-white/10 transition-colors duration-300"
              >
                View Design Projects
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById("terminal");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold font-sans hover:bg-[#6366F1]/10 hover:border-[#6366F1]/30 hover:text-[#6366F1] transition-colors duration-300"
              >
                View Bio
              </button>
              <a 
                href="https://drive.google.com/file/d/1NedDKu8KdPfHPTFxYKGncsrrbla5c5Hc/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold font-sans hover:bg-[#6366F1]/10 hover:border-[#6366F1]/30 hover:text-[#6366F1] transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </div>"""

new_buttons = """            <div className="flex flex-wrap items-center gap-4 mb-16">
              <button 
                onClick={() => {
                  const el = document.getElementById("vdc-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-[#3B82F6] text-white rounded-full font-bold font-sans hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                View Automation Tools
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById("arch-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 bg-transparent border border-white/10 text-zinc-300 rounded-full font-bold font-sans hover:border-indigo-500 hover:text-white transition-colors duration-300"
              >
                View Design Projects
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById("terminal");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 bg-transparent border border-white/10 text-zinc-300 rounded-full font-bold font-sans hover:border-indigo-500 hover:text-white transition-colors duration-300"
              >
                View Contact & Bio
              </button>
              <a 
                href="https://drive.google.com/file/d/1NedDKu8KdPfHPTFxYKGncsrrbla5c5Hc/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-transparent border border-white/10 text-zinc-300 rounded-full font-bold font-sans hover:border-indigo-500 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Download Resume</span>
              </a>
            </div>"""

app = app.replace(old_buttons, new_buttons)

# 2. Update Title and Padding
old_title_container = 'className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col justify-center h-full pt-16"'
new_title_container = 'className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col justify-center h-full pt-28"'

old_title = 'className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-sans font-black tracking-tighter text-white leading-[0.95] mb-6"'
new_title = 'className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-sans font-black tracking-tighter text-white leading-[0.95] mb-6"'

app = app.replace(old_title_container, new_title_container)
app = app.replace(old_title, new_title)

with open('src/App.tsx', 'w') as f:
    f.write(app)
