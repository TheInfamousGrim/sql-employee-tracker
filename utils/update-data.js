/* -------------------------------------------------------------------------- */
/*                                dependencies                                */
/* -------------------------------------------------------------------------- */

import inquirer from 'inquirer';

/* -------------------------------------------------------------------------- */
/*                          update sql data functions                         */
/* -------------------------------------------------------------------------- */

function updateRole(connection, startPrompt) {
    const employeeRoleObj = {};

    connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, 
        role.title, role.salary, 
        department.name AS department, 
        e.first_name AS manager FROM employee 
        LEFT JOIN employee AS e ON e.id = employee.manager_id 
        JOIN role ON employee.role_id = role.id 
        JOIN department ON role.department_id = department.id 
        ORDER BY employee.id`,
        (err, results) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: 'updateEmployee',
                        type: 'list',
                        choices() {
                            const choiceArray = [];
                            for (let i = 0; i < results.length; i++) {
                                choiceArray.push(`${results[i].first_name} ${results[i].last_name}`);
                            }
                            return choiceArray;
                        },
                        message: `Choose the employee who's role you'd like to update`,
                    },
                ])
                .then((answer) => {
                    employeeRoleObj.first_name = answer.updateEmployee.split(' ')[0];

                    connection.query('SELECT * FROM role', (err, roleResults) => {
                        if (err) throw err;
                        inquirer
                            .prompt([
                                {
                                    name: 'updateRole',
                                    type: 'list',
                                    choices() {
                                        const choiceArray = [];
                                        for (let i = 0; i < roleResults.length; i++) {
                                            choiceArray.push(roleResults[i].title);
                                        }
                                        return choiceArray;
                                    },
                                    message: `Please select the updated role`,
                                },
                            ])
                            .then((ans) => {
                                // Translate role to role_id
                                connection.query('SELECT * FROM role WHERE title = ?', ans.updateRole, (err, res) => {
                                    if (err) throw err;

                                    employeeRoleObj.role_id = res[0].id;

                                    connection.query(
                                        'UPDATE employee SET role_id = ? WHERE first_name = ?',
                                        [employeeRoleObj.role_id, employeeRoleObj.first_name],
                                        (err) => {
                                            if (err) throw err;
                                            console.log('Employee role successfully updated.');
                                            startPrompt();
                                        }
                                    );
                                });
                            });
                    });
                });
        }
    );
}

function updateManager(connection, startPrompt) {
    const newManager = {};

    connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, 
        role.title, role.salary, 
        department.name AS department, 
        e.first_name AS manager FROM employee 
        LEFT JOIN employee AS e ON e.id = employee.manager_id 
        JOIN role ON employee.role_id = role.id 
        JOIN department ON role.department_id = department.id 
        ORDER BY employee.id`,
        (err, results) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: 'employeeSelected',
                        type: 'list',
                        choices() {
                            // Create a list of employees
                            const choiceArray = [];
                            for (let i = 0; i < results.length; i++) {
                                choiceArray.push(`${results[i].first_name} ${results[i].last_name}`);
                            }
                            return choiceArray;
                        },
                        message: 'Which employee would you like to update?',
                    },
                ])
                .then((answer) => {
                    newManager.first_name = answer.employeeSelected.split(' ')[0];

                    connection.query(
                        `SELECT DISTINCT e.id, e.first_name, e.last_name FROM employee
                        LEFT JOIN employee AS e ON employee.manager_id = e.id 
                        WHERE e.first_name IS NOT NULL`,
                        (err, managerList) => {
                            if (err) throw err;
                            inquirer
                                .prompt([
                                    {
                                        name: 'managerSelected',
                                        type: 'list',
                                        choices() {
                                            const choiceArray = [];
                                            for (let i = 0; i < managerList.length; i++) {
                                                choiceArray.push(
                                                    `${managerList[i].first_name} ${managerList[i].last_name}`
                                                );
                                            }
                                            return choiceArray;
                                        },
                                        message: 'Who would you like to change their manager to?',
                                    },
                                ])
                                .then((ans) => {
                                    connection.query(
                                        'SELECT * FROM employee WHERE first_name = ?',
                                        // use the first name of the manager to find the manager in db
                                        ans.managerSelected.split(' ')[0],
                                        (err, managerResults) => {
                                            if (err) throw err;

                                            newManager.manager_id = managerResults[0].id;

                                            connection.query(
                                                'UPDATE employee SET manager_id = ? WHERE first_name = ?',
                                                [newManager.manager_id, newManager.first_name],
                                                (err) => {
                                                    if (err) throw err;
                                                    console.log('Employee manager successfully updated.');
                                                    startPrompt();
                                                }
                                            );
                                        }
                                    );
                                });
                        }
                    );
                });
        }
    );
}

/* -------------------------------------------------------------------------- */
/*                           export update functions                          */
/* -------------------------------------------------------------------------- */

export { updateManager, updateRole };
