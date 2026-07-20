import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace('  MonitorPlay,\n', '  Monitor,\n  MonitorPlay,\n')

with open('src/App.tsx', 'w') as f:
    f.write(app)
