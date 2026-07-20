import re

with open('src/components/VDCSection.tsx', 'r') as f:
    app = f.read()

app = app.replace(
    """<section id="vdc-section" className="bg-[#0a0a0c] text-gray-400 font-sans w-full py-32 px-6 md:px-12 relative">""",
    """<section id="vdc-section" className="bg-[#0a0a0c] text-gray-400 font-sans w-full pt-48 pb-32 px-6 md:px-12 relative mt-16 md:mt-0">"""
)

with open('src/components/VDCSection.tsx', 'w') as f:
    f.write(app)
