import re

# Update App.tsx
with open('src/App.tsx', 'r') as f:
    app = f.read()

old_app_str = '<span className="text-[9px] font-mono tracking-widest font-bold uppercase">Award Winning</span>'
new_app_str = '<span className="text-[9px] font-mono tracking-widest font-bold uppercase">{item.title === "Net-Zero Worker Housing" ? "Grand Winner" : "National Citation"}</span>'

app = app.replace(old_app_str, new_app_str)

with open('src/App.tsx', 'w') as f:
    f.write(app)

# Update ArchSection.tsx
with open('src/components/ArchSection.tsx', 'r') as f:
    arch = f.read()

old_arch_str = '<span className="text-[8px] font-mono tracking-widest font-bold uppercase">Award</span>'
new_arch_str = '<span className="text-[8px] font-mono tracking-widest font-bold uppercase">National Citation</span>'

arch = arch.replace(old_arch_str, new_arch_str)

with open('src/components/ArchSection.tsx', 'w') as f:
    f.write(arch)
