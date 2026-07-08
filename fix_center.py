import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Fix 1: The optical centering of OR
content = content.replace(
    '<span className="relative z-10 text-[9px] tracking-[0.2em] font-mono text-gray-400 mix-blend-difference">OR</span>',
    '<span className="relative z-10 text-[9px] tracking-[0.2em] ml-[0.2em] font-mono text-gray-400 mix-blend-difference">OR</span>'
)

# Fix 2: VDC Side h-[50dvh] -> flex-1 md:flex-none md:h-full
# Be careful to replace only the exact class strings
content = content.replace(
    "className={`h-[50dvh] md:h-full transition-all duration-700 ease-out relative flex flex-col justify-center items-center p-4 sm:p-6 md:p-12 border-b md:border-b-0 md:border-r border-terminal-border/20 ${",
    "className={`flex-1 md:flex-none md:h-full transition-all duration-700 ease-out relative flex flex-col justify-center items-center p-4 sm:p-6 md:p-12 border-b md:border-b-0 md:border-r border-terminal-border/20 ${"
)

# Fix 3: Arch Side h-[50dvh] -> flex-1 md:flex-none md:h-full
content = content.replace(
    "className={`h-[50dvh] md:h-full transition-all duration-700 ease-out relative flex flex-col justify-center items-center p-4 sm:p-6 md:p-12 ${",
    "className={`flex-1 md:flex-none md:h-full transition-all duration-700 ease-out relative flex flex-col justify-center items-center p-4 sm:p-6 md:p-12 ${"
)

with open('src/App.tsx', 'w') as f:
    f.write(content)

