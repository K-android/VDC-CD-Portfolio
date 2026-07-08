import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# We only want to replace it for BIM_07.
# Let's find the BIM_07 block and replace inside it.
start = content.find('id: "BIM_07"')
end = content.find('id: "BIM_01"', start) # Actually wait, BIM_01 is now next. Let's find the next 'id: '
if end == -1: end = start + 2000 # fallback

# Wait, BIM_07 is now followed by BIM_01.
next_id_idx = content.find('id: "', start + 10)
end = next_id_idx if next_id_idx != -1 else start + 2000

bim_07_content = content[start:end]
new_bim_07_content = bim_07_content.replace('https://lh3.googleusercontent.com/d/1PHbRg6P6mh3Hmmw3yBPfp98sg0ihzO7F', 'https://lh3.googleusercontent.com/d/1MrB6VdmorBcdtuSIq1eLdV1FTylWXOyN')

content = content[:start] + new_bim_07_content + content[end:]

with open('src/App.tsx', 'w') as f:
    f.write(content)

