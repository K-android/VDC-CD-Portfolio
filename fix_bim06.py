import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_subtitle = 'subtitle: "Colors components dynamically to show active, pre-built, or demolished phases"'
new_subtitle = 'subtitle: "Applies dynamic color overrides to elements to isolate active build phases."'

app = app.replace(old_subtitle, new_subtitle)

with open('src/App.tsx', 'w') as f:
    f.write(app)
