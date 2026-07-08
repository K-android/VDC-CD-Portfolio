import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('05_Project_Overview', '04_Project_Overview')
content = content.replace('06_The_Challenge', '05_The_Challenge')
content = content.replace('07_The_Solution', '06_The_Solution')
content = content.replace('08_Visual_Documentation', '07_Visual_Documentation')
content = content.replace('08_Project_Gallery', '07_Project_Gallery')
content = content.replace('09_Complete_Sheets', '08_Complete_Sheets')
content = content.replace('09_Project_Link', '08_Project_Link')

with open('src/App.tsx', 'w') as f:
    f.write(content)
