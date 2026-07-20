import os
import re

files_to_update = [
    'src/index.css',
    'src/App.tsx',
    'src/components/VDCSection.tsx',
    'src/components/AECWebAppsCabinet.tsx',
    'src/components/AECWorkflowHub.tsx'
]

def update_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Update the Stats Grid
    if filepath == 'src/App.tsx':
        content = content.replace(
            '<div className="text-3xl md:text-5xl font-black text-[#3B82F6] tracking-tighter mb-1">8M+</div>\n                <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">Sq.Ft Modeled & Coordinated</div>',
            '<div className="text-3xl md:text-5xl font-black text-[#3B82F6] tracking-tighter mb-1">LOD 350</div>\n                <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">MODELING PRECISION</div>'
        )
        # Also update the gateway split backgrounds to use softer charcoal
        content = content.replace('bg-[#080b0e]', 'bg-[#0a0a0c]')
        content = content.replace('bg-[#0c0f12]', 'bg-[#0f1115]')
        content = content.replace('bg-[#06080a]', 'bg-[#0a0a0c]')
        
        # In modals or other places, use deep charcoal instead of pure black for dark theme
        # Be careful not to replace isArch side's 'bg-black text-white' unless we mean to
        
    # 2. Soften Borders
    # The user specifically mentioned "Replace any solid white or bright blue container borders with a subtle, transparent white border"
    # We have `border-terminal-border` which was #1c1c24. Let's make it border-white/5
    # We also have border-[#3B82F6] in some places, let's soften the container ones if any, or just trust border-white/10.
    
    # Let's replace 'border-terminal-border' with 'border-white/10'
    content = content.replace('border-terminal-border', 'border-white/5')
    
    # 3. Soften Backgrounds
    # Replace bg-black with bg-[#0a0a0c] where appropriate.
    # We need to be careful with ternary operators like `isArch ? "hover:bg-black" : "..."`
    # Let's target specific bg-black usage in dark mode parts.
    content = content.replace('bg-terminal-bg', 'bg-[#0a0a0c]')
    content = content.replace('bg-black/40', 'bg-[#0a0a0c]/80')
    content = content.replace('bg-black/50', 'bg-[#0a0a0c]/90')
    content = content.replace('bg-black/60', 'bg-[#0a0a0c]/95')
    
    if filepath == 'src/index.css':
        content = content.replace('--color-terminal-bg: #0b0b0e;', '--color-terminal-bg: #0a0a0c;')
        content = content.replace('--color-terminal-border: #1c1c24;', '--color-terminal-border: rgba(255, 255, 255, 0.05);')
        
    with open(filepath, 'w') as f:
        f.write(content)

for filepath in files_to_update:
    if os.path.exists(filepath):
        update_file(filepath)

