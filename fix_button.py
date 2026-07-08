import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

pattern = r'className=\{`w-full py-3 border font-mono text-\[10px\] uppercase tracking-widest transition-all duration-700 flex items-center justify-center gap-2 \$\{\s*isSending \? "opacity-50 cursor-not-allowed" : ""\s*\} \$\{\s*isArch \s*\? "bg-black text-white hover:bg-gray-800" \s*: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30 hover:bg-neon-cyan hover:text-black"\s*\}`\}'

replacement = r'''className={`w-full py-3 border font-mono text-[10px] uppercase tracking-widest transition-all duration-700 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 ${
                          isSending ? "opacity-50 cursor-not-allowed" : ""
                        } ${
                          isArch 
                           ? "bg-black text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-black/20" 
                           : "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30 hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                        }`}'''

content = re.sub(pattern, replacement, content)

with open('src/App.tsx', 'w') as f:
    f.write(content)

