/* -------------------------------------------------------------------------- */
/*                                dependencies                                */
/* -------------------------------------------------------------------------- */

import inquirer from 'inquirer';

/* -------------------------------------------------------------------------- */
/*                            create data functions                           */
/* -------------------------------------------------------------------------- */

// Create a new employee
function createEmployee(connection, startPrompt) {
    const newEmployee = {};
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    // Get the employees first name
                    name: 'first_name',
                    type: 'input',
                    default: 'Skulduggery',
                    message: `Employee's first name?`,
                    // Ensure an empty string is not entered
                    validate(answer) {
                        if (answer.length < 1) {
                            return console.log('First name needs to be longer than one char');
                        }
                        return true;
                    },
                },
                {
                    // Get the employees last name
                    name: 'last_name',
                    type: 'input',
                    default: 'Pleasant',
                    message: `Employee's last name`,
                    // Ensure an empty string is not entered
                    validate(answer) {
                        if (answer.length < 1) {
                            return console.log('First name needs to be longer than one char');
                        }
                        return true;
                    },
                },
                {
                    // Get the employees job title
                    name: 'employee_role',
                    type: 'list',
                    // Get the job titles from employee_role table
                    choices() {
                        const roleArray = [];
                        for (let i = 0; i < results.length; i++) {
                            roleArray.push(results[i].title);
                        }
                        return roleArray;
                    },
                    message: `What is the employee's role?`,
                },
            ])
            .then((answer) => {
                // Add inputs as data into newEmployee object
                newEmployee.first_name = answer.first_name;
                newEmployee.last_name = answer.last_name;

                // Get the job role id from db
                connection.query('SELECT * FROM role WHERE title = ?', answer.employee_role, (err, jobRoleResults) => {
                    if (err) throw err;

                    newEmployee.role_id = jobRoleResults[0].id;
                });

                // Ask for manager
                connection.query('SELECT * FROM employee;', (err, managerResults) => {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                name: 'manager_name',
                                type: 'list',
                                choices() {
                                    const choiceArray = [];
                                    for (let i = 0; i < managerResults.length; i++) {
                                        choiceArray.push(
                                            `${managerResults[i].first_name} ${managerResults[i].last_name}`
                                        );
                                    }
                                    return choiceArray;
                                },
                                message: "Who is the employee's manager?",
                            },
                        ])
                        .then((managerAnswer) => {
                            // Translate manager_name to id
                            connection.query(
                                'SELECT id FROM employee WHERE first_name = ?',
                                managerAnswer.manager_name.split(' ')[0],
                                (err, managerIdResults) => {
                                    if (err) throw err;
                                    newEmployee.manager_id = managerIdResults[0].id;
                                    console.log('Adding new employee: ', newEmployee);

                                    connection.query('INSERT INTO employee SET ?', newEmployee, (err) => {
                                        if (err) throw err;
                                        console.log('Employee successfully added.');
                                        startPrompt();
                                    });
                                }
                            );
                        });
                });
            });
    });
}

function createRole(connection, startPrompt) {
    const newRole = {};
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'role_title',
                    type: 'input',
                    default: 'Councilor',
                    message: 'What is the role you would like to add?',
                    validate(answer) {
                        if (answer.length < 1) {
                            return console.log('A valid role is required.');
                        }
                        return true;
                    },
                },
                {
                    name: 'salary',
                    type: 'input',
                    default: '21000',
                    message: 'What is the salary of the role?',
                    validate(answer) {
                        if (answer.length < 1) {
                            return console.log('A valid salary is required.');
                        }
                        return true;
                    },
                },
                {
                    name: 'dept_name',
                    type: 'list',
                    choices() {
                        const choiceArray = [];
                        for (let i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].name);
                        }
                        return choiceArray;
                    },
                    message: 'Which department does the role belong to?',
                },
            ])
            .then((answer) => {
                newRole.title = answer.role_title;
                newRole.salary = answer.salary;

                // Translate manager_name to id
                connection.query(
                    'SELECT id FROM department WHERE name = ?',
                    answer.dept_name,
                    (err, departmentResults) => {
                        if (err) throw err;
                        newRole.department_id = departmentResults[0].id;
                        console.log('Adding new role: ', newRole);

                        connection.query('INSERT INTO role SET ?', newRole, (err) => {
                            if (err) throw err;
                            console.log('Role successfully added.');
                            startPrompt();
                        });
                    }
                );
            });
    });
}

function createDepartment(connection, startPrompt) {
    inquirer
        .prompt([
            {
                name: 'dept_name',
                type: 'input',
                default: 'Marketing',
                message: 'Type the department you wish to create',
                validate(answer) {
                    if (answer.length < 1) {
                        return console.log('A valid department name is required.');
                    }
                    return true;
                },
            },
        ])
        .then((answer) => {
            connection.query('INSERT INTO department (name) VALUES (?)', answer.dept_name, (err) => {
                if (err) throw err;
                console.log('Department successfully added.');
                startPrompt();
            });
        });
}

/* -------------------------------------------------------------------------- */
/*                           export create functions                          */
/* -------------------------------------------------------------------------- */

export { createDepartment, createRole, createEmployee };
