import re

with open('src/components/VDCSection.tsx', 'r') as f:
    vdc = f.read()

vdc = vdc.replace('bg-gradient-to-b from-[#0c0f12] via-[#0d1013] to-white', 'bg-gradient-to-b from-[#0a0a0c] via-[#4a4a4a] to-white')
# Wait, via-[#4a4a4a] might look bad. What if we just do from-[#0a0a0c] to-white?
vdc = vdc.replace('bg-gradient-to-b from-[#0a0a0c] via-[#4a4a4a] to-white', 'bg-gradient-to-b from-[#0a0a0c] to-white')

# Let's just run from-[#0a0a0c] to-white directly, but first let's see what was there:
with open('src/components/VDCSection.tsx', 'w') as f:
    f.write(vdc)

