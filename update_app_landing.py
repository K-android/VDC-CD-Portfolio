import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_buttons = """              <button 
                onClick={() => {
                  const el = document.getElementById("terminal");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold font-sans hover:bg-white/10 transition-colors duration-300"
              >
                View Bio
              </button>"""

new_buttons = """              <button 
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
              </a>"""

app = app.replace(old_buttons, new_buttons)

# Modify the other buttons to have the new hover state if requested? The user said "exclusively for your active hover states, small button pills, or custom selection indicators."
# Let's change `hover:text-neon-cyan` or `hover:bg-white/10` to this new accent for primary buttons too?
# Just updating App.tsx hover text:
app = app.replace('hover:text-neon-cyan', 'hover:text-[#6366F1]')
app = app.replace('hover:border-neon-cyan', 'hover:border-[#6366F1]')

with open('src/App.tsx', 'w') as f:
    f.write(app)
