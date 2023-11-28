require('dotenv').config(); // Load environment variables from .env file
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
        .then(handleUserAction);
}

function handleUserAction(answer) {
    switch (answer.action) {
        case 'View all departments':
            return viewDepartments();
        case 'View all roles':
            return viewRoles();
        case 'View all employees':
            return viewEmployees();
        case 'Add a department':
            return addDepartment();
        case 'Add a role':
            return addRole();
        case 'Add an employee':
            return addEmployee();
        case 'Update an employee role':
            return updateEmployeeRole();
        case 'Exit':
            connection.end();
            console.log('Goodbye!');
            break;
    }
}

function viewDepartments() {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, results) => {
        if (err) throw err;

        console.table(results);
        startApp(); // Return to the main menu
    });
}

function viewRoles() {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, results) => {
        if (err) throw err;

        console.table(results);
        startApp(); // Return to the main menu
    });
}

function viewEmployees() {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, results) => {
        if (err) throw err;

        console.table(results);
        startApp(); // Return to the main menu
    });
}

function addDepartment() {
    inquirer
        .prompt({
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:',
        })
        .then((answer) => {
            const query = 'INSERT INTO department (name) VALUES (?)';
            const values = [answer.name];

            connection.query(query, values, (err, result) => {
                if (err) throw err;

                console.log('Department added successfully!');
                startApp(); // Return to the main menu
            });
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the role:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the role:',
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department ID for the role:',
            },
        ])
        .then((answers) => {
            const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
            const values = [answers.title, answers.salary, answers.department_id];

            connection.query(query, values, (err, result) => {
                if (err) throw err;

                console.log('Role added successfully!');
                startApp(); // Return to the main menu
            });
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "Enter the employee's first name:",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "Enter the employee's last name:",
            },
            {
                type: 'input',
                name: 'role_id',
                message: "Enter the employee's role ID:",
            },
            {
                type: 'input',
                name: 'manager_id',
                message: "Enter the employee's manager ID (leave blank if none):",
            },
        ])
        .then((answers) => {
            const { first_name, last_name, role_id, manager_id } = answers;

            const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
            const values = [first_name, last_name, role_id, manager_id || null];

            connection.query(query, values, (err, result) => {
                if (err) throw err;

                console.log('Employee added successfully!');
                startApp(); // Return to the main menu
            });
        });
}

function updateEmployeeRole() {
    // Implementation for updating an employee's role
    // You can follow a similar pattern as in the other functions
    // You will need to prompt the user for the necessary information
    // and then execute an UPDATE query on the employee table
    console.log('Update employee role functionality not implemented yet.');
    startApp(); // Return to the main menu
}