const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /tags:\s*\[(.*?)\]/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const tagsStr = match[1];
  const tags = tagsStr.split(',').map(s => s.trim().replace(/['"]/g, ''));
  const duplicates = tags.filter((item, index) => tags.indexOf(item) !== index);
  if (duplicates.length > 0) {
    console.log("Duplicate tag found!", duplicates, tags);
  }
}
console.log("Done checking tags.");
