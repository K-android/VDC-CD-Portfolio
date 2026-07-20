import re

with open('src/components/ArchSection.tsx', 'r') as f:
    content = f.read()

# Add import
if 'OrganicFluidNetwork' not in content:
    content = content.replace("import { Activity", "import { OrganicFluidNetwork } from './OrganicFluidNetwork';\nimport { Activity")

# Add component inside the section
old_section = '<section id="arch-section" className="bg-white text-gray-900 font-serif w-full py-20 px-6 md:px-12 border-b border-gray-100 relative">'
new_section = '<section id="arch-section" className="bg-white text-gray-900 font-serif w-full py-20 px-6 md:px-12 border-b border-gray-100 relative overflow-hidden">\n          <OrganicFluidNetwork />'

if '<OrganicFluidNetwork />' not in content:
    content = content.replace(old_section, new_section)

with open('src/components/ArchSection.tsx', 'w') as f:
    f.write(content)
