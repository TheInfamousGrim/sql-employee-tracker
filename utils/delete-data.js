/* -------------------------------------------------------------------------- */
/*                                dependencies                                */
/* -------------------------------------------------------------------------- */

import inquirer from 'inquirer';

/* -------------------------------------------------------------------------- */
/*                          delete data sql functions                         */
/* -------------------------------------------------------------------------- */

function removeDepartment(connection, startPrompt) {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'removeDepartment',
                    type: 'list',
                    choices() {
                        const choiceArray = [];
                        for (let i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].name);
                        }
                        return choiceArray;
                    },
                    message: 'Which department would you like to delete?',
                },
            ])
            .then((answer) => {
                const query = 'DELETE FROM department WHERE name = ?;';
                connection.query(query, answer.removeDepartment, (err) => {
                    if (err) throw err;
                    console.log('Department deleted');
                    startPrompt();
                });
            });
    });
}

function removeRole(connection, startPrompt) {
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'removeRole',
                    type: 'list',
                    choices() {
                        const choiceArray = [];
                        for (let i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].title);
                        }
                        return choiceArray;
                    },
                    message: 'Which role would you like to delete?',
                },
            ])
            .then((answer) => {
                const query = 'DELETE FROM role WHERE title = ?;';
                connection.query(query, answer.removeRole, (err, res) => {
                    if (err) throw err;
                    console.log('Role successfully deleted');
                    startPrompt();
                });
            });
    });
}

function removeEmployee(connection, startPrompt) {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'removeEmployee',
                    type: 'list',
                    choices() {
                        const choiceArray = [];
                        for (let i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].first_name);
                        }
                        return choiceArray;
                    },
                    message: 'Which employee would you like to remove?',
                },
            ])
            .then((answer) => {
                const query = 'DELETE FROM employee WHERE first_name = ?;';
                connection.query(query, answer.removeEmployee, (err, res) => {
                    if (err) throw err;
                    console.log('Employee successfully deleted');
                    startPrompt();
                });
            });
    });
}

/* -------------------------------------------------------------------------- */
/*                           Export Delete Functions                          */
/* -------------------------------------------------------------------------- */

export { removeDepartment, removeRole, removeEmployee };
