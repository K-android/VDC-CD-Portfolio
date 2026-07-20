import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# Add import
import_stmt = "import { OrganicBackground } from './components/OrganicBackground';\n"
if "import { OrganicBackground }" not in app:
    # Insert near the top
    app = re.sub(r'(import React,.*?;\n)', r'\1' + import_stmt, app, count=1)

# Add component to #landing section
# Current: <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none" />
new_div = """<div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_60%)] pointer-events-none" />
          <OrganicBackground />"""
app = app.replace('<div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none" />', new_div)

with open('src/App.tsx', 'w') as f:
    f.write(app)
