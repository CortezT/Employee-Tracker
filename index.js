require('dotenv').config();

const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
    startApp();
});

function startApp() {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit',
            ],
        })
        .then((answers) => {
            switch (answers.action) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    connection.end();
                    console.log('Goodbye!');
                    break;
            }
        });
}

function viewDepartments() {
}

function viewRoles() {
}

function viewEmployees() {
}

function addDepartment() {
    inquirer
        .prompt({
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:',
        })
        .then((answer) => {
        });
}

function addRole() {
}

function addEmployee() {
}

function updateEmployeeRole() {
}