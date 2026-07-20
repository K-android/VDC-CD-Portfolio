import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace('03_System_Output', '// 03 . SYSTEM OUTPUT')

with open('src/App.tsx', 'w') as f:
    f.write(app)
