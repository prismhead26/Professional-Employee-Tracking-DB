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

function str (choices) {
    console.log(choices)
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'employeeFirst'
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'employeeLast'
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            name: 'roleId',
            choices: choices,
        }
    ]) .then((answers) => {
    con.query(queries.addEmployee(), [ answers.employeeFirst, answers.employeeLast, answers.roleId ] , function(err, res) {
        if (err) throw err;
        console.table(res)
        start()
    })
    })
}

async function test(choices) {
    console.log('test choices function running...')
    answers = await inquirer.prompt(employeeQuestions(choices))
    con.query(queries.addEmployee(), [ answers.employeeFirst, answers.employeeLast, answers.roleId ] , function(err, res) {
        if (err) throw err;
        console.table(res)
        start()
    })
}

const queries = new Sql()

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
            const choices = res.map(({ title }) =>
                title
            )
            // console.log('Object Values... : ', Object.values(res));
            console.log('choices... : ', choices)
            // const output = users.filter(({age}) => age > 30)
            // const output = choices.filter(({ title }) => title)
            // console.log('output...: ', output)
            test(choices)
            // str(choices)
        })
        // answers = await inquirer.prompt(employeeQuestions(choices))
        // con.query(queries.addEmployee(), [ answers.employeeFirst, answers.employeeLast, answers.roleId ] , function(err, res) {
        //     if (err) throw err;
        //     console.table(res)
        //     start()
        // })
    } else if (answers.options === 'update an employee role') {
        answers = await inquirer.prompt(updateQuestions)
        con.query(queries.updateEmployee(), [ answers.updateName, answers.updateRole ] , function(err, res) {
            if (err) throw err;
            console.table(res)
            start()
        })
    } else if (answers.options === 'add a role') {
        answers = await inquirer.prompt(roleQuestions)
        con.query(queries.addRole(), [ answers.roleName, answers.roleSalary, answers.departmentId ] , function(err, res) {
            if (err) throw err;
            console.table(res)
            start()
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