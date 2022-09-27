-- Departments
INSERT INTO department (name)
VALUES 
    ("Executive"),
    ("Parks and Recreation"), 
    ("Finance"), 
    ("Human Resources"), 
    ("Information Technology"), 
    ("Operations");

-- Employee Roles
INSERT INTO role (title, salary, department_id)
VALUES
    ("City Manager", 120000.00, 1),
    ("Director", 90000.00, 2),
    ("Deputy Director", 60000.00, 2),
    ("Assistant", 35000.00, 2),
    ("Accountant", 40000.00, 3),
    ("Secretary", 30000.00, 4),
    ("Payroll Manager", 45000.00, 4),
    ("Senior Developer", 90000.00, 5),
    ("Software Developer", 60000.00, 5),
    ("State Auditor", 65000.00, 6),
    ("Shoe Shiner", 25000.00, 6);

-- Employee info

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
-- Employee managers
    ("Chris", "Traeger", 1, NULL),
    ("Ron", "Swanson", 2, NULL),
    ("Leslie", "Knope", 3, NULL),
    ("George", "Fincher", 8, NULL),
-- Employees with managers
    ("Tom", "Haverford", 4, 3),
    ("Donna", "Meagle", 5, 2),
    ("April", "Ludgate", 6, 3),
    ("Jerry", "Gergich", 7, 2),
    ("Mark", "Brandanawicz", 9, 4),
    ("Benjamin", "Wyatt", 10, 1),
    ("Andy", "Dwyer", 11, 2);