import re
with open('src/App.tsx', 'r') as f:
    app = f.read()

old_hero_text = """            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-sans font-black tracking-tighter text-white leading-[0.9] mb-6">
              Computational<br/>
              Designer.<br/>
              <span className="text-gray-400">VDC Data</span><br/>
              <span className="text-[#3B82F6]">Engineer.</span>
            </h1>
            
            <p className="text-gray-400 font-sans text-base md:text-xl font-medium max-w-2xl leading-relaxed mb-12">
              Platform-level workflow automations, BIM data scripting, Revit MCP development, and ISO 19650 protocols to drive complex deliveries.
            </p>"""

new_hero_text = """            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-sans font-black tracking-tighter text-white leading-[0.9] mb-6">
              Automating<br/>
              Architecture.<br/>
              <span className="text-gray-400">Coding the Future of</span><br/>
              <span className="text-[#3B82F6]">BIM.</span>
            </h1>
            
            <p className="text-gray-400 font-sans text-base md:text-xl font-medium max-w-2xl leading-relaxed mb-12">
              Building Revit MCP servers, Python workflows, and custom automation APIs that bridge <span className="text-[#3B82F6]">physical design</span> and code.
            </p>"""

app = app.replace(old_hero_text, new_hero_text)

with open('src/App.tsx', 'w') as f:
    f.write(app)
