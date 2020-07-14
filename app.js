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
            message: 'What is your name?',
            validate: input => {
                if (input) {
                  return true;
                } 
                else {
                  console.log('Please enter your name!');
                  return false;
                }
              }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username',
            validate: input => {
                if (input) {
                  return true;
                } 
                else {
                  console.log('Please enter your user name!');
                  return false;
                }
              }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: "Would you like to enter a bio?",
            default: false
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself' ,
            when:  ({confirmAbout}) => confirmAbout
        }
    ])    
};
var promptProject = function(portfolioData) {
    if (!portfolioData.projects) {    
        portfolioData.projects = []
    }
    console.log(`
    =================
    Add a New Project
    =================
    `)
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: input => {
                if (input) {
                  return true;
                } 
                else {
                  console.log("Please enter your project's name!");
                  return false;
                }
              }
          },
          {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: input => {
                if (input) {
                  return true;
                } 
                else {
                  console.log("Please enter your project's description!");
                  return false;
                }
              }
          },
          {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
          },
          {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: input => {
                if (input) {
                  return true;
                } 
                else {
                  console.log("Please enter your project's link!");
                  return false;
                }
              }
          },
          {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
          },
          {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
          }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData)
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData)
        }
        else {
            return portfolioData
        }
    })
};
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });