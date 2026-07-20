import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace(
    'text-[12px] sm:text-lg md:text-xl',
    'text-[10px] sm:text-[14px] md:text-xl'
)

with open('src/App.tsx', 'w') as f:
    f.write(app)
