const inquirer = require('inquirer');
const mysql = require('mysql');

const add = require('./add.js');
const view = require('./view.js');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'p@ssworD',
  
  database: 'employeeDB',
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
  start();
});

const start = () =>{
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices:[
        'View all the departments',
        'View all the employees',
        'View all the roles',
        'Add new department',
        'Add new employee',
        'Add new role',
        'Update employee role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all the departments': 
          view.allDepartment();
          break;
        case 'View all the departments': 
          view.allEmployees();
          break;
        case 'View all the roles': 
          view.allRole();
          break;
        case 'Add new employee':
          add.newEmployee();
          break;
        case 'Add new role':
          add.newRole();
          break;
        case 'Add new department':
          add.newDepartment();
          break;
        case 'Update employee role':
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

const getAllTheRoles = () => {
	const query = 'SELECT id, title FROM role';

	connection.query(query, function (err, res) {
		for(let i=0; i<res.length; i++){
      roleArray.push(res[i].title);
    }
  });	
};