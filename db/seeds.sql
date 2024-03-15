
-- @block
INSERT INTO departments (name) VALUE
('Security'),
('Engineering'),
('Human Resources'),
('Management');
-- @block

INSERT INTO roles (title, salary, department_id) VALUE
('Receptionist', 45000.00, 3),
('Senior Engineer', 150000.00, 2),
('Junior Engineer', 75000.00, 2),
('Security Guard', 60000.00, 1),
('CEO', 700000, 4);
-- @block
INSERT INTO employees (first_name, last_name ,role_id, manager_name, manager_id) VALUE
('Clark', 'Kent', 5, 'Shawn Spencer', 1),
('Bruce', 'Wayne', 2, 'Burton Guster', 2),
('Johnny', 'Depp', 4, 'Harry Brown', 3),
('John', 'Doe', 1, 'Harry Brown', 3),
('Ricky', 'Bobby', 3, 'Burton Guster', 2);
