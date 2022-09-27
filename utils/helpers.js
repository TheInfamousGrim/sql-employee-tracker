/* -------------------------------------------------------------------------- */
/*                                dependencies                                */
/* -------------------------------------------------------------------------- */

import mysql from 'mysql2';

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
/*                              helper functions                              */
/* -------------------------------------------------------------------------- */

const managerChoices = connection.query(
    `SELECT DISTINCT e.id, e.first_name, e.last_name FROM employee
    LEFT JOIN employee AS e ON employee.manager_id = e.id WHERE e.first_name IS NOT NULL`,
    (error, managerResults) => {
        if (error) throw error;
        const managerArray = [];
        for (let i = 0; i < managerResults.length; i++) {
            managerArray.push(`${managerResults[i].first_name} ${managerResults[i].last_name}`);
        }
        connection.end();
        return managerArray;
    }
);

const roleArrFill = () => {
    const roleArr = [];

    connection.query(`SELECT * FROM role`, (err, rows) => {
        if (err) throw err;
        for (let i = 0; i < rows.length; i++) {
            roleArr.push({ name: rows[i].title, value: rows[i].id });
        }
    });
    return roleArr;
};

console.log(roleArrFill());
