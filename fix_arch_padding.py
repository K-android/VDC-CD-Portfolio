import re

with open('src/components/ArchSection.tsx', 'r') as f:
    app = f.read()

app = app.replace(
    """<section id="arch-section" className="bg-white text-gray-900 font-serif w-full py-20 px-6 md:px-12 border-b border-gray-100 relative">""",
    """<section id="arch-section" className="bg-white text-gray-900 font-serif w-full pt-48 pb-32 px-6 md:px-12 border-b border-gray-100 relative mt-16 md:mt-0">"""
)

with open('src/components/ArchSection.tsx', 'w') as f:
    f.write(app)
