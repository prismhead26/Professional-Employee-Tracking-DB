const mysql = require('mysql2')
require('dotenv').config()
const { Sql } = require('./classes/sqlCl')
const { startQuestions, departmentQuestion, roleQuestions, managerQuestions,employeeQuestions, updateQuestions, deleteDept } = require('./inquirer')
const inquirer = require('inquirer')
const cTable = require('console.table')

const queries = new Sql()

const con = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: 'employeeTracker_db',
        multipleStatements: true
    }
)
// create new employee 
async function createEmployee(roles, managers) {
    answers = await inquirer.prompt(employeeQuestions(roles, managers))
    con.query(queries.viewManagers(), function(err, res) {
        if (err) throw err;
        // creates a space to format table in console
        console.log('           ')
        console.table(res)
    })
    const managerAns = await inquirer.prompt(managerQuestions)
    con.query(queries.addEmployee(), [ answers.employeeFirst, answers.employeeLast, answers.roleId, managerAns.managerName, managerAns.managerId ] , function(err, res) {
        if (err) throw err;
        console.table(res)
        start()
    })
}
// pass in names data and also get roles data then pass into update func
async function getRoles(names) {
    con.query(queries.onlyRows(), function(err, res) {
        if (err) throw err;
        console.table('roles table: ...', res)
        const roles = res.map(({ title }) => title)
        updateRole(names, roles)
    })
}
//  updates employee role
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
// delete a department
async function delDeptFunc(deptNames) {
    answers = await inquirer.prompt(deleteDept(deptNames))
    con.query(queries.deleteDepartments(), [answers.delete], function(err, res) {
        if (err) throw err;
        console.table(res)
        start()
    })
}
// delete a role
async function delRoleFunc(roleNames) {
    answers = await inquirer.prompt(deleteDept(roleNames))
    con.query(queries.deleteRoles(), [answers.delete], function(err, res) {
        if (err) throw err;
        console.table(res)
        start()
    })
}
// delete an employee
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
// Main function runs through starting questions
async function start() {
    let answers;
    answers = await inquirer.prompt(startQuestions)
    if (answers.options === 'view all departments') {
        con.query(queries.selectFrom('departments'), function(err, res) {
            if (err) throw err;
            console.table(res)
            start()
        })    
    } else if (answers.options === 'view all roles') {
        con.query(queries.selectFrom('roles'), function(err, res) {
            if (err) throw err;
            console.table(res)
            start()
        })
    } else if (answers.options === 'view all employees') {
        con.query(queries.selectFrom('employees'), function(err, res) {
            if (err) throw err;
            console.table(res)
            start()
        })
    } else if (answers.options === 'add a department') {
        answers = await inquirer.prompt(departmentQuestion)
        console.log('new dept: ',answers)
        console.log('queries... ',queries.addDepartment())
        con.query(queries.addDepartment(),[ answers.departmentName ] , function(err, res) {
            if (err) throw err;
            console.table(res)
            start()
        })
    } else if (answers.options === 'add an employee') {
        con.query(queries.viewRoles(), function(err, res) {
            if (err) throw err;
            const roles = res.map(({ title }) => title)
            // const managers = res.map(({ manager_name }) => manager_name)
            console.table(res)
            createEmployee(roles)
        })
    } else if (answers.options === 'update an employee role') {
        con.query(queries.viewEmployees(), function(err, res) {
            if (err) throw err;
            const names = res.map(({ first_name, last_name }) =>
                first_name + ' ' + last_name
            )
            console.table(res)
            // add a function to pass in roles and names into choices type is list
            getRoles(names)
        })
    } else if (answers.options === 'add a role') {
        answers = await inquirer.prompt(roleQuestions)
        con.query(queries.addRole(), [ answers.roleName, answers.roleSalary, answers.departmentId ] , function(err, res) {
            if (err) throw err;
            console.table(res)
            start()
        })
    } else if (answers.options === 'delete a department') {
        con.query(queries.selectFrom('departments'), function(err, res) {
            if (err) throw err;
            const deptNames = res.map(({ name }) => name)
            console.table(res)
            // add a function to pass in roles and names into choices type is list
            delDeptFunc(deptNames)
        })
    } else if (answers.options === 'delete a role') {
        con.query(queries.selectFrom('roles'), function(err, res) {
            if (err) throw err;
            const roleNames = res.map(({ title }) => title)
            console.table(res)
            // add a function to pass in roles and names into choices type is list
            delRoleFunc(roleNames)
        })
    } else if (answers.options === 'delete an employee') {
        con.query(queries.selectFrom('employees'), function(err, res) {
            if (err) throw err;
            const empNames = res.map(({ first_name, last_name }) => first_name + ' ' + last_name)
            console.table(res)
            // add a function to pass in roles and names into choices type is list
            delEmpFunc(empNames)
        })
    } else if (answers.options === 'quit') {
        con.end()
        process.exit()
    }
}
// start server and initialize the application
con.connect(function(err) {
    if(err) throw err;
    console.log('Connection Successful!')
    start()
})