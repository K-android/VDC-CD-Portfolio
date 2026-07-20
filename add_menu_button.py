import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace(
    '<div className="flex items-center font-sans text-lg md:text-xl font-bold tracking-tight text-white uppercase">',
    '<div className="flex items-center font-sans text-[12px] sm:text-lg md:text-xl font-bold tracking-tight text-white uppercase">'
)

app = app.replace(
    '''        <div className="hidden md:flex flex-1 justify-center gap-10">''',
    '''        <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 border border-white/10 bg-white/5 rounded-md text-white hover:bg-white/10 transition-colors"
            >
              <Box className="w-5 h-5" />
            </button>
          </div>
          
        <div className="hidden md:flex flex-1 justify-center gap-10">'''
)

with open('src/App.tsx', 'w') as f:
    f.write(app)
