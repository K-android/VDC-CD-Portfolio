import re

with open('src/components/ArchSection.tsx', 'r') as f:
    content = f.read()

content = content.replace('} , Hammer } from \'lucide-react\';', ', Hammer } from \'lucide-react\';')

with open('src/components/ArchSection.tsx', 'w') as f:
    f.write(content)
