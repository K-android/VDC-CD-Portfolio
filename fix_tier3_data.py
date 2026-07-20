import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# BIM_08
old_bim_08 = """    {
      id: "BIM_08",
      title: "Agent-Based Space Planning & Structural Solver",
      role: "Computational Design Technologist",
      hook: "Reframing architectural programming as a dynamic physics simulation.",
      description: "Generative tool treating spaces as physical agents to auto-resolve adjacencies and structural grids.",
      icon: <Cpu className="w-6 h-6 text-neon-blue" />,
      color: "neon-blue",
      metric: "Agentic AI","""

new_bim_08 = """    {
      id: "BIM_08",
      title: "Agent-Based Space Planning & Structural Solver",
      domain: "GENERATIVE LOGIC // PYRHINO & GEOMETRY API",
      intel: "Self-resolving architectural space adjacencies using localized vector repulsion and structural grid matching.",
      icon: <Cpu className="w-6 h-6 text-neon-blue" />,
      color: "neon-blue",
      metric: "Agentic AI","""

app = app.replace(old_bim_08, new_bim_08)

with open('src/App.tsx', 'w') as f:
    f.write(app)
