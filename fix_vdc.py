import re

with open('src/components/VDCSection.tsx', 'r') as f:
    app = f.read()

old_vdc = """        <section id="vdc-section" className="bg-[#0a0a0c] text-gray-400 font-sans w-full py-20 px-6 md:px-12 relative">"""
new_vdc = """        <section id="vdc-section" className="bg-[#0a0a0c] text-gray-400 font-sans w-full py-32 px-6 md:px-12 relative">"""

app = app.replace(old_vdc, new_vdc)

with open('src/components/VDCSection.tsx', 'w') as f:
    f.write(app)
