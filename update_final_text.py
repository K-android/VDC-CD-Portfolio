import re
with open('src/App.tsx', 'r') as f:
    app = f.read()

new_hero_text = """            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-sans font-black tracking-tighter text-white leading-[0.9] mb-6">
              VDC &amp; Systems<br/>
              <span className="text-[#3B82F6]">Architecture.</span>
            </h1>
            
            <p className="text-gray-400 font-sans text-base md:text-xl font-medium max-w-2xl leading-relaxed mb-12">
              Platform-level workflow automations, BIM data scripting, Revit MCP development, and ISO 19650 protocols to drive complex deliveries.
            </p>"""

# Replace whatever is currently there (the "Automating Architecture" one)
pattern = r'<h1 className="text-4xl.*?</p>'
app = re.sub(pattern, new_hero_text, app, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(app)
