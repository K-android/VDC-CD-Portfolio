import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_str = '<span className={`text-[11px] leading-tight ${isArch ? "text-gray-500" : "text-gray-400"}`}>Rhino, Grasshopper, Wallacei</span>'
new_str = '<span className={`text-[11px] leading-tight ${isArch ? "text-gray-500" : "text-gray-400"}`}>Rhino, Grasshopper (Wallacei, Galapagos, Ladybug Tools, Rhino.Inside)</span>'

app = app.replace(old_str, new_str)

# Also let's change Hexagon to Component or Activity
old_icon = '<Hexagon className={`w-5 h-5 ${isArch ? "text-gray-600" : "text-neon-cyan"}`} />'
new_icon = '<Component className={`w-5 h-5 ${isArch ? "text-gray-600" : "text-neon-cyan"}`} />'

app = app.replace(old_icon, new_icon)

with open('src/App.tsx', 'w') as f:
    f.write(app)
