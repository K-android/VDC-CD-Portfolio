import re
import os

files_to_update = [
    'src/App.tsx',
    'src/components/VDCSection.tsx',
    'src/components/AECWebAppsCabinet.tsx',
    'src/components/AECWorkflowHub.tsx'
]

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r') as f:
        content = f.read()

    # Fix border-white/5/... typos from previous replace
    content = re.sub(r'border-white/5/\d+', 'border-white/10', content)
    
    # Let's also soften the main container borders
    # E.g. replace border-[#3B82F6]/30 with border-white/10 in general container classes if it's too strong,
    # but the user said "Replace any solid white or bright blue container borders with a subtle, transparent white border (e.g., border border-white/5 or border-white/10)".
    content = content.replace('border-neon-cyan/20', 'border-white/10')
    content = content.replace('border-neon-cyan/30', 'border-white/10')
    content = content.replace('border-neon-cyan', 'border-white/10')
    content = content.replace('border-[#3B82F6]', 'border-white/10')
    # but maybe we should keep border-[#3B82F6]/20 inside small tags or tabs, so we just target the ones they complained about.
    # Actually, we replaced most container borders with border-white/5 earlier.
    
    with open(filepath, 'w') as f:
        f.write(content)

