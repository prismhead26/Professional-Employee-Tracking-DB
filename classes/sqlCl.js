
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
                    roles.id as role_id,
                    title, 
                    salary,
                    employees.manager_name,
                    employees.manager_id
                FROM roles
                LEFT JOIN employees
                ON roles.id = employees.role_id`
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
}

module.exports = { Sql }