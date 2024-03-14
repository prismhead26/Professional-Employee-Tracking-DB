
class Sql {
    constructor(){
        this.department = ''
        this.role = ''
        this.salary = ''
        this.inherent = ''
        this.firstName = ''
        this.lastName = ''

    }
    // setDepartment(department) {
    //     this.department = `CREATE TABLE IF NOT EXISTS ${department};`
    // }
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
        return `INSERT INTO employees (first_name, last_name, role_id, manager_id) (?, ?, ?, ?)`
    }
    updateEmployee() {
        return `UPDATE employees SET role_id=? WHERE first_name=?`
    }
}

module.exports = { Sql }