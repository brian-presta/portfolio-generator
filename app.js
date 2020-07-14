// var fs = require('fs')
var inquirer = require("inquirer")
// var generatePage = require('./src/page-template.js')
// const profileDataArgs = process.argv.slice(2, process.argv.length);
// var [name,github] = profileDataArgs;

// console.log(generatePage(name,github))
// fs.writeFile('index.html',generatePage(name,github),function(){return 'oops'})
var promptUser = function() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username'   
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself'   
        }
    ])    
};
promptUser().then(answers => console.log(answers))
