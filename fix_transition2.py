import re

with open('src/components/VDCSection.tsx', 'r') as f:
    vdc = f.read()

vdc = vdc.replace('bg-gradient-to-b from-[#0a0a0c] to-white', 'bg-gradient-to-b from-[#0a0a0c] via-neutral-200 to-white')

with open('src/components/VDCSection.tsx', 'w') as f:
    f.write(vdc)

