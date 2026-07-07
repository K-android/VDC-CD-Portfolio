const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /key=\{([^}]+)\}/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(match[1]);
}

const regex2 = /key="([^"]+)"/g;
let match2;
while ((match2 = regex2.exec(content)) !== null) {
  console.log('"' + match2[1] + '"');
}
