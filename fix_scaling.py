import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace(
    '<div className="flex items-center font-serif text-[10px] sm:text-[14px] md:text-xl font-bold tracking-tight text-white uppercase">',
    '<div className="flex items-center font-serif text-[11px] sm:text-[14px] lg:text-lg font-bold tracking-tight text-white uppercase">'
)

app = app.replace(
    '<div className="hidden md:flex flex-1 justify-center gap-10">',
    '<div className="hidden lg:flex flex-1 justify-center gap-6 xl:gap-10">'
)

app = app.replace(
    '<div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 md:hidden">',
    '<div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 lg:hidden">'
)

app = app.replace(
    '<div className="hidden md:block w-[180px]"></div>',
    '<div className="hidden lg:block w-[180px]"></div>'
)

with open('src/App.tsx', 'w') as f:
    f.write(app)
