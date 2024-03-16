const inquirer = require('inquirer')
const { startQuestions, departmentQuestion, roleQuestions, employeeQuestions, updateQuestions, deleteDept } = require('./inquirer')

async function createEmployee(roles, manager) {
    answers = await inquirer.prompt(employeeQuestions(roles, manager))
    con.query(queries.addEmployee(), [ answers.employeeFirst, answers.employeeLast, answers.roleId, answers.managerName, answers.managerId ] , function(err, res) {
        if (err) throw err;
        console.table(res)
        start()
    })
}

async function getRoles(names) {
    con.query(queries.onlyRows(), function(err, res) {
        if (err) throw err;
        console.table('roles table: ...', res)
        const roles = res.map(({ title }) => title)
        updateRole(names, roles)
    })
}

async function updateRole(names, roles) {
    answers = await inquirer.prompt(updateQuestions(names, roles))
    var first_name = answers["updateName"].split(' ')[0]
    var last_name = answers["updateName"].substring(first_name.length).trim()
    con.query(queries.updateEmployee(), [answers.updateId, first_name, last_name] , function(err, res) {
        if (err) throw err;
        console.table(res)
        start()
    })
}

async function delDeptFunc(deptNames) {
    answers = await inquirer.prompt(deleteDept(deptNames))
    con.query(queries.deleteDepartments(), [answers.delete], function(err, res) {
        if (err) throw err;
        console.table(res)
        start()
    })
}
async function delRoleFunc(roleNames) {
    answers = await inquirer.prompt(deleteDept(roleNames))
    con.query(queries.deleteRoles(), [answers.delete], function(err, res) {
        if (err) throw err;
        console.table(res)
        start()
    })
}
async function delEmpFunc(roleNames) {
    answers = await inquirer.prompt(deleteDept(roleNames))
    var first_name = answers["delete"].split(' ')[0]
    var last_name = answers["delete"].substring(first_name.length).trim()
    con.query(queries.deleteEmployees(), [first_name, last_name], function(err, res) {
        if (err) throw err;
        console.table(res)
        start()
    })
}

module.exports = { createEmployee, getRoles, updateRole, delDeptFunc, delRoleFunc, delEmpFunc }