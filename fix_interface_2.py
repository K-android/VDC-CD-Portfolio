import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace(
"""  id: string;
  domain?: string;
  problem?: string;
  solution?: string;
  title: string;
  role?: string;
  hook?: string;
  description: string;""",
"""  id: string;
  domain?: string;
  problem?: string;
  solution?: string;
  intel?: string;
  title: string;
  role?: string;
  hook?: string;
  description?: string;"""
)

with open('src/App.tsx', 'w') as f:
    f.write(app)
