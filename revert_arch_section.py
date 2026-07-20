import re

with open('src/components/ArchSection.tsx', 'r') as f:
    content = f.read()

# Remove import
content = content.replace("import { OrganicFluidNetwork } from './OrganicFluidNetwork';\n", "")

# Remove component
content = content.replace('<section id="arch-section" className="bg-white text-gray-900 font-serif w-full py-20 px-6 md:px-12 border-b border-gray-100 relative overflow-hidden">\n          <OrganicFluidNetwork />', '<section id="arch-section" className="bg-white text-gray-900 font-serif w-full py-20 px-6 md:px-12 border-b border-gray-100 relative">')

with open('src/components/ArchSection.tsx', 'w') as f:
    f.write(content)
