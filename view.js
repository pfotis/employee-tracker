const inquirer = require('inquirer');
const mysql = require('mysql');

const allEmployees = () => {
    const query = `SELECT employee.id, first_name, last_name, title, manager_id
                  FROM employee
                  INNER JOIN role ON employee.role_id = role.id
                  ORDER BY employee.id`;
    connection.query(query, (err, res) => {
      console.log(`id   first name   last name   title   manager`);
      console.log(`--------------------------------------------------------`);
      res.forEach(({id, first_name, last_name, title, manager_id }) => {
        console.log(`${id}   ${first_name}   ${last_name}   ${title}   ${manager_id}`);
      });
      start();
    });
};

const allDepartment = () => {
    const query = `SELECT id, name FROM department`;
    connection.query(query, (err, res) => {
      console.log(`id   name   `);
      console.log(`-------------------------`);
      res.forEach(({id, name }) => {
        console.log(`${id}   ${name}`);
      });
      start();
    });
};

const allRole = () => {
    const query = `SELECT role.id, title, salary, name FROM role
    INNER JOIN department ON role.department_id = department.id`;
    connection.query(query, (err, res) => {
      console.log(`id  title  salary  name`);
      console.log(`-------------------------`);
      res.forEach(({id,  title,  salary,  name}) => {
        console.log(`${id}   ${title}     ${salary}     ${name}`);
      });
      start();
    });
};

module.exports = {
    allEmployees,
    allDepartment,
    allRole
}