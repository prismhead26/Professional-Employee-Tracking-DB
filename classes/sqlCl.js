
class Sql {
    constructor(){
    }
    dropTable(table){
        return `DROP TABLE IF EXISTS ${table};`
    }
    setDepartment(department) {
        return `USE sample; CREATE TABLE IF NOT EXISTS ${department} (id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY)`
    }
    selectFrom(table) {
        return `SELECT * FROM ${table}`
    }
    addDepartment() {
        return `INSERT INTO departments (name) VALUES (?)`
    }
    addRole() {
        return `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
    }
    addEmployee() {
        return `INSERT INTO employees (first_name, last_name, role_id, manager_name, manager_id) VALUES (?, ?, ?, ?, ?)`
    }
    updateEmployee() {
        return `UPDATE employees SET role_id=? WHERE first_name=? AND last_name=?`
    }
    viewRoles() {
        return `SELECT 
                    id as role_id,
                    title, 
                    salary
                FROM roles`
    }
    viewManagers() {
        return `SELECT DISTINCT
                    manager_id,
                    manager_name
                FROM employees
                ORDER BY manager_id ASC`
    }
    onlyRows() {
        return `SELECT * FROM roles`
    }
    viewEmployees() {
        return `SELECT 
                    first_name,
                    last_name, 
                    roles.title 
                FROM employees 
                JOIN roles 
                ON employees.role_id = roles.id`
    }
    deleteDepartments() {
        return `DELETE FROM departments WHERE name=?`
    }
    deleteRoles() {
        return `DELETE FROM roles WHERE title=?`
    }
    deleteEmployees() {
        return `DELETE FROM employees WHERE first_name=? AND last_name=?`
    }
}

module.exports = { Sql }