import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# find `const bimArsenal: ArsenalItem[] = [`
start_idx = content.find("const bimArsenal: ArsenalItem[] = [")
# find the next `  ];` which closes the array
end_idx = content.find("  ];", start_idx) + 4

array_content = content[start_idx:end_idx]

# Split the array_content into items
# Each item starts with `    {` and ends with `    },` or `    }` before the end.
items = []
current_item = []
brace_count = 0

lines = array_content.split('\n')
header = lines[0] # "  const bimArsenal: ArsenalItem[] = ["
footer = lines[-1] # "  ];"

inside_item = False
for line in lines[1:-1]:
    if line == "    {" and not inside_item:
        inside_item = True
        current_item.append(line)
        brace_count = 1
        continue
        
    if inside_item:
        current_item.append(line)
        # count braces to know when item ends
        brace_count += line.count('{') - line.count('}')
        if brace_count == 0:
            if line.strip() in ['},', '}']:
                items.append("\n".join(current_item))
                current_item = []
                inside_item = False

print(f"Found {len(items)} BIM items")

def get_id(item_str):
    match = re.search(r'id:\s*"([^"]+)"', item_str)
    return match.group(1) if match else "UNKNOWN"

item_dict = {get_id(item): item for item in items}

print("IDs:", list(item_dict.keys()))

# Desired order:
desired_order = [
    "BIM_08", # Agent-Based Space Planning & Structural Solver
    "BIM_07", # The Multi-Objective Eco-Parametric Solver
    "BIM_01", # The LLM Fabrication Engine
    "BIM_09", # Rhino-to-Revit API Interoperability Pipeline
    "BIM_02", # The Generative Documentation Engine (Dynamo)
    "BIM_03", # The 5D Data Harvester
    "BIM_05", # The MEP Component Automator (3rd last)
    "BIM_04", # The Clash Matrix Pipeline (Navisworks 2nd last)
    "BIM_06"  # The 4D Matrix (TimeLiner) (Navisworks last)
]

new_items_str = []
for i, item_id in enumerate(desired_order):
    item_str = item_dict[item_id]
    if i < len(desired_order) - 1:
        if not item_str.endswith(','):
            item_str += ','
    else:
        if item_str.endswith(','):
            item_str = item_str[:-1]
    new_items_str.append(item_str)

new_array_content = header + "\n" + "\n".join(new_items_str) + "\n" + footer

new_content = content[:start_idx] + new_array_content + content[end_idx:]

with open('src/App.tsx', 'w') as f:
    f.write(new_content)

print("Reordered!")
