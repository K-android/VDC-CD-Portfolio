import re

with open('src/components/VDCSection.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'text-4xl md:text-6xl lg:text-7xl font-medium',
    'text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium'
)
content = content.replace(
    'text-2xl md:text-4xl not-italic',
    'text-lg sm:text-xl md:text-3xl lg:text-4xl not-italic'
)

with open('src/components/VDCSection.tsx', 'w') as f:
    f.write(content)
