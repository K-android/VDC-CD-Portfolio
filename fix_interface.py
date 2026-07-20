import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace(
"""interface ArsenalItem {
  id: string;""",
"""interface ArsenalItem {
  id: string;
  domain?: string;
  problem?: string;
  solution?: string;"""
)

with open('src/App.tsx', 'w') as f:
    f.write(app)
