import re
with open('src/App.tsx', 'r') as f:
    content = f.read()

# I want to find the exact spot in the JSX for 04_Project_Overview
# The current code looks like:
"""
                        <div className="space-y-4">
                          <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black" : "text-neon-cyan"}`}>
                            04_Project_Overview
                          </div>
                          <p className={`text-sm leading-relaxed transition-colors duration-700 ${isArch ? "text-gray-500 italic" : "text-gray-400 font-mono"}`}>
                            {selectedArsenalItem.description}
                          </p>
                        </div>
"""

# Let's replace only this specific occurrence of {selectedArsenalItem.description} under 04_Project_Overview

pattern = r"(04_Project_Overview\s*</div>\s*<p[^>]*>\s*)\{selectedArsenalItem\.description\}"
content = re.sub(pattern, r"\1{selectedArsenalItem.details.overview}", content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
