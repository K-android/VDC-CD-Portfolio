import re
import os

filepaths = [
    'src/components/AECWorkflowHub.tsx',
    'src/components/AECWebAppsCabinet.tsx'
]

def update_file(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r') as f:
        content = f.read()

    # For AECWorkflowHub tabs:
    content = content.replace('bg-neon-cyan/15 text-[#3B82F6] border border-white/10/20', 'bg-[#6366F1]/15 text-[#6366F1] border border-[#6366F1]/30')
    
    # Active categories in AECWorkflowHub
    content = content.replace('bg-neon-cyan/15 border-white/10 text-white', 'bg-[#6366F1]/15 border-[#6366F1]/30 text-white')
    content = content.replace('bg-neon-cyan/15 border-white/10 text-white shadow-[0_0_15px_rgba(0,242,255,0.08)]', 'bg-[#6366F1]/15 border-[#6366F1]/30 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]')
    content = content.replace('bg-neon-cyan/20 border-white/10 text-white shadow-[0_0_10px_rgba(0,242,255,0.15)]', 'bg-[#6366F1]/25 border-[#6366F1]/40 text-white shadow-[0_0_10px_rgba(99,102,241,0.2)]')
    
    # Small dot
    content = content.replace('bg-neon-cyan rounded-full animate-pulse', 'bg-[#6366F1] rounded-full animate-pulse')

    # Trigger button
    content = content.replace('bg-neon-cyan/25 border border-white/10/35 text-[#3B82F6] hover:bg-neon-cyan', 'bg-[#6366F1]/20 border border-[#6366F1]/30 text-[#6366F1] hover:bg-[#6366F1]')

    # AECWebAppsCabinet tabs
    # We only change the one that was using `#3B82F6`. In AECWebAppsCabinet, `currentTab2` was using #3B82F6 and neon-cyan.
    # The previous script might have already matched the first replacement above if it's identical.
    # Let's ensure AECWebAppsCabinet specific replacements:
    content = content.replace('text-[#3B82F6] group-hover:text-white', 'text-[#3B82F6] group-hover:text-[#6366F1]')
    content = content.replace('group-hover:text-[#3B82F6]', 'group-hover:text-[#6366F1]')

    # Let's also check for hover:text-neon-cyan
    content = content.replace('hover:text-neon-cyan', 'hover:text-[#6366F1]')
    content = content.replace('hover:border-neon-cyan', 'hover:border-[#6366F1]')
    
    with open(filepath, 'w') as f:
        f.write(content)

for fp in filepaths:
    update_file(fp)

