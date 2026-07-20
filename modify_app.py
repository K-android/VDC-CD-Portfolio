import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# 1. Update font-mono in key places to font-sans font-bold
app = app.replace('font-mono text-neon-cyan', 'font-sans font-bold text-neon-cyan tracking-tight')
app = app.replace('font-mono text-[10px]', 'font-sans text-[11px] font-medium tracking-wide')

# 2. Add rounded corners to brutalist-border
app = app.replace('brutalist-border', 'brutalist-border rounded-2xl overflow-hidden')

# 3. Soften the overall text
app = app.replace('text-gray-300', 'text-gray-400')

with open('src/App.tsx', 'w') as f:
    f.write(app)
