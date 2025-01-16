const fs = require('fs');
fs.writeFileSync('myfile.txt', 'This is a Node.js file system demo.');
const content =
fs.readFileSync('myfile.txt', 'utf-8');
console.log(content);