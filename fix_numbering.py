import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace('01_Comparative_Process_Visualization', '// 01 . COMPARATIVE PROCESS VISUALIZATION')
app = app.replace('01_{isArch ? "Visual_Narrative" : "Process_Visualization"}', '// 01 . {isArch ? "VISUAL NARRATIVE" : "PROCESS VISUALIZATION"}')
app = app.replace('02_{isArch ? "Methodology" : "Execution_Logic"}', '// 02 . {isArch ? "METHODOLOGY" : "EXECUTION LOGIC"}')
app = app.replace('03_{isArch ? "PROJECT_LEDGER" : "TECHNICAL_LEDGER"}', '// 03 . {isArch ? "PROJECT LEDGER" : "TECHNICAL LEDGER"}')
app = app.replace('04_Project_Overview', '// 04 . PROJECT OVERVIEW')
app = app.replace('05_The_Challenge', '// 05 . THE CHALLENGE')
app = app.replace('06_The_Solution', '// 06 . THE SOLUTION')
app = app.replace('07_Documentation', '// 07 . DOCUMENTATION')
app = app.replace('07_Key_Metrics_&_Performance_Impact', '// 07 . KEY METRICS & PERFORMANCE IMPACT')
app = app.replace('08_Thesis_Presentation_Sheets', '// 08 . THESIS PRESENTATION SHEETS')
app = app.replace('09_{isArch ? "Technical_Gallery_&_Visuals" : "System_Drawings_&_Analytics"}', '// 09 . {isArch ? "TECHNICAL GALLERY & VISUALS" : "SYSTEM DRAWINGS & ANALYTICS"}')
app = app.replace('10_{isArch ? "Detailed_Drawings_&_Presentations" : "Executive_Briefings"}', '// 10 . {isArch ? "DETAILED DRAWINGS & PRESENTATIONS" : "EXECUTIVE BRIEFINGS"}')
app = app.replace('11_{isArch ? "Site_Visits_&_Progress" : "Executive_Briefings"}', '// 11 . {isArch ? "SITE VISITS & PROGRESS" : "EXECUTIVE BRIEFINGS"}')

with open('src/App.tsx', 'w') as f:
    f.write(app)
