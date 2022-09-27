/* ------------------------------ dependencies ------------------------------ */
import inquirer from 'inquirer';

/* -------------------------------------------------------------------------- */
/*                            create data functions                           */
/* -------------------------------------------------------------------------- */

// Create a new employee
function createEmployee(connection, cb) {
    const newEmployee = {};
    connection.query('SELECT * FROM employee_role', (err, results) => {
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
            .then(() => {
                // Add inputs as data into newEmployee object
                newEmployee.first_name = answer.first_name;
                newEmployee.last_name = answer.last_name;

                // Get the job role id from db
                connection.query('SELECT * FROM employee_role WHERE title = ?', answer.employee_role, (err, res) => {
                    if (err) throw err;

                    newEmployee.employee_role_id = res[0].id;
                });

                // Get the manager id from db
            });
    });
}

/* -------------------------------------------------------------------------- */
/*                           export create functions                          */
/* -------------------------------------------------------------------------- */
