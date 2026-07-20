import re

with open('src/components/VDCSection.tsx', 'r') as f:
    content = f.read()

old_heading = """                <h1 className="text-2xl md:text-5xl font-sans tracking-tight leading-[1.1] mb-4 text-white  font-bold">
                  Automating <span className="text-[#3B82F6]">AEC workflows</span> and managing <span className="text-[#3B82F6]">ISO 19650</span> facility data.
                </h1>"""

new_heading = """                <h1 className="text-2xl md:text-5xl font-sans tracking-tight leading-[1.1] mb-4 text-white font-bold">
                  Automating <span className="text-[#3B82F6] font-medium">AEC workflows</span> and managing <span className="text-[#3B82F6] font-medium">ISO 19650</span> facility data.
                </h1>"""

content = content.replace(old_heading, new_heading)

old_btn = """                    className="group px-6 py-3 font-sans font-semibold  tracking-tight flex items-center justify-center gap-3 transition-all duration-300 bg-neon-cyan text-black hover:bg-white"
                  >
                    Initialize Workflows"""

new_btn = """                    className="group px-6 py-3 font-sans font-semibold tracking-tight flex items-center justify-center gap-3 transition-all duration-300 border border-blue-500/30 bg-blue-500/[0.02] text-blue-400 hover:border-indigo-500 hover:text-indigo-400"
                  >
                    Initialize Workflows"""

content = content.replace(old_btn, new_btn)

with open('src/components/VDCSection.tsx', 'w') as f:
    f.write(content)
