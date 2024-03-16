const mysql = require('mysql2')
require('dotenv').config()
const { Sql } = require('./classes/sqlCl')
const { startQuestions, departmentQuestion, roleQuestions, employeeQuestions, updateQuestions, deleteDept } = require('./inquirer')
const { createEmployee, getRoles, updateRole, delDeptFunc, delRoleFunc, delEmpFunc } = require('./queryFuncs')
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
            const managers = res.map(({ manager_name }) => manager_name)
            console.table(res)
            createEmployee(roles, managers)
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

// start server and run application
con.connect(function(err) {
    if(err) throw err;
    console.log('Connection Successful!')
    start()
})