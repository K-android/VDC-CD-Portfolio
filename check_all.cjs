const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');
const { execSync } = require('child_process');

const regex = /https:\/\/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/g;
let match;
const ids = new Set();
while ((match = regex.exec(content)) !== null) {
  ids.add(match[1]);
}

for (const id of ids) {
    try {
        const out = execSync(`curl -sL "https://lh3.googleusercontent.com/d/${id}" | head -c 20`);
        const str = out.toString();
        if (str.includes("<!doctype html>") || str.includes("<!DOCTYPE html>")) {
            console.log(id, "PRIVATE OR ERROR");
        } else if (str.includes("Not Found")) {
            console.log(id, "NOT FOUND");
        } else {
            // console.log(id, "OK");
        }
    } catch(e) {
        console.log(id, "FAIL");
    }
}
