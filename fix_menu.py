import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_menu = """  const menuItems = [
    { id: "landing", label: "Home", isSection: true, index: 0, elementId: "landing" },
    { id: "vdc-section", label: "Workflows", isSection: true, index: 1, elementId: "vdc-section" },
    { id: "vdc-apps", label: "Apps / Web", isSection: false, elementId: "vdc-apps" },
    { id: "terminal", label: "Contact & Bio", isSection: true, index: 3, elementId: "terminal" },
  ];"""

new_menu = """  const menuItems = [
    { id: "landing", label: "Home", isSection: true, index: 0, elementId: "landing" },
    { id: "vdc-section", label: "Workflows", isSection: true, index: 1, elementId: "vdc-section" },
    { id: "arch-section", label: "Design Projects", isSection: true, index: 2, elementId: "arch-section" },
    { id: "vdc-apps", label: "Apps / Web", isSection: false, elementId: "vdc-apps" },
    { id: "terminal", label: "Contact & Bio", isSection: true, index: 3, elementId: "terminal" },
  ];"""

app = app.replace(old_menu, new_menu)

with open('src/App.tsx', 'w') as f:
    f.write(app)
