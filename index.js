/* -------------------------------------------------------------------------- */
/*                                dependencies                                */
/* -------------------------------------------------------------------------- */

/* ---------------------------- External Packages --------------------------- */
import mysql from 'mysql2';
import inquirer from 'inquirer';
import consTable from 'console.table';

/* ---------------------------- internal modules ---------------------------- */
// Create employee data functions
// const createData = require('./utils/create-data.js');
import { createDepartment, createRole, createEmployee } from './utils/create-data.js';

// Delete employee data functions
import { removeDepartment, removeRole, removeEmployee } from './utils/delete-data.js';

// // Update employee data functions
// const updateData = require('./utils/update-data.js');
import { updateManager, updateRole } from './utils/update-data.js';

// View employee data functions
import {
    viewAllEmployees,
    viewEmployeeManager,
    viewRoles,
    viewDepartments,
    viewEmployeeDepartment,
} from './utils/view-data.js';

/* -------------------------------------------------------------------------- */
/*                             connect to database                            */
/* -------------------------------------------------------------------------- */
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mypassword',
    database: 'employee_DB',
    multipleStatements: true,
});

/* -------------------------------------------------------------------------- */
/*                         start application function                         */
/* -------------------------------------------------------------------------- */

function startPrompt() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'Add A Department',
                'Delete A Department',
                'View All Roles',
                'Add A Role',
                "Update Employee's Role",
                'Delete A Role',
                'View All Employees',
                'View Employees By Department',
                'View Employees By Manager',
                'Add An Employee',
                "Update Employee's Manager",
                'Delete An Employee',
                'QUIT',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Departments':
                    viewDepartments(connection, startPrompt);
                    break;
                case 'Add A Department':
                    createDepartment(connection, startPrompt);
                    break;
                case 'Delete A Department':
                    removeDepartment(connection, startPrompt);
                    break;
                case 'View All Roles':
                    viewRoles(connection, startPrompt);
                    break;
                case 'Add A Role':
                    createRole(connection, startPrompt);
                    break;
                case "Update Employee's Role":
                    updateRole(connection, startPrompt);
                    break;
                case 'Delete A Role':
                    removeRole(connection, startPrompt);
                    break;
                case 'View All Employees':
                    viewAllEmployees(connection, startPrompt);
                    break;
                case 'View Employees By Department':
                    viewEmployeeDepartment(connection, startPrompt);
                    break;
                case 'View Employees By Manager':
                    viewEmployeeManager(connection, startPrompt);
                    break;
                case 'Add An Employee':
                    createEmployee(connection, startPrompt);
                    break;
                case "Update Employee's Manager":
                    updateManager(connection, startPrompt);
                    break;
                case 'Delete An Employee':
                    removeEmployee(connection, startPrompt);
                    break;
                case 'QUIT':
                    connection.end();
                    break;
                default:
                    break;
            }
        });
}

// Start application
connection.connect((err) => {
    if (err) throw err;
    startPrompt();
});
