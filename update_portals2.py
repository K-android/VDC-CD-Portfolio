import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace('fixed top-4 md:top-6 left-1/2', 'fixed bottom-6 md:bottom-8 left-1/2')

with open('src/App.tsx', 'w') as f:
    f.write(app)
