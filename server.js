const inquirer = require('inquirer');
const connection = require('./assets/config/connection')

connection.connect((err) => {
  if (err) throw err;
  runQuestions();
});

const runQuestions = () =>{
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all the employees',
        'Add new employee',
        'exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all the employees':
         // todo function
          break;
        case 'Add new employee':
         // todo function
          break;
        case 'Exit':
          connection.end();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};