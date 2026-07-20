import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_subtitle = 'subtitle: "Sorts clashes by location to separate major frame issues from small utility pipe overlaps"'
new_subtitle = 'subtitle: "Sorts clashes by location to isolate major structural issues from minor utility overlaps."'

app = app.replace(old_subtitle, new_subtitle)

with open('src/App.tsx', 'w') as f:
    f.write(app)
