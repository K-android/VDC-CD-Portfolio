import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# Update ProjectCard
old_project_card = """        {item.hook && (
          <div className={`text-[10px] md:text-[11px] font-mono mb-4 py-2 border-y transition-colors duration-700 border-dashed ${isArch ? "text-gray-600 italic border-gray-100" : "text-neon-cyan border-white/5"}`}>
            {`// ${item.hook}`}
          </div>
        )}
        
        <p className={`text-sm md:text-base mb-8 line-clamp-3 leading-relaxed transition-colors duration-700 ${isArch ? "text-gray-500 italic" : "text-gray-400 font-mono"}`}>
          {item.description}
        </p>"""

new_project_card = """        {item.problem && item.solution ? (
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col gap-1.5">
              <span className={`text-[9px] font-mono tracking-widest uppercase ${isArch ? "text-gray-400" : "text-[#3B82F6]"}`}>Problem</span>
              <p className={`text-sm leading-relaxed ${isArch ? "text-gray-600 italic font-serif" : "text-gray-300 font-sans"}`}>{item.problem}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className={`text-[9px] font-mono tracking-widest uppercase ${isArch ? "text-gray-400" : "text-[#00f2ff]"}`}>Solution</span>
              <p className={`text-sm leading-relaxed ${isArch ? "text-gray-600 italic font-serif" : "text-gray-300 font-sans"}`}>{item.solution}</p>
            </div>
          </div>
        ) : (
          <>
            {item.hook && (
              <div className={`text-[10px] md:text-[11px] font-mono mb-4 py-2 border-y transition-colors duration-700 border-dashed ${isArch ? "text-gray-600 italic border-gray-100" : "text-neon-cyan border-white/5"}`}>
                {`// ${item.hook}`}
              </div>
            )}
            
            <p className={`text-sm md:text-base mb-8 line-clamp-3 leading-relaxed transition-colors duration-700 ${isArch ? "text-gray-500 italic" : "text-gray-400 font-mono"}`}>
              {item.description}
            </p>
          </>
        )}"""

app = app.replace(old_project_card, new_project_card)

# Update BIM_09
old_bim_09 = """    {
      id: "BIM_09",
      title: "Rhino-to-Revit API Interoperability Pipeline",
      role: "Workflow Automation & Computational Research",
      hook: "AI-driven topology serialization & real-time BIM compilation.",
      description: "Data bridge streaming high-fidelity topological coordinates from Rhino to Revit at LOD 400.",
      icon: <Cpu className="w-6 h-6 text-neon-orange" />,
      color: "neon-orange",
      metric: "LOD 400 Mass",
      gifUrl: "https://lh3.googleusercontent.com/d/1gApYb78g5bpNXO0OLes5ymrUk9mEV1i8",
      tags: ["Grasshopper 3D", "Revit API", "Raven AI", "JSON", "Python"],"""

new_bim_09 = """    {
      id: "BIM_09",
      title: "Rhino-to-Revit API Interoperability Pipeline",
      role: "WORKFLOW AUTOMATION & COMPUTATIONAL RESEARCH",
      problem: "Traditional IFC/geometry exchanges cause major data degradation and layout latency between teams.",
      solution: "Built a custom Python data bridge to serialize high-fidelity topological coordinates out of Rhino and compile them directly through the native Revit API.",
      icon: <Cpu className="w-6 h-6 text-neon-orange" />,
      color: "neon-orange",
      metric: "LOD 400 TOPOLOGY COMPILATION",
      gifUrl: "https://lh3.googleusercontent.com/d/1gApYb78g5bpNXO0OLes5ymrUk9mEV1i8",
      tags: ["Grasshopper 3D", "Revit API", "JSON", "Python"],"""

app = app.replace(old_bim_09, new_bim_09)

# Update BIM_02
old_bim_02 = """    {
      id: "BIM_02",
      title: "The Generative Documentation Engine",
      role: "BIM Automation Lead",
      hook: "Bypassing Revit UI limitations to automate large-scale sheet generation.",
      description: "Dynamo script that reads spreadsheets to instantly generate formatted blueprints and sheets in Revit.",
      icon: <Code2 className="w-6 h-6 text-neon-cyan" />,
      color: "neon-cyan",
      metric: "Firm-Wide Scale",
      content: <CodeSnippet />,
      gifUrl: "https://lh3.googleusercontent.com/d/1SHXNrFYWzgw8f6hMYNzF4I9BQfdF5Xor",
      tags: ["Revit API", "Dynamo", "Python"],"""

new_bim_02 = """    {
      id: "BIM_02",
      title: "The Generative Documentation Engine",
      role: "BIM AUTOMATION LEAD",
      problem: "Manual creation and formatting of documentation sheets in Revit consumes massive amounts of unbillable production hours.",
      solution: "Engineered a Python/Dynamo pipeline that bypasses the Revit UI, reading directly from Excel to generate, format, and place views on hundreds of sheets instantly.",
      icon: <Code2 className="w-6 h-6 text-neon-cyan" />,
      color: "neon-cyan",
      metric: "FIRM-WIDE SCALE",
      content: <CodeSnippet />,
      gifUrl: "https://lh3.googleusercontent.com/d/1SHXNrFYWzgw8f6hMYNzF4I9BQfdF5Xor",
      tags: ["Revit API", "Dynamo", "Python", "Excel"],"""

app = app.replace(old_bim_02, new_bim_02)

# Update BIM_03
old_bim_03 = """    {
      id: "BIM_03",
      title: "The 5D Data Harvester",
      role: "VDC Data Engineer",
      hook: "Scrubbing massive Revit models to extract exact facility parameters.",
      description: "Data extraction script that pulls precise material quantities from 3D models into Excel logs.",
      icon: <Database className="w-6 h-6 text-neon-orange" />,
      color: "neon-orange",
      metric: "100% Accuracy",
      content: <DataTable />,
      gifUrl: "https://lh3.googleusercontent.com/d/1o1McRNTDM1fwtEzORfJEz21-9udMX1CN",
      tags: ["Dynamo", "Excel"],"""

new_bim_03 = """    {
      id: "BIM_03",
      title: "The 5D Data Harvester",
      role: "VDC DATA ENGINEER",
      problem: "Extracting exact facility parameters and material quantities manually is error-prone and labor-intensive.",
      solution: "Developed a Dynamo script that scrubs massive Revit models to extract and format precise material quantities directly into analytical Excel logs.",
      icon: <Database className="w-6 h-6 text-neon-orange" />,
      color: "neon-orange",
      metric: "100% ACCURACY",
      content: <DataTable />,
      gifUrl: "https://lh3.googleusercontent.com/d/1o1McRNTDM1fwtEzORfJEz21-9udMX1CN",
      tags: ["Dynamo", "Excel", "Data Extraction"],"""

app = app.replace(old_bim_03, new_bim_03)

# Update BIM_04
old_bim_04 = """    {
      id: "BIM_04",
      title: "The Clash Matrix Pipeline",
      role: "BIM Coordinator",
      hook: "Streamlining multidisciplinary model coordination.",
      description: "3D collision checker auditing steel structures against MEP elements to flag coordination issues.",
      icon: <Activity className="w-6 h-6 text-neon-cyan" />,
      color: "neon-cyan",
      metric: "Zero Errors",
      gifUrl: "https://lh3.googleusercontent.com/d/1G_5-CuXFQuIf9mft1d6CauX29EmntKOE",
      tags: ["Navisworks Manage", "Revit NWC Exporter"],"""

new_bim_04 = """    {
      id: "BIM_04",
      title: "The Clash Matrix Pipeline",
      role: "BIM COORDINATOR",
      problem: "Multidisciplinary model coordination requires tedious manual visual inspection, missing critical overlaps between structural and MEP elements.",
      solution: "Engineered a collision checker that audits steel structures against utility models, automatically flagging and categorizing coordination issues.",
      icon: <Activity className="w-6 h-6 text-neon-cyan" />,
      color: "neon-cyan",
      metric: "ZERO ERRORS",
      gifUrl: "https://lh3.googleusercontent.com/d/1G_5-CuXFQuIf9mft1d6CauX29EmntKOE",
      tags: ["Navisworks", "Revit", "Clash Detection"],"""

app = app.replace(old_bim_04, new_bim_04)

# Update BIM_06
old_bim_06 = """    {
      id: "BIM_06",
      title: "The 4D Matrix (TimeLiner)",
      role: "Simulation Lead",
      hook: "Visualizing construction sequences over time.",
      description: "4D scheduling tool linking timelines with 3D models to simulate and preview building phases.",
      icon: <ShieldCheck className="w-6 h-6 text-neon-blue" />,
      color: "neon-blue",
      metric: "4D Simulation",
      gifUrl: "https://lh3.googleusercontent.com/d/1qpMsNkw8HaPhf97qubs7GEV1BkZKsydz",
      tags: ["Navisworks Manage", "TimeLiner"],"""

new_bim_06 = """    {
      id: "BIM_06",
      title: "The 4D Matrix (TimeLiner)",
      role: "SIMULATION LEAD",
      problem: "Static Gantt charts fail to communicate spatial logistics and complex construction sequences over time.",
      solution: "Developed a 4D scheduling tool that links MS Project timelines directly to 3D model elements, simulating building phases dynamically.",
      icon: <ShieldCheck className="w-6 h-6 text-neon-blue" />,
      color: "neon-blue",
      metric: "4D SIMULATION",
      gifUrl: "https://lh3.googleusercontent.com/d/1qpMsNkw8HaPhf97qubs7GEV1BkZKsydz",
      tags: ["Navisworks", "TimeLiner", "MS Project"],"""

app = app.replace(old_bim_06, new_bim_06)

with open('src/App.tsx', 'w') as f:
    f.write(app)
