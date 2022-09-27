-- Departments
INSERT INTO department (name)
VALUES 
("Executive"),
("Parks and Recreation"), 
("Finance"), 
("Human Resources"), 
("Information Technology"), 
("Operations")

SELECT * FROM department;

-- Employee Roles
INSERT INTO employee_role (title, salary, department_id)
VALUES
("City Manager", 120000.00, 1),
("Director", 90000.00, 2),
("Deputy Director", 60000.00, 2),
("Assistant", 35000.00, 2),
("Accountant", 40000.00, 3),
("Secretary", 30000.00, 4),
("Payroll Manager", 45000.00, 4),
("Senior Developer", 90000.00, 5)
("Software Developer", 60000.00, 5),
("State Auditor", 65000.00, 6),
("Shoe Shiner", 25000.00, 6)

SELECT * FROM employee_role;

-- Employee info

-- Employee managers
INSERT INTO employee (first_name, last_name, employee_role_id)
VALUES
("Chris", "Traeger", 1),
("Ron", "Swanson", 2, 1),
("Leslie Knope", 3, 2)
("George", "Fincher", 8, 1)

-- Employees with managers
INSERT INTO employee (first_name, last_name, employee_role_id, manager_id)
VALUES
("Tom", "Haverford", 4, 3),
("Donna Meagle", 5, 2),
("April", "Ludgate", 6, 3),
("Jerry", "Gergich", 7, 2),
("Mark Brandanawicz", 9, 4),
("Benjamin", "Wyatt", 10, 1),
("Andy", "Dwyer", 11, 2)