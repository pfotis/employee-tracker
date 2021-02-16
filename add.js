const inquirer = require('inquirer');
const mysql = require('mysql');


    
const newEmployee = () =>{
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

const newRole = () =>{
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
      const query = `INSERT INTO role (title, salary, department_id) 
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

  
const newDepartment = () =>{
  inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'What is the name of the department?',
    }
  ]).then((answer) => {
      const query = `INSERT INTO department (name) 
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
module.exports = {
    newEmployee,
    newRole,
    newDepartment
}