# sql-employee-tracker

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)
![Last Commit to Current Repo](https://img.shields.io/github/last-commit/TheInfamousGrim/sql-employee-tracker)
![Commits a month](https://img.shields.io/github/commit-activity/m/TheInfamousGrim/sql-employee-tracker)

A CLI application that manages a company's employee database

## Table of Contents 📃

1. [Description](#description)
2. [Screenshot](#screenshot)
3. [Usage](#usage)
4. [Technology](#technology)
5. [Features](#features)
6. [Credits](#credits)
7. [License](#license)
8. [Contribution Guidelines](#contribution-guidelines)
9. [Feedback](#feedback)

## Description

The purpose of this application is to allow users to be able to view and manage departments, roles, and employees within a company.

The application runs at the command line. When executed the app will take the user through a series of command prompt questions to:

- View a list of all employees
- View a list of employees based on job role
- View a list of departments
- Add a new employee
- Add a new job role
- Add a new department
- Update employee role

### User Story 👤

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

### What did I Learn 🏫

The big take away from this project was the getting a more in depth understanding of how to use MySQL.
Especially using the mysql2 package that allowed me to use asynchronous queries.

Other things I learned:

- Became more comfortable using NPM packages
- Furthered my understanding of inquirer

## Installation

In order to generate your own README.md, and simplify your life, follow these steps.

1. Ensure that you have node and npm installed

   - [Download Node](https://nodejs.org/en/download/)

   - For detailed instructions on installing node please follow [this link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for instructions

2. Ensure that you have mySQL installed

   - [Windows Installation](https://community.chocolatey.org/packages/mysql)

   - [Mac and Linux Installation](https://formulae.brew.sh/formula/mysql#default)

3. Clone this repository into your local repository.

   - `git clone git@github.com:TheInfamousGrim/sql-employee-tracker.git`.

4. Initialize an npm package by running:

   - `npm init`

5. Install the dependencies to your package.json

   - `npm install`

6. Login in to mySQL CLI

   - `mysql -u root -p` enter your password when prompted (It should be blank by default)

7. create the database locally using `source schema.sql` (Make sure the path is correct or your in the correct directory)

8. select the database with `use employee_db`

9. Populate the database with `source seeds.sql`

If you've followed these steps correctly then the application should be good to go 😁

## Usage

For a video of how to use the application please follow [this link](https://youtu.be/rWYocO9yQ7s)

Written instructions:

1. run the application with `npm start`
2. Use the arrow keys to navigate the prompts
3. Press enter to select a prompt like 'View All Employees' or 'Delete A Role'
4. Follow the prompts and you are free to manipulate the Database from the command line 🙌

## Technology

The technology used for the development of this app was:

[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://www.javascript.com/)

[![Node.js](https://img.shields.io/badge/node.js-43853d?style=for-the-badge&logo=node.js&logocolor=white)](https://nodejs.org/en/)

[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://dev.mysql.com/)

packages:

- [inquirer](https://www.npmjs.com/package/inquirer)
- [mysql2](https://www.npmjs.com/package/mysql2)

## Features

- Use prompts in the command line to generate a readme section
- Email is validated using a RegEx
- GitHub username is validated using a RegEx
- Interacts with GitHub API to programmatically generate badges

## Credits

🙏 Made with the help of:

- [University of Birmingham Coding Bootcamp](https://www.birmingham.ac.uk/postgraduate/courses/cpd/coding-boot-camp.aspx)

## License

![License: MIT](https://img.shields.io/github/license/TheInfamousGrim/sql-employee-tracker?color=yellow)

[MIT License](/LICENSE)

## Contribution Guidelines

I'm open to have anyone jump in and contribute just message me on [twitter](https://twitter.com/VaporWhy)

[Guidelines for contributing](/code_of_conduct.md)

## Feedback

![Ask Me Anything](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:finchergeorge1@gmail.com)

<img src="https://avatars.githubusercontent.com/u/89855075?v=4" alt="TheInfamousGrim">

Any feedback please email [George Fincher](mailto:finchergeorge1@gmail.com)

GitHub: [TheInfamousGrim](https://api.github.com/users/TheInfamousGrim)

Twitter: [GrimFunk](https://twitter.com/VaporWhy)
