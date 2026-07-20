import os

files = [
    'src/index.css',
    'src/App.tsx',
    'src/components/VDCSection.tsx',
    'src/components/AECWebAppsCabinet.tsx',
    'src/components/AECWorkflowHub.tsx'
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace the red pink color with a professional blue
    content = content.replace('#FF2E63', '#3B82F6')
    content = content.replace('rgba(255,46,99', 'rgba(59,130,246') # Just in case we used rgba for box-shadows

    # In App.tsx, remove the stats grid
    if filepath == 'src/App.tsx':
        import re
        stats_pattern = r'\{\/\*\s*Stats Grid\s*\*\/}.*?<\/div>\s*<\/div>\s*<\/section>'
        new_end = '          </div>\n        </section>'
        content = re.sub(stats_pattern, new_end, content, flags=re.DOTALL)
    
    with open(filepath, 'w') as f:
        f.write(content)

