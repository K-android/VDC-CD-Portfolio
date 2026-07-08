with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('{selectedArsenalItem.details.overview}', '{selectedArsenalItem.description}')

with open('src/App.tsx', 'w') as f:
    f.write(content)
