import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacements = {
    'overview: "Contributed to GFC documentation and digital delivery for a luxury villa development across two sites - Zirad and Saral, Alibaug. Responsibilities spanned across 5 residential units.",':
    'overview: "This professional project involved comprehensive GFC documentation and digital delivery for a high-end luxury villa development spread across two exclusive sites in Zirad and Saral, Alibaug. The scope included precise interior detailing, FF&E schedules, and MEP coordination for 5 bespoke residential units, significantly streamlining the construction process using custom Vectorworks Marionette automation scripts.",',

    'overview: "An award-winning design to provide ultra-affordable, energy-efficient housing for construction workers in India.",':
    'overview: "An award-winning, net-zero housing framework aimed at providing ultra-affordable and energy-efficient living conditions for construction workers in India. By utilizing advanced environmental simulations for solar, thermal, and wind performance, the project successfully minimizes reliance on artificial cooling while ensuring a dignified and sustainable habitat.",',

    'overview: "A prefabricated modular housing neighborhood designed to support the minimalistic lifestyles and meditative quiet of spiritual practitioners.",':
    'overview: "A prefabricated modular housing neighborhood thoughtfully conceptualized to support the minimalistic lifestyles and meditative tranquility of spiritual practitioners. Through the rigorous use of precise parametric Revit families, the project merges rapid, efficient off-site assembly with the creation of deeply serene, naturally integrated living spaces.",',

    'overview: "A peaceful 50-bed hospice camp that trades sterile, cold hospital corridors for natural, cozy wooden homes.",':
    'overview: "A compassionate 50-bed palliative care and hospice campus that reimagines end-of-life care by trading sterile, clinical hospital corridors for natural, cozy wooden pavilions. The design focuses heavily on biophilic principles, ensuring that patients and their families are constantly connected to healing gardens and soothing natural light.",',

    'overview: "A real hands-on community design project to prove how scrap vehicles can be recycled into beautiful public spaces.",':
    'overview: "A hands-on, award-winning community design-build initiative focused on functional adaptive reuse. By transforming a decommissioned scrap bus and utilizing locally sourced reclaimed materials, the project proves how discarded urban artifacts can be successfully recycled into vibrant, highly functional public gathering spaces.",',

    'overview: "An experimental screen pavilion designed to merge traditional bamboo building with fast, modern 3D design plans.",':
    'overview: "An experimental, lightweight screen pavilion designed to bridge the gap between traditional bamboo craftsmanship and modern parametric 3D design workflows. The structure features sustainable, custom-designed structural nodes that allowed the entire architectural installation to be efficiently assembled on-site in under 48 hours.",',

    'overview: "A premium office tower concept focused on worker wellness. The design replaces standard glass towers with stacked green open-air pocket terraces.",':
    'overview: "An academic thesis proposing a high-performance, premium office tower with a core focus on ecological worker wellness. Rejecting the conventional monolithic glass tower, this design introduces a self-shading double-glass facade and integrates stacked, open-air green pocket terraces to naturally mitigate solar heat gain and reduce glare.",',

    'overview: "A boutique coffee house designed as an open urban hub between home and work.",':
    'overview: "A boutique interior architecture project for a modern coffee house, designed to serve as an inviting urban hub bridging the gap between home and the workplace. The design emphasizes tactile warmth through a sophisticated palette of exposed brick and natural wood, dramatically enhanced by strategic skylighting and shadow play.",',

    'overview: "A direct workflow connecting AI chat with laser and CNC machinery, translating text requests into physical building shapes automatically.",':
    'overview: "A cutting-edge digital fabrication workflow that establishes a direct API bridge connecting Gemini live language models with CNC and laser machinery. This pipeline translates natural language text requests directly into precise, physical architectural components, automatically unfolding and nesting the generated 3D surfaces into ready-to-cut 2D flat sheets.",',

    'overview: "A business automation tool that builds complete client-ready printable sheets instantly from reference spreadsheets.",':
    'overview: "A robust business automation utility that drastically accelerates architectural documentation. By reading structured spreadsheet data, this Dynamo-powered script instantly generates hundreds of fully formatted, client-ready blueprints and drawing sheets in Revit, effectively eliminating weeks of manual drafting and mitigating human error.",',

    'overview: "An automated data picker and builder that extracts exact material volumes and catalog items directly from building shapes.",':
    'overview: "An automated 5D BIM data-mining solution designed to extract exact material volumes, component counts, and catalog items directly from complex 3D building geometries. This Python-driven script actively scans the model\'s background database to compile structured, error-free Excel budget logs for highly accurate cost estimations.",',

    'overview: "A coordination system that prevents design clashes between building fields before crews begin pouring concrete.",':
    'overview: "A critical BIM coordination system engineered to prevent costly on-site design clashes between structural frames and MEP systems before concrete is poured. The automated 3D collision checker audits steel structures against pipes and ducts, intelligently grouping and color-coding spatial conflicts to prioritize major structural layout resolutions.",',

    'overview: "An automated design script that paths water pipes, duct systems, and electrical channels directly into empty building cavities.",':
    'overview: "An automated MEP routing script that computationally paths water pipes, HVAC duct systems, and electrical channels directly into designated building cavities. Utilizing predefined size clearances and distancing rules, the script programmatically aligns and connects components, ensuring an optimized, collision-free internal utility network.",',

    'overview: "An interactive video timeline that lets contractors watch the daily building progress virtually to coordinate crane and crew arrivals.",':
    'overview: "An advanced 4D scheduling tool that links traditional calendar milestones with 3D structural models to generate an interactive, virtual timeline. This dynamic simulation allows contractors and project managers to watch daily building progress virtually, effectively coordinating logistics, crane positioning, and crew arrivals to avoid site blockages.",',

    'overview: "A research project testing simple single-point optimization against multi-goal genetic search paths to design high-performance solar window grids.",':
    'overview: "A rigorous computational research study contrasting simple automated design algorithms (Galapagos) against complex, multi-objective genetic solvers (Wallacei). The study focused on optimizing high-performance solar window shades, ultimately establishing a parallel solving methodology that successfully reduced structural weight while maximizing interior sun protection.",',

    'overview: "An experimental generative design tool that reframes early-stage architectural programming and space planning as a dynamic physics simulation rather than a manual, trial-and-error drafting task. Given a site and a programmatic brief, it uses multi-objective vectors to automatically arrange spaces.",':
    'overview: "An experimental generative design engine that revolutionizes early-stage architectural programming by treating programmatic spaces as intelligent, physical agents. Operating as a dynamic physics simulation rather than a manual drafting task, it leverages multi-objective vectors to automatically resolve complex adjacency requirements, structural grids, and multi-storey stacking within highly constrained, non-convex site boundaries.",',

    'overview: "The project addresses a critical industry bottleneck: the loss of data integrity and parametric intelligence when translating complex geometries from Rhino into native BIM environments like Autodesk Revit.",':
    'overview: "A highly specialized data-bridge solution addressing a critical AEC industry bottleneck: the persistent loss of parametric data integrity when migrating complex geometries from Rhino into Revit. By streaming lightweight, serialized topological coordinate matrices, this automated tool instantly redraws thousands of fully editable, native LOD 400 direct-shape elements without relying on heavy, broken meshes.",'
}

for old, new in replacements.items():
    if old in content:
        content = content.replace(old, new)
    else:
        print("Could not find:", old[:50])

with open('src/App.tsx', 'w') as f:
    f.write(content)

