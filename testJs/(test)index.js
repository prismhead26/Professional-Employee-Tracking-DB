const fs = require('fs')
const csv = require('fast-csv');
const data = []
 
fs.createReadStream('./dataDemo.csv')
 .pipe(csv.parse({ headers: false }))
 .on('error', error => console.error(error))
 .on('data', row => data.push(row))
 .on('end', () => console.log(data));

