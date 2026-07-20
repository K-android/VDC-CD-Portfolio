import re
import os

def clean_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Generic Replacements for VDC Section
    content = content.replace('bg-[#0c0f12]', 'bg-[#0a0a0c]')
    content = content.replace('text-neon-cyan', 'text-[#FF2E63]')
    content = content.replace('bg-neon-cyan/5', 'bg-[#FF2E63]/5')
    content = content.replace('bg-neon-cyan/10', 'bg-[#FF2E63]/10')
    content = content.replace('border-neon-cyan', 'border-[#FF2E63]')
    
    # Typography cleanup
    content = content.replace('font-mono', 'font-sans')
    content = content.replace('text-gray-300 font-sans', 'text-gray-400 font-sans')
    content = content.replace('text-[10px]', 'text-xs')
    content = content.replace('tracking-tighter', 'tracking-tight')
    content = content.replace('uppercase', '')  # Remove forced uppercase in headings where it was standard
    
    # Specific targeted edits
    content = content.replace('<span className="text-[#FF2E63] animate-pulse">', '<span className="text-[#FF2E63]">')
    content = content.replace('Automating <span className="text-[#FF2E63]">AEC workflows</span> and managing <span className="text-neon-orange">ISO 19650</span> facility data.', 
                              'Building C#/.NET plugins, Python MCP servers, and custom automation APIs that bridge <span className="text-[#FF2E63]">physical design</span> and code.')
    
    with open(filepath, 'w') as f:
        f.write(content)

clean_file('src/components/VDCSection.tsx')
clean_file('src/components/AECWorkflowHub.tsx')
clean_file('src/components/AECWebAppsCabinet.tsx')

