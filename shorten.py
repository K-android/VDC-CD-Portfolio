import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacements = {
    "Contributed to digital delivery across 5 residential units. Handled interior detailing, service coordination, and developed Vectorworks Marionette scripts to automate repetitive drafting.": "Digital delivery and interior detailing for 5 units, with custom Vectorworks automation scripts.",
    "Simulated solar, thermal, and wind performance to optimize resource-saving architecture.": "Solar, thermal, and wind simulations for optimizing resource-efficient architecture.",
    "Designed a modular, preassembled residential community for spiritual practitioners. Built precise parametric Revit families and rendered tranquil, quiet gardens.": "A modular residential community featuring precise parametric Revit families and tranquil garden renders.",
    "A 50-bed palliative care campus designed to celebrate nature, providing a warm, comforting space for patients and families.": "A 50-bed palliative care campus providing a warm, nature-integrated space for patients.",
    "Award-winning community pavilion built by transforming a decommissioned scrap bus with reclaimed materials.": "Award-winning community pavilion crafted from a decommissioned scrap bus and reclaimed materials.",
    "A lightweight, modular pavilion built with sustainable bamboo nodes and assembled in under 48 hours.": "A lightweight bamboo pavilion featuring sustainable nodes, assembled in under 48 hours.",
    "An academic project in Mangaluru designing an office tower with a self-shading double-glass facade to reduce glare and solar heat.": "Office tower design featuring a self-shading double-glass facade to mitigate solar heat.",
    "Modern brick-and-wood coffee house interior focusing on tactile warmth and natural skylight paths.": "Modern brick-and-wood coffee house interior focused on tactile warmth and natural skylighting.",
    "A Python API bridge that connects Gemini live language models directly with CNC/laser machines, automatically generating flat cut sheets from simple prompts.": "Python API bridge connecting Gemini models with CNC machines to generate cut sheets from prompts.",
    "An automated script that reads spreadsheet data to create hundreds of fully formatted building blueprints and sheets in Revit instantly.": "Dynamo script that reads spreadsheets to instantly generate formatted blueprints and sheets in Revit.",
    "A smart script that combs massive virtual models to extract exact quantities, doors, and furniture items into formatted Excel budget logs.": "Data extraction script that pulls precise material quantities from 3D models into Excel logs.",
    "An automated 3D collision checker that audits steel structures against pipes, flagging and color-coding coordination issues before they become on-site problems.": "3D collision checker auditing steel structures against MEP elements to flag coordination issues.",
    "A digital routing helper that automatically positions pipes and vents in structural 3D models using simple size and distance rules.": "Automated routing script that positions MEP pipes and vents using size and clearance rules.",
    "A scheduling tool that links calendar dates with 3D models, creating a virtual preview of the building process to avoid site blockages.": "4D scheduling tool linking timelines with 3D models to simulate and preview building phases.",
    "A smart research study contrasting simple automated design searchers (Galapagos) with complex multi-direction solvers (Wallacei) to find the best window shades for solar protection and material savings.": "Research comparing genetic solvers (Galapagos vs. Wallacei) for optimizing solar window shades.",
    "An experimental generative tool that treats programmatic spaces as intelligent, physical agents. Automatically resolves complex adjacency rules, structural grids, and multi-storey stacking within non-convex sites.": "Generative tool treating spaces as physical agents to auto-resolve adjacencies and structural grids.",
    "An automated serialization data bridge that streams high-fidelity topological coordinate matrices from Rhino design tools directly into Revit BIM environments, preserving full geometric intelligence at LOD 400.": "Data bridge streaming high-fidelity topological coordinates from Rhino to Revit at LOD 400."
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open('src/App.tsx', 'w') as f:
    f.write(content)

