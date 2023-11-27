INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 80000, 1),
('Software Engineer', 90000, 2),
('Accountant', 60000, 3),
('Legal Assistant', 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Chris', 'Redfield', 1, NULL),
('Master', 'Chief', 2, 1),
('Trey', 'Parker', 3, NULL),
('Harry', 'Potter', 4, 1);