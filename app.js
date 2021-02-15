const inquirer = require('inquirer');
const mysql = require('mysql');



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
        'View all the employees',
        'Add new department',
        'Add new employee',
        'Add new role',
        'Exit',
      ], 
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all the employees': {
          viewAllEmployees();
          start();
          break;
        }
        case 'Add new employee':
         addNewEmployee();
          break;
        case 'Add new role':
          addNewRole();
          break;
        case 'Add new department':
          addNewDepartment();
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

const viewAllEmployees = () => {
    const query = `SELECT employee.id, first_name, last_name, name, title, salary, manager_id
                  FROM employee
                  INNER JOIN role ON employee.role_id = role.id
                  INNER JOIN department ON  role.department_id = department.id
                  ORDER BY employee.id`;
    connection.query(query, (err, res) => {
      console.log(`id   first name   last name  department   title  salary   manager`);
      console.log(`--------------------------------------------------------------`);
      res.forEach(({id, first_name, last_name, name, title, salary, manager_id }) => {
        console.log(`${id}    ${first_name}     ${last_name}  ${name}   ${title}  ${salary}     ${manager_id}`);
      });
      start();
    });
};

const addNewEmployee = () =>{
    inquirer.prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'What is the first name of the employee?',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'What is the last name of the employee?',
      },
      {
        name: 'role_id',
        type: 'rawlist',
        message: 'What is the role id of the employee?',
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'What is the manager ID of the employee?',
      },
    ]).then((answer) => {
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                      VALUES (?, ?, ?, ?)`;
        connection.query(query, 
          [
            answer.first_name,
            answer.last_name,
            answer.role_id,
            answer.manager_id,
          ], (err, res) => {
            console.log(`The new employee was inserted successfully!`);
          });
          start();
      });
};

const addNewRole = () =>{
  inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'What is the title of the role?',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is the salary of the role?',
    },
    {
      name: 'department_id',
      type: 'rawlist',
      message: 'What is the department id of the role?',
    },
  ]).then((answer) => {
      const query = `INSERT INTO employee (title, salary, department_id) 
                    VALUES (?, ?, ?)`;
      connection.query(query, 
        [
          answer.title,
          answer.salary,
          answer.department_id,
        ], (err, res) => {
          console.log(`The new role was inserted successfully!`);
        });
        start();
    });
};

  
const addNewDepartment = () =>{
  inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'What is the name of the department?',
    }
  ]).then((answer) => {
      const query = `INSERT INTO employee (name) 
                    VALUES (?)`;
      connection.query(query, 
        [
          answer.name
        ], (err, res) => {
          console.log(`The new department was inserted successfully!`);
        });
        start();
    });
};
