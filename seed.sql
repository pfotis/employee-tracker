DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
	id INTEGER(10),
    name VARCHAR(30),
    primary key(id)
);

CREATE TABLE role (
	id INTEGER(10),
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER(10),
    primary key(id)
);

CREATE TABLE employee (
	id INTEGER(10) AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(10),
    manager_id INTEGER(10),
    primary key(id)
);
