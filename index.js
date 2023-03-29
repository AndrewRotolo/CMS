const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: '',
        password: '',
        database: 'cms_db'
    },
    console.log('Connected to database')
);

function mainMenu() {
    //primary function for the application. Directs to other functions that handle individual database queries
    inquirer.prompt([
        {
            name: 'start',
            message: 'What would you like to do?',
            type: 'list',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ])
    .then(function (response) {
        //sends the user to the relevant database functions. Currently just the framework (edit this comment once that changes)
        switch (response){
            case 'View all departments' :
                viewDepartments();
                break;
            case 'View all roles' :
                viewRoles();
                break;
            case 'View all employees' :
                viewEmployees();
                break;
            case 'Add a department' :
                addDepartment();
                break;
            case 'Add a role' :
                addRole();
                break;
            case 'Add an employee' :
                addEmployee();
                break;
            case 'Update an employee role' :
                updateEmployeeRole();
                break;
            default:
                console.log(`Andrew broke something. User chose ${response}. Fix it.`);
                break;
        }
    })
}

function viewDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table([results]);
        mainMenu();
    })

};

function viewRoles() {
    
};

function viewEmployees() {

};

function addDepartment() {

};

function addRole() {

};

function addEmployee() {

};

function updateEmployeeRole() {

};