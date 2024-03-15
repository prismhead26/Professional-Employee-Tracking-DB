
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
    addDepartment(deptName) {
        return `INSERT INTO departments (name) VALUES (?)`
    }
    addRole() {
        return `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
    }
    addEmployee() {
        return `INSERT INTO employees (first_name, last_name) VALUES (?, ?)`
    }
    updateEmployee() {
        return `UPDATE employees SET role_id=? WHERE first_name=?`
    }
    viewRoles() {
        return `SELECT id, title, salary FROM roles`
    }
}

module.exports = { Sql }