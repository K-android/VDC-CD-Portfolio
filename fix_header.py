import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace(
    '''        <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 border border-white/10 bg-white/5 rounded-md text-white hover:bg-white/10 transition-colors"
            >
              <Box className="w-5 h-5" />
            </button>
          </div>
          
        <div className="hidden md:flex flex-1 justify-center gap-10">''',
    '''        <div className="hidden md:flex flex-1 justify-center gap-10">'''
)

app = app.replace(
    '''        <div>

        </div>''',
    '''        <div className="md:hidden flex items-center justify-end">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 border border-white/10 bg-white/5 rounded-md text-white hover:bg-white/10 transition-colors"
            >
              <Box className="w-5 h-5" />
            </button>
        </div>
        <div className="hidden md:block w-[180px]"></div>'''
)

with open('src/App.tsx', 'w') as f:
    f.write(app)
