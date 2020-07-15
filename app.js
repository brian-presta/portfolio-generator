var fs = require('fs')
var inquirer = require("inquirer")
var generatePage = require('./src/page-template.js')
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
    fs.writeFile('./dist/index.html',generatePage(portfolioData),function(err) {
      if (err) {
        console.log(err)
        return
      }
      console.log('Page created!')
      fs.copyFile('./src/style.css','./dist/style.css',err => {
        if (err) {
        console.log(err)
        return
        }
        console.log('Style sheet copied!')
      })
    })
  });
var dummy = {
  name: 'Lernantino',
  github: 'lernantino',
  confirmAbout: true,
  about:
    'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
  projects: [
    {
      name: 'Run Buddy',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
      languages: ['HTML', 'CSS'],
      link: 'https://github.com/lernantino/run-buddy',
      feature: true,
      confirmAddProject: true
    },
    {
      name: 'Taskinator',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
      languages: ['JavaScript', 'HTML', 'CSS'],
      link: 'https://github.com/lernantino/taskinator',
      feature: true,
      confirmAddProject: true
    },
    {
      name: 'Taskmaster Pro',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
      languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
      link: 'https://github.com/lernantino/taskmaster-pro',
      feature: false,
      confirmAddProject: true
    },
    {
      name: 'Robot Gladiators',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
      languages: ['JavaScript'],
      link: 'https://github.com/lernantino/robot-gladiators',
      feature: false,
      confirmAddProject: false
    }
  ]
};
// console.log(generatePage(dummy))
// fs.copyFile('./src/style.css','./dist/style.css',err => console.log(err))
// fs.writeFile('./dist/index.html',generatePage(dummy),function(){return 'oops'})
