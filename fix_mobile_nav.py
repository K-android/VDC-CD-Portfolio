import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace('hover:translate-x-1', 'hover:translate-x-1 hover:text-[#6366F1]')

with open('src/App.tsx', 'w') as f:
    f.write(app)
