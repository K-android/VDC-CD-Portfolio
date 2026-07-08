with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('className={`text-[10px] uppercase tracking-widest font-bold ${isArch ? "text-black" : "text-neon-cyan"}`}', 'className={`text-xs uppercase tracking-widest font-bold ${isArch ? "text-black" : "text-neon-cyan"}`}')

with open('src/App.tsx', 'w') as f:
    f.write(content)
