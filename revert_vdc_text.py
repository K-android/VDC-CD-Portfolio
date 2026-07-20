with open('src/components/VDCSection.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'Automating <span className="text-[#3B82F6]">AEC workflows</span> and managing <span className="text-[#3B82F6]">ISO 19650</span> facility data.',
    'Automating <span className="text-[#3B82F6]">AEC workflows</span> and managing <span className="text-[#3B82F6]">ISO 19650</span> facility data.'
) # Wait, it is already this?

content = content.replace(
    'Platform-level workflow automations, BIM data scripting, Revit MCP development, and ISO 19650 protocols to drive complex deliveries.',
    'Building automated workflows to expedite projects. Using reliable data models to ensure simple and scalable delivery.'
)

with open('src/components/VDCSection.tsx', 'w') as f:
    f.write(content)
