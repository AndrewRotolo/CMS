const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'syitbwabg8675309',
        database: 'cms_db'
    });

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
        switch (response.start){
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
                console.log(`Andrew broke something. User chose ${response.start}. Fix it.`);
                break;
        }
        return;
    })
}
//I may be able to use inquirer to imitate a "press to continue" functionality. Will look into it after achieving MVP.
function viewDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
        mainMenu();
        return;
    })

};

function viewRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results);
        mainMenu();
        return;
    })
    
};

function viewEmployees() {
    db.query('SELECT * FROM employees', function (err, results) {
        console.table(results);
        mainMenu();
        return;
    })

};

function addDepartment() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
    })

    inquirer.prompt([
        {
            name: 'addDepartment',
            message: 'What is the new department\'s name?',
            type: 'input'
        }
    ])
    .then(function(response) {
        const userInput = response.addDepartment;
        db.query('INSERT INTO departments (department_name) VALUES (?)', userInput, function (err, results) {
            if (err) {
                console.log(err);
            }
        })
        db.query('SELECT * FROM departments', function (err, results) {
            console.table(results);
        })
    })

};

function addRole() {

};

function addEmployee() {

};

function updateEmployeeRole() {

};

mainMenu();