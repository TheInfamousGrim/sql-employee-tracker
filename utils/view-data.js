/* -------------------------------------------------------------------------- */
/*                                dependencies                                */
/* -------------------------------------------------------------------------- */

import inquirer from 'inquirer';

/* -------------------------------------------------------------------------- */
/*                       view employee data sql queries                       */
/* -------------------------------------------------------------------------- */

function viewAllEmployees(connection, cb) {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, 
        role.title, role.salary, 
        department.name AS department, 
        e.first_name AS manager FROM employee LEFT 
        JOIN employee as e ON e.id = employee.manager_id 
        JOIN role ON employee.role_id = role.id 
        JOIN department ON role.department_id = department.id 
        ORDER BY employee.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        cb();
    });
}

function viewEmployeeManager(connection, startPrompt) {
    // Query the database for all distinct managers from employee table
    connection.query(
        `SELECT DISTINCT e.first_name, e.last_name FROM employee
        LEFT JOIN employee AS e ON employee.manager_id = e.id WHERE e.first_name IS NOT NULL`,
        (err, results) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: 'manager',
                        type: 'list',
                        choices() {
                            // Create an array of managers names to choose from
                            const choiceArray = [];
                            for (let i = 0; i < results.length; i++) {
                                choiceArray.push(`${results[i].first_name} ${results[i].last_name}`);
                            }
                            return choiceArray;
                        },
                        message: 'Which manager would you like to search by?',
                    },
                ])
                .then((answer) => {
                    const query = `SELECT employee.id, employee.first_name, employee.last_name, 
                    role.title, role.salary, 
                    department.name AS department, CONCAT(e.first_name, ' ', e.last_name) AS manager FROM employee 
                    LEFT JOIN employee AS e ON e.id = employee.manager_id 
                    JOIN role ON employee.role_id = role.id 
                    JOIN department ON role.department_id = department.id WHERE e.first_name = ?
                    ORDER BY employee.id;`;
                    const managerFirstName = answer.manager.split(' ')[0];
                    connection.query(query, managerFirstName, (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        startPrompt();
                    });
                });
        }
    );
}

function viewRoles(connection, startPromptFunc) {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startPromptFunc();
    });
}

function viewDepartments(connection, startPromptFunc) {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startPromptFunc();
    });
}

function viewEmployeeDepartment(connection, cb) {
    // Query the database for all available departments to prompt user
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'department',
                    type: 'list',
                    choices() {
                        const choiceArray = [];
                        for (let i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].name);
                        }
                        return choiceArray;
                    },
                    message: 'What department would you like to search by?',
                },
            ])
            .then((answer) => {
                console.log(answer.department);
                const query = `SELECT employee.id, employee.first_name, employee.last_name, 
                    role.title, role.salary, 
                    department.name AS department, 
                    e.first_name AS manager FROM employee 
                    LEFT JOIN employee as e ON e.id = employee.manager_id 
                    JOIN role ON employee.role_id = role.id 
                    JOIN department ON role.department_id = department.id 
                    WHERE department.name = ? 
                    ORDER BY employee.id`;
                connection.query(query, answer.department, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    cb();
                });
            });
    });
}

/* -------------------------------------------------------------------------- */
/*                            export view functions                           */
/* -------------------------------------------------------------------------- */

export { viewAllEmployees, viewEmployeeManager, viewRoles, viewDepartments, viewEmployeeDepartment };
