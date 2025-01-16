const fs = require('fs');
const now = new Date().toLocaleString();
fs.appendFileSync('log.txt', 'Log entry: ${now}\n');
console.log('log entry added.');