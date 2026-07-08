import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

target = """                    <div className="space-y-4">
                      <div className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-700 ${isArch ? "text-black" : "text-neon-cyan"}`}>
                        04_Description
                      </div>
                      <p className={`text-sm leading-relaxed transition-colors duration-700 ${isArch ? "text-gray-500 italic" : "text-gray-400 font-mono"}`}>
                        {selectedArsenalItem.description}
                      </p>
                    </div>"""

if target in content:
    content = content.replace(target, "")
    with open('src/App.tsx', 'w') as f:
        f.write(content)
    print("Replaced!")
else:
    print("Target not found. Let's see the exact lines:")
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if "04_Description" in line:
            print(f"Lines near 04_Description:")
            for j in range(i-2, i+5):
                print(f"{j}: {repr(lines[j])}")
            break
