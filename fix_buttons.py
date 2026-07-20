import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace(
    'className="px-8 py-4 bg-[#3B82F6] text-white rounded-full font-bold font-sans hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)]"',
    'className="w-full sm:w-auto px-8 py-4 bg-[#3B82F6] text-white rounded-full font-bold font-sans hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] text-sm md:text-base"'
)

app = app.replace(
    'className="px-6 py-3 bg-transparent border border-white/10 text-zinc-300 rounded-full font-bold font-sans hover:border-indigo-500 hover:text-white transition-colors duration-300"',
    'className="w-full sm:w-auto px-6 py-3 bg-transparent border border-white/10 text-zinc-300 rounded-full font-bold font-sans hover:border-indigo-500 hover:text-white transition-colors duration-300 text-sm md:text-base"'
)

app = app.replace(
    'className="px-5 py-3 bg-transparent border border-white/10 text-zinc-300 rounded-full font-bold font-sans hover:border-indigo-500 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"',
    'className="w-full sm:w-auto px-5 py-3 bg-transparent border border-white/10 text-zinc-300 rounded-full font-bold font-sans hover:border-indigo-500 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 text-sm md:text-base"'
)

with open('src/App.tsx', 'w') as f:
    f.write(app)
