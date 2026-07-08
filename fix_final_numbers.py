import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('08_Documentation', '07_Documentation')
content = content.replace('08_Key_Metrics_&_Performance_Impact', '07_Key_Metrics_&_Performance_Impact')
content = content.replace('03_Thesis_Presentation_Sheets', '08_Thesis_Presentation_Sheets')
content = content.replace('09_{isArch ? "Technical_Gallery_&_Visuals" : "System_Drawings_&_Analytics"}', '09_{isArch ? "Technical_Gallery_&_Visuals" : "System_Drawings_&_Analytics"}')

with open('src/App.tsx', 'w') as f:
    f.write(content)
