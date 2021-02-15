DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
	id INTEGER(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    primary key(id)
);

CREATE TABLE role (
	id INTEGER(10) NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER(10),
    primary key(id)
);

CREATE TABLE employee (
	id INTEGER(10) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER(10) NOT NULL,
    manager_id INTEGER(10) DEFAULT NULL,
    primary key(id)
);
