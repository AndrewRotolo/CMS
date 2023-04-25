const mysql = require('mysql2');
const inquirer = require('inquirer');
//interesting how I don't need to actually call the variable that enables console.table. Don't think I've seen a dependency work like that before. Maybe worth some additional reading?
const cTable = require('console.table');

const db = mysql.createConnection(
    //might move this into a .env later, but it's not like I actually use this password for anything besides this local mysql connection
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
//EDIT: It seems to do the above natively. Will do some additional testing later.
function viewDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
        //each option should push back to the main option menu after the database-related task is complete
        mainMenu();
        //the return isn't necessary at this stage, but after MVP, I'd like to implement an "exit out" functionality and adding the returns now will prevent me from getting caught in loops later on.
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
    //Before the main functionality, each option will show all relevant database tables for improved UX
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
        //obviously not expecting SQL injection on this local-only program, but good to get in the habit of prepared statements.
        const userInput = response.addDepartment;
        db.query('INSERT INTO departments (department_name) VALUES (?)', userInput, function (err, results) {
            if (err) {
                console.log(err);
            }
        })
        //I'm going to have this program always display the results of any database changes.
        db.query('SELECT * FROM departments', function (err, results) {
            console.table(results);
            mainMenu();
            return;
        })
    })

};

function addRole() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
    })
    inquirer.prompt([
        {
            name: 'title',
            message: 'What is the new role\'s title?',
            type: 'input'
        },
        {
            name: 'salary',
            message: 'What is the new role\'s salary?',
            type: 'input'
        },
        {
            name: 'department',
            message: 'What is the new role\'s department ID (see above table)?',
            type: 'input'
        }

    ])
    .then(function(response) {
        const title = response.title;
        const salary = response.salary;
        //I'm sure there's a way to use the actual department name as the input, but I'll look into it after MVP
        const departmentID = response.department;
        db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentID], function (err, results) {
            if (err) {
                console.log(err);
            }
        })
        db.query('SELECT * FROM roles', function (err, results) { 
        console.table(results);
        mainMenu();
        return;
        })
    })

};

function addEmployee() {
    db.query('SELECT * FROM employees', function (err, results) {
        console.table(results);
    })
    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results);
    })

    inquirer.prompt([
        {
            name: 'firstName',
            message: 'What is the new employee\'s first name?',
            type: 'input'
        },
        {
            name: 'lastName',
            message: 'What is the new employee\'s last name?',
            type: 'input'
        },
        {
            name: 'role',
            message: 'What is the new employee\'s role ID (see above table)?',
            type: 'input'
        },
        {
            name: 'manager',
            message: 'What is the new employee\'s manager\'s ID (see above table or leave blank if no manager)?',
            type: 'input',
            default: null
        }
    ])
    .then(function(response) {
        const firstName = response.firstName;
        const lastName = response.lastName;
        //like before, I'm sure these next 2 items could use the names as inputs, but I don't want to get bogged down with that until the baseline program is done
        const roleID = response.role;
        //good thing I remembered to make this a let instead of a const :p
        let managerID = response.manager;
        
        //hopefully this if statement should prevent any issues with people typing stuff into the manager ID prompt
        if (isNaN(response.manager)) {
            managerID = null;
        }

        db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleID, managerID], function(err, results) {
            if(err) {
                console.log(err)
            }
        })
        db.query('SELECT * FROM employees', function (err, results) {
            console.table(results);
            mainMenu();
            return;
        })
    })

};

function updateEmployeeRole() {
    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results);
    });
    db.query('SELECT * FROM employees', function (err, results) {
        console.table(results);
    })

    inquirer.prompt([
        {
            name: 'employeeID',
            message: 'Which employee ID do you wish to update (see "employees" table above)?',
            type: 'input'
        },
        {
            name: 'newRole',
            message: 'What is their new role ID (see "roles" table above)?',
            type: 'input'
        }
    ])
    .then(function(response) {
        let ID = response.employeeID;
        let role = response.newRole;
        //gives a more useful error message if they put gibberish in the response
        if (isNaN(ID)) {
            console.log('ERROR: The employee\'s ID must be a number. Try again');
            mainMenu();
            return;
        }
        //same as last if statement
        if(isNaN(role)) {
            console.log('ERROR: New role ID must be a number. Try again');
            mainMenu();
            return;
        }

        db.query('UPDATE employees SET role_id = ? WHERE id = ?', [ID, role], function (err, results) {
            //since I don't have any checks for if the IDs match actual database info, this will give a useful error message and reset the program if the user screws up.
            if(err) {
                console.log('Database Error - Did you input everything correctly? Try again');
                mainMenu();
                return;
            }

        })

        db.query('SELECT * FROM employees', function (err, results) {
            console.table(results);
            mainMenu();
            return;
        })
    })
};
//This actually starts the program. I *may* have forgotten to actually call the main function when first testing.
mainMenu();