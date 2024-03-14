const mysql = require('mysql2')
require('dotenv').config()
const { Sql } = require('./classes/sqlCl')
const { questions, startQuestions, departmentQuestion, roleQuestions, employeeQuestions, updateQuestions } = require('./inquirer')
const inquirer = require('inquirer')
const cTable = require('console.table')
const con = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: 'employeeTracker_db',
        multipleStatements: true
    }
)

const queries = new Sql()

async function init() {
    let answers;
    answers = await inquirer.prompt(startQuestions)
    if (answers.options === 'view all departments') {
        con.query(queries.selectFrom('departments'), function(err, res) {
            if (err) throw err;
            console.table(res)
            init()
        })    
    } else if (answers.options === 'view all roles') {
        con.query(queries.selectFrom('roles'), function(err, res) {
            if (err) throw err;
            console.table(res)
            init()
        })
    } else if (answers.options === 'view all employees') {
        con.query(queries.selectFrom('employees'), function(err, res) {
            if (err) throw err;
            console.table(res)
            init()
        })
    } else if (answers.options === 'add a department') {
        answers = await inquirer.prompt(departmentQuestion)
        console.log('new dept: ',answers)
        console.log('queries... ',queries.addDepartment())
        con.query(queries.addDepartment(),[ answers.departmentName ] , function(err, res) {
            if (err) throw err;
            console.table(res)
            init()
        })
    } else if (answers.options === 'add an employee') {
        answers = await inquirer.prompt(employeeQuestions)
        con.query(queries.addEmployee, [ answers.employeeFirst, answers.employeeLast, answers.roleId, answers.managerId ] , function(err, res) {
            if (err) throw err;
            console.table(res)
            init()
        })
    } else if (answers.options === 'update an employee role') {
        answers = await inquirer.prompt(updateQuestions)
        con.query(queries.updateEmployee, [ answers.updateName, answers.updateRole ] , function(err, res) {
            if (err) throw err;
            console.table(res)
            init()
        })
    } else if (answers.options === 'add a role') {
        answers = await inquirer.prompt(roleQuestions)
        con.query(queries.addRole, [ answers.roleName, answers.roleSalary, answers.departmentId ] , function(err, res) {
            if (err) throw err;
            console.table(res)
            init()
        })
    } else if (answers.options === 'quit') {
        con.end()
        process.exit()
    }
}

con.connect(function(err) {
    if(err) throw err;
    console.log('Connection Successful!')
    init()
})