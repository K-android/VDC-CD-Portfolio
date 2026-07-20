import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace(
    '''        <div className="md:hidden flex items-center justify-end">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 border border-white/10 bg-white/5 rounded-md text-white hover:bg-white/10 transition-colors"
            >
              <Box className="w-5 h-5" />
            </button>
        </div>''',
    '''        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 md:hidden">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 border border-white/10 bg-white/5 rounded-md text-white hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              <Box className="w-5 h-5" />
            </button>
        </div>'''
)

app = app.replace(
    '''<div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-4 flex justify-between items-center">''',
    '''<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 py-4 flex justify-between items-center relative">'''
)

with open('src/App.tsx', 'w') as f:
    f.write(app)
