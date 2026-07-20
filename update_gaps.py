import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace(
    'min-h-screen pt-52 md:pt-64 pb-24"',
    'min-h-screen pt-36 md:pt-48 pb-12"'
)

app = app.replace(
    '<div className="pt-16 mt-16 md:mt-24 border-t border-white/10 w-full mb-12">',
    '<div className="pt-16 mt-16 md:mt-24 border-t border-white/10 w-full mb-6">'
)

app = app.replace(
    '<div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-12 mt-12 md:mt-24 border-t border-white/10">',
    '<div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-8 mt-8 md:mt-12 border-t border-white/10">'
)

with open('src/App.tsx', 'w') as f:
    f.write(app)


with open('src/components/VDCSection.tsx', 'r') as f:
    vdc = f.read()

vdc = vdc.replace(
    '<section id="vdc-section" className="bg-[#0a0a0c] text-gray-400 font-sans w-full pt-48 pb-32 px-6 md:px-12 relative mt-16 md:mt-0">',
    '<section id="vdc-section" className="bg-[#0a0a0c] text-gray-400 font-sans w-full pt-24 md:pt-32 pb-32 px-6 md:px-12 relative">'
)

with open('src/components/VDCSection.tsx', 'w') as f:
    f.write(vdc)
