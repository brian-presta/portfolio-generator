var fs = require('fs')
const generatePage = require('./src/page-template.js')
const profileDataArgs = process.argv.slice(2, process.argv.length);
const [name,github] = profileDataArgs;

console.log(generatePage(name,github))
fs.writeFile('index.html',generatePage(name,github),function(){return 'oops'})
