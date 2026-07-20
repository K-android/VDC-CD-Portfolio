import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace('<span className="ml-2">KARTHIKRAJ_NADAR</span>', '<span className="ml-2">KARTHIKRAJ_<span className="text-[#3B82F6]">NADAR</span></span>')

with open('src/App.tsx', 'w') as f:
    f.write(app)
