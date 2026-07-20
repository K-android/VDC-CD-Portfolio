import re

files_to_update = [
    'src/App.tsx',
    'src/components/VDCSection.tsx',
    'src/components/AECWebAppsCabinet.tsx',
    'src/components/AECWorkflowHub.tsx'
]

def update_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # In VDC / dark mode contexts, if we have bg-black, it should be bg-[#0a0a0c]
    # To be safe in App.tsx, let's only replace bg-black when it is part of a dark-mode conditional or dark mode components.
    if filepath != 'src/App.tsx':
        content = content.replace('bg-black', 'bg-[#0a0a0c]')
        content = content.replace('bg-[#0a0a0c]/', 'bg-black/') # Revert translucent blacks back since bg-[#0a0a0c]/50 is fine too, but bg-black/50 is standard
    
    with open(filepath, 'w') as f:
        f.write(content)

for filepath in files_to_update:
    import os
    if os.path.exists(filepath):
        update_file(filepath)
