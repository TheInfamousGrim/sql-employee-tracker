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
                {
                    // Select the employees manager
                    name: 'employee_manager',
                    type: 'list',
                    // Get the employee managers from employee_role table
                    choices() {
                        const choicesArray = [];
                        const managerQuery = `SELECT DISTINCT e.id, e.first_name, e.last_name FROM employee
                        LEFT JOIN employee AS e ON employee.manager_id = e.id WHERE e.first_name IS NOT NULL`;
                        connection.query(managerQuery, (error, managerResults) => {
                            if (error) throw error;
                            for (let i = 0; i < results.length; i++) {
                                choicesArray.push(`${managerResults[i].first_name} ${managerResults[i].last_name}`);
                                console.log(choicesArray);
                            }
                            console.log(choicesArray);
                            return choicesArray;
                        });
                        console.log(choicesArray);
                        return choicesArray;
                    },
                    message: 'Select the manager for the employee',
                },
            ])
            .then((answer) => {
                // Add inputs as data into newEmployee object
                newEmployee.first_name = answer.first_name;
                newEmployee.last_name = answer.last_name;

                // Get the job role id from db
                connection.query('SELECT * FROM role WHERE title = ?', answer.employee_role, (err, jobRoleResults) => {
                    if (err) throw err;

                    newEmployee.employee_role_id = jobRoleResults[0].id;
                });

                // Get the manager id from db
                connection.query(
                    'SELECT * FROM employee WHERE first_name = ?',
                    answer.employee_manager.split(' ')[0],
                    (error, managerIdResults) => {
                        if (error) throw error;

                        newEmployee.employee_manager_id = managerIdResults[0].id;
                    }
                );

                console.log(newEmployee);
            });
    });
}

/* -------------------------------------------------------------------------- */
/*                           export create functions                          */
/* -------------------------------------------------------------------------- */

export { createEmployee };
