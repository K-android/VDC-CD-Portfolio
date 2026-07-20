import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# BIM_07
old_bim_07 = """    {
      id: "BIM_07",
      title: "The Multi-Objective Eco-Parametric Solver",
      role: "Simulation Lead & Computational Designer",
      hook: "Single vs. Multi-Objective Generative Evolutionary Solvers",
      description: "Research comparing genetic solvers (Galapagos vs. Wallacei) for optimizing solar window shades.",
      icon: <ShieldCheck className="w-6 h-6 text-neon-blue" />,
      color: "neon-blue",
      metric: "Comparative","""

new_bim_07 = """    {
      id: "BIM_07",
      title: "The Multi-Objective Eco-Parametric Solver",
      domain: "ENVIRONMENTAL SIMULATION // EVOLUTIONARY SOLVERS",
      intel: "Benchmarking genetic algorithms (Galapagos vs. Wallacei) to automate complex solar shading geometry.",
      icon: <ShieldCheck className="w-6 h-6 text-neon-blue" />,
      color: "neon-blue",
      metric: "Comparative","""

app = app.replace(old_bim_07, new_bim_07)

# BIM_01
old_bim_01 = """    {
      id: "BIM_01",
      title: "The LLM Fabrication Engine",
      role: "Computational Design Technologist",
      hook: "Generative AI API integration with physical CNC digital fabrication.",
      description: "Python API bridge connecting Gemini models with CNC machines to generate cut sheets from prompts.",
      icon: <Cpu className="w-6 h-6 text-neon-cyan" />,
      color: "neon-cyan",
      metric: "Generative API","""

new_bim_01 = """    {
      id: "BIM_01",
      title: "The LLM Fabrication Engine",
      domain: "AI INTEGRATION // PYTHON & CNC RUNTIMES",
      intel: "Headless web API bridge linking Gemini models to automatically generate clean fabrication cut sheets from raw text prompts.",
      icon: <Cpu className="w-6 h-6 text-neon-cyan" />,
      color: "neon-cyan",
      metric: "Generative API","""

app = app.replace(old_bim_01, new_bim_01)

# BIM_05
old_bim_05 = """    {
      id: "BIM_05",
      title: "The MEP Component Automator",
      role: "VDC Engineer",
      hook: "Automated placement and configuration of MEP systems.",
      description: "Automated routing script that positions MEP pipes and vents using size and clearance rules.",
      icon: <Cpu className="w-6 h-6 text-neon-orange" />,
      color: "neon-orange",
      metric: "Automation","""

new_bim_05 = """    {
      id: "BIM_05",
      title: "The MEP Component Automator",
      domain: "BIM PRODUCTION // REVIT API & PYTHON",
      intel: "Automated local routing script using clearance vector testing to dynamically place pipes and air vents around structural limits.",
      icon: <Cpu className="w-6 h-6 text-neon-orange" />,
      color: "neon-orange",
      metric: "Automation","""

app = app.replace(old_bim_05, new_bim_05)

with open('src/App.tsx', 'w') as f:
    f.write(app)
