import re

# 1. VDCSection
with open('src/components/VDCSection.tsx', 'r') as f:
    vdc = f.read()

vdc = re.sub(
    r'<a[^>]*href="https://drive\.google\.com/[^>]*>.*?Download Resume.*?</a>',
    '',
    vdc,
    flags=re.DOTALL
)

with open('src/components/VDCSection.tsx', 'w') as f:
    f.write(vdc)

# 2. ArchSection
with open('src/components/ArchSection.tsx', 'r') as f:
    arch = f.read()

arch = re.sub(
    r'<a[^>]*href="https://drive\.google\.com/[^>]*>.*?Download Resume.*?</a>',
    '',
    arch,
    flags=re.DOTALL
)

with open('src/components/ArchSection.tsx', 'w') as f:
    f.write(arch)

