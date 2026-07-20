import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace(
    '<div className="flex items-center font-sans text-[12px] sm:text-lg md:text-xl font-bold tracking-tight text-white uppercase">',
    '<div className="flex items-center font-serif text-[12px] sm:text-lg md:text-xl font-bold tracking-tight text-white uppercase">'
)

app = app.replace(
    'className="relative group text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300"',
    'className="relative group font-serif text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300"'
)

app = app.replace(
    'className="relative group text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors duration-300"',
    'className="relative group font-serif text-sm font-medium text-gray-400 hover:text-[#6366F1] transition-colors duration-300"'
)

with open('src/App.tsx', 'w') as f:
    f.write(app)
