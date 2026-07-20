import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_heading = """            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-sans font-black tracking-tighter text-white leading-[0.95] mb-6">
              Automating Architecture.<br/>
              <span className="text-gray-400">Engineering Compliant</span><br/>
              <span className="text-[#3B82F6]">BIM Pipelines.</span>
            </h1>"""

new_heading = """            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-black tracking-tighter text-white leading-[1.05] mb-6">
              Automating Architecture.<br/>
              <span className="text-gray-400">Engineering Compliant</span><br/>
              <span className="text-[#3B82F6]">BIM Pipelines.</span>
            </h1>"""

app = app.replace(old_heading, new_heading)

old_stats = """            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-8 border-t border-white/10">"""

new_stats = """            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-12 mt-12 md:mt-24 border-t border-white/10">"""

app = app.replace(old_stats, new_stats)

with open('src/App.tsx', 'w') as f:
    f.write(app)
