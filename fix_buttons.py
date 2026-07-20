import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# 1. Add View Bio button
old_buttons = """              <button 
                onClick={() => {
                  const el = document.getElementById("arch-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold font-sans hover:bg-white/10 transition-colors duration-300"
              >
                View Design Projects
              </button>"""

new_buttons = """              <button 
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
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold font-sans hover:bg-white/10 transition-colors duration-300"
              >
                View Bio
              </button>"""

app = app.replace(old_buttons, new_buttons)

# 2. Fix Get In Touch button
old_get_in_touch = """          <button className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors">
            Get In Touch
          </button>"""

new_get_in_touch = """          <button onClick={() => document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" })} className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors">
            Get In Touch
          </button>"""

app = app.replace(old_get_in_touch, new_get_in_touch)

with open('src/App.tsx', 'w') as f:
    f.write(app)
