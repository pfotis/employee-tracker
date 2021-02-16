const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const roleArray = [];
const departmentIdArray = [];

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
  init();
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
        'Delete department',
        'Delete employee',
        'Delete role',
        'View employee by manager',
        'Update employee`s manager',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all the departments': 
          viewallDepartment();
          break;
        case 'View all the employees': 
          viewallEmployees();
          break;
        case 'View all the roles': 
          viewallRole();
          break;
        case 'Add new employee':
          addnewEmployee();
          break;
        case 'Add new role':
          addnewRole();
          break;
        case 'Add new department':
          addnewDepartment();
          break;
        case 'Update employee role':
          updateRole();
          break;
        case 'Delete department':
          deleteDepartment();
          break;
        case 'Delete employee':
          deleteEmployee();
          break;
        case 'Delete role':
          deleteRole();
          break;
        case 'View employee by manager':
          viewEmployeeByManager();
          break;
        case 'Update employee`s manager':
          updateEmlpoyeeManager();
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

/*------------------------------------------------------------------------------------------------
                                        VIEW ALL THE EMPLOYEES
-------------------------------------------------------------------------------------------------*/

const viewallEmployees = () => {
  const query = `SELECT id, first_name, last_name, role_id, manager_id
                FROM employee`;
  connection.query(query, (err, res) => {
    console.log('\n');
    console.table(res);
    });
    start();
};

/*------------------------------------------------------------------------------------------------
                                        VIEW ALL THE DEPARTMENTS
-------------------------------------------------------------------------------------------------*/

const viewallDepartment = () => {
  const query = `SELECT id, name FROM department`;
  connection.query(query, (err, res) => {
    console.log('\n');
    console.table(res);
    });
    start();
};

/*------------------------------------------------------------------------------------------------
                                        VIEW ALL THE ROLES
-------------------------------------------------------------------------------------------------*/

const viewallRole = () => {
  const query = `SELECT role.id, title, salary, name FROM role
  INNER JOIN department ON role.department_id = department.id`;
  connection.query(query, (err, res) => {
    console.log('\n');
    console.table(res);
    });
    start();
};

/*------------------------------------------------------------------------------------------------
                                        ADD NEW EMPLOYEE
-------------------------------------------------------------------------------------------------*/

const addnewEmployee = () =>{
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
    choices:roleArray,
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


/*------------------------------------------------------------------------------------------------
                                        ADD NEW ROLE
-------------------------------------------------------------------------------------------------*/


const addnewRole = () =>{
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
    choices : departmentIdArray,
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

/*------------------------------------------------------------------------------------------------
                                        ADD NEW DEPARTMENT
-------------------------------------------------------------------------------------------------*/

const addnewDepartment = () =>{
inquirer.prompt([
  {
    name: 'name',
    type: 'input',
    message: 'What is the name of the department?',
  }
]).then((answer) => {
    const query = `INSERT INTO department (name) 
                  VALUES (?)`;
    connection.query(query, [answer.name], (err, res) => {
        console.log(`The new department was inserted successfully!`);
      });
      start();
  });
};

/*------------------------------------------------------------------------------------------------
                                        UPDATE ROLE FOR THE EMPLOYEE
-------------------------------------------------------------------------------------------------*/
const updateRole = () =>{
  inquirer.prompt([
    {
      name: 'id',
      type: 'input',
      message: 'What is the id of the employee?',
    },
    {
      name: 'role_id',
      type: 'rawlist',
      message: 'What is the new role id?',
      choices : roleArray,
    }
  ]).then((answer) => {
      const query = `UPDATE  employee SET role_id = ? 
                    WHERE id = ?`;
      connection.query(query, 
        [
          answer.role_id,
          answer.id
        ], (err, res) => {
          console.log(`The update role was successfully!`);
        });
        start();
    });
  };

/*------------------------------------------------------------------------------------------------
                                        DELETE EMPLOYEE
-------------------------------------------------------------------------------------------------*/

const deleteEmployee = () =>{
  inquirer.prompt([
    {
      name: 'id',
      type: 'input',
      message: 'What is the id of the employee?',
    },
  ]).then((answer) => {
      const query = `DELETE FROM employee WHERE id= ?`;
      connection.query(query, [answer.id], (err, res) => {
          console.log(`The employee was deleted successfully!`);
        });
        start();
    });
  };


/*------------------------------------------------------------------------------------------------
                                        DELETE DEPARTMENT
-------------------------------------------------------------------------------------------------*/

const deleteDepartment = () =>{
  inquirer.prompt([
    {
      name: 'id',
      type: 'input',
      message: 'What is the id of the department?',
    },
  ]).then((answer) => {
      const query = `DELETE FROM department WHERE id= ?`;
      connection.query(query, [answer.id], (err, res) => {
          console.log(`The department was deleted successfully!`);
        });
        start();
    });
  };

/*------------------------------------------------------------------------------------------------
                                        DELETE ROLE
-------------------------------------------------------------------------------------------------*/

const deleteRole = () =>{
  inquirer.prompt([
    {
      name: 'id',
      type: 'input',
      message: 'What is the id of the role?',
    },
  ]).then((answer) => {
      const query = `DELETE FROM role WHERE id= ?`;
      connection.query(query, [answer.id], (err, res) => {
          console.log(`The role was deleted successfully!`);
        });
        start();
    });
  };

/*------------------------------------------------------------------------------------------------
                                       VIEW EMPLOYEES BY MANAGER
-------------------------------------------------------------------------------------------------*/

const viewEmployeeByManager = () =>{
  inquirer.prompt([
    {
      name: 'id',
      type: 'input',
      message: 'What is the id of the manager?',
    },
  ]).then((answer) => {
      const query = `SELECT id, first_name, last_name, role_id, manager_id
      FROM employee WHERE manager_id= ?`;
      connection.query(query, [answer.id], (err, res) => {
        console.log('\n');
        console.table(res);
      });
        start();
    });
};

/*------------------------------------------------------------------------------------------------
                                       UPDATE EMPLOYEE'S MANAGER
-------------------------------------------------------------------------------------------------*/

const updateEmlpoyeeManager = () =>{
  inquirer.prompt([
    {
      name: 'id',
      type: 'input',
      message: 'What is the id of the employee?',
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'What is the id of the new manager?',
    }
  ]).then((answer) => {
      const query = `UPDATE employee SET manager_id = ? WHERE id = ?`;
      connection.query(query, 
        [
          answer.manager_id,
          answer.id
        ], (err, res) => {
      });
        start();
    });
};

const init = () => {
  getRoleArray();
  getDepartmentIdArray();
};

const getRoleArray = () => {
  const query = `SELECT id FROM role`;
  connection.query(query, (err, res) => {
    res.forEach(({id}) => {
      roleArray.push(id);
    });
  });
};

const getDepartmentIdArray = () => {
  const query = `SELECT id FROM role`;
  connection.query(query, (err, res) => {
    res.forEach(({id}) => {
      departmentIdArray.push(id);
    });
  });
};
