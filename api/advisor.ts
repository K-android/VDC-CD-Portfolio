import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "No task description provided" });
  }

  const prompt = `AEC Manual Task to Automate: "${task}"

Please design a comprehensive structural automation strategy, detailing the pipeline, software libraries, specific steps, and sample pseudocode/script context for this automation.`;

  // Check if GEMINI_API_KEY is available
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. Using high-fidelity local expert mock generator fallback.");
    // High-fidelity fallback strategies for popular AEC questions to keep it super rich and functional even offline!
    const mockResponse = getMockAECStrategy(task);
    return res.json({ response: mockResponse, isFallback: true });
  }

  try {
    // Lazy initialization
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are a Senior Computational Architect, BIM Manager, and expert full-stack developer specializing in AEC (Architecture, Engineering, and Construction) automations, computational design (Grasshopper, Dynamo), and BIM data scripting (Revit API, PyRevit, C#, Python).

The user will provide a manual design or coordination task.
Provide a highly specific, professional, and technical markdown guide.
Structure your guide with these exact sections:
### 1. Automation Architecture & Technology Stack
Provide the recommended languages (e.g., Python, C#, TypeScript), platforms (e.g., pyRevit, Grasshopper, Dynamo, Revit API), and specific libraries (e.g., Autodesk.Revit.DB, RhinoCommon, pandas).

### 2. High-Level Automation Pipeline
Explain the data flow and execution trigger (e.g., live button click, scheduled batch run).

### 3. Step-by-Step Technical Implementation
Detail 4-5 numbered steps explaining how to access API objects, modify parameters, and handle transaction scopes safely.

### 4. Sample Script / Psuedocode Implementation
Provide a beautiful, highly realistic code block (typically Python using pyRevit or C#) illustrating how to isolate components, extract parameters, perform calculations, or rewrite coordinates. Include comments inside the code.

Keep the tone expert, pragmatic, and detailed. Highlight real BIM pitfalls (e.g., Transaction scopes, thread coordination, invalid element IDs). Do not use placeholders; write complete realistic concepts.`,
        temperature: 0.2,
      },
    });

    return res.json({ response: response.text });
  } catch (error: any) {
    console.error("Gemini Advisor API Error:", error);
    // Gracefully send mock expert response as fallback instead of crashing
    const mockResponse = getMockAECStrategy(task);
    return res.json({ response: mockResponse, isFallback: true, error: error?.message });
  }
}

function getMockAECStrategy(task: string): string {
  const normalized = task.toLowerCase();

  if (normalized.includes("join") || normalized.includes("wall") || normalized.includes("cleanup")) {
    return `### 1. Automation Architecture & Technology Stack
- **Language**: Python (IronPython 2.7 / CPython 3)
- **Engine**: pyRevit runtime environment
- **API Reference**: \`Autodesk.Revit.DB\` namespace (Revit API)
- **Classes**: \`JoinGeometryUtils\`, \`FilteredElementCollector\`, \`Line\`, \`FamilyInstance\`

### 2. High-Level Automation Pipeline
This automation scans all overlapping structural and architectural elements (walls, floors, or columns) in the active document, checks if they are currently unjoined, and cleanly invokes Revit's native join engine within a single wrapped transaction.

### 3. Step-by-Step Technical Implementation
1. **Isolate Active Context**: Access the current document (\`doc\`) and find all elements within the target active view.
2. **Query Overlap Regions**: Use a \`FilteredElementCollector\` combined with an \`ElementIntersectsElementFilter\` or \`BoundingBoxIntersectsFilter\` to narrow down elements that are physically colliding.
3. **Transaction Execution**: Open a Revit \`Transaction\` scope. This is crucial as database modifications are prohibited outside transaction blocks.
4. **Evaluate and Join**: Loop through pairs. Verify if they can be joined using \`JoinGeometryUtils.AreElementsJoined()\`. If false, trigger \`JoinGeometryUtils.JoinGeometry()\`.
5. **Exception and Error Handling**: Wrap in try/except to catch read-only warning dialogs, and commit the transaction safely.

### 4. Sample Script / C# Implementation
Here is a complete pyRevit Python block to run straight on your Revit ribbon:

\`\`\`python
# -*- coding: utf-8 -*-
from Autodesk.Revit.DB import *
from pyrevit import revit, db

doc = revit.doc

# Start the transaction
with db.Transaction("Auto Join Wall-Floor"):
    # Collect all walls in active view
    collector_walls = FilteredElementCollector(doc, doc.ActiveView.Id)\\
                        .OfCategory(BuiltInCategory.OST_Walls)\\
                        .WhereElementIsNotElementType()
    
    # Collect all floors
    collector_floors = FilteredElementCollector(doc, doc.ActiveView.Id)\\
                         .OfCategory(BuiltInCategory.OST_Floors)\\
                         .WhereElementIsNotElementType()
    
    joined_count = 0
    
    for wall in collector_walls:
        wall_bbox = wall.get_BoundingBox(doc.ActiveView)
        if not wall_bbox:
            continue
            
        # Create outline filter based on wall bounding box
        outline = Outline(wall_bbox.Min, wall_bbox.Max)
        intersect_filter = BoundingBoxIntersectsFilter(outline)
        
        # Collect overlapping floors representing intersects
        overlapping_floors = FilteredElementCollector(doc)\\
                                .OfCategory(BuiltInCategory.OST_Floors)\\
                                .WherePasses(intersect_filter)\\
                                .WhereElementIsNotElementType()
        
        for floor in overlapping_floors:
            # Check if they can physically join
            if not JoinGeometryUtils.AreElementsJoined(doc, wall, floor):
                try:
                    JoinGeometryUtils.JoinGeometry(doc, wall, floor)
                    joined_count += 1
                except Exception as ex:
                    # Ignore invalid configurations (e.g. non-overlapping sketch bounds)
                    pass

print("SUCCESS: Unified unjoined bounds. Successfully established {} geometry joints!".format(joined_count))
\`\`\``;
  }

  if (normalized.includes("carbon") || normalized.includes("sustainability") || normalized.includes("embodied")) {
    return `### 1. Automation Architecture & Technology Stack
- **Language**: Python (IronPython / CPython)
- **Host**: Rhino Grasshopper with Gpython or Hops.
- **Libraries**: Ladybug Environmental Plugins, \`sqlite3\`, \`pandas\`
- **Database**: ICE (Inventory of Carbon and Energy) Database in JSON or SQLite format.

### 2. High-Level Automation Pipeline
A live material tracker that hooks into Rhino's geometry pipeline, queries spatial items (Concrete, Steel, Timber), joins family metadata with a local SQLite carbon coefficients database, and projects live metric charts detailing the total Embodied Carbon footprint.

### 3. Step-by-Step Technical Implementation
1. **Geometry Stream**: Connect custom-formed curves and solids straight to Grasshopper's canvas.
2. **Access Quantity Attributes**: Query volume values (m³) and reference material assignments dynamically.
3. **Database Lookup**: Read carbon coefficient variables (kgCO2e per kg) matching specified concrete mixtures or wood grades.
4. **Footprint Computation**: Multiply Quantity $\\times$ Density $\\times$ Coefficient. Accumulate total value parameters.
5. **Reactive Output**: Render live values and display carbon optimization checklists in real-time.

### 4. Sample Script / GH Python Implementation
\`\`\`python
# Combined live carbon calculator node
import sqlite3

def calculate_carbon(material_name, volume_m3):
    # Dummy ICE carbon coefficients lookup table (kgCO2e/kg)
    # Average Density mappings (kg/m3)
    database = {
        "reinforced concrete (30mpa)": {"factor": 0.13, "density": 2400},
        "structural steel (s355)": {"factor": 1.91, "density": 7850},
        "clt timber (spruce)": {"factor": 0.45, "density": 500},
        "glulam engineered wood": {"factor": 0.39, "density": 480}
    }
    
    mat = material_name.lower().strip()
    if mat in database:
        stats = database[mat]
        mass_kg = volume_m3 * stats["density"]
        total_carbon_kg = mass_kg * stats["factor"]
        return total_carbon_kg
    return 0.0

# Input arguments provided by GH canvas: Materials (list), Volumes (list)
output_carbon_metrics = []
total_carbon_load = 0.0

for i in range(len(Materials)):
    carbon = calculate_carbon(Materials[i], Volumes[i])
    output_carbon_metrics.append(carbon)
    total_carbon_load += carbon

# Output variables bound back into canvas
g_totals = total_carbon_load
g_list = output_carbon_metrics
\`\`\``;
  }

  // Default general AEC fallback
  return `### 1. Automation Architecture & Technology Stack
- **Language**: C# or Python
- **API Reference**: Autodesk.Revit.DB, pyRevit, or Speckle Server API
- **Libraries**: \`OpenPanel\`, \`RhinoCommon\`, or standard library utilities

### 2. High-Level Automation Pipeline
A computational routine that automatically standardizes drawing naming grids, checks coordinates, clean duplicates, or maps parameters across multiple models simultaneously to eliminate manual clerical overhead.

### 3. Step-by-Step Technical Implementation
1. **File Access**: Establish read lock/write access permissions matching source folders or cloud servers.
2. **Geometry/BIM Parameter Extraction**: Query exact categories to isolate targeting entities.
3. **Execute Logic & Rules Strategy**: Apply calculations, rename text grids, or adjust coordination nodes.
4. **Reconcile Database Changes**: Package updates into transactions and commit to files.
5. **Status Verification**: Validate that all elements compile without warning guidelines.

### 4. Sample C# Script Concept
\`\`\`csharp
using System;
using System.Collections.Generic;
using Autodesk.Revit.DB;

public void StandardizeParameters(Document doc, string modelProperty)
{
    // Initialize standard FilteredElementCollector
    FilteredElementCollector collector = new FilteredElementCollector(doc);
    ICollection<Element> views = collector.OfClass(typeof(View)).ToElements();
    
    using (Transaction trans = new Transaction(doc, "BIM Registry Update"))
    {
        trans.Start();
        foreach (Element element in views)
        {
            View view = element as View;
            if (view != null && !view.IsTemplate)
            {
                // Assign compliant parameters of modelProperty standard
                Parameter param = view.LookupParameter("Drawing_Phase");
                if (param != null && !param.IsReadOnly)
                {
                    param.Set("COMPLIANT_" + modelProperty.ToUpper());
                }
            }
        }
        trans.Commit();
    }
}
\`\`\``;
}
