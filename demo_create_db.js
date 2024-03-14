var mysql = require('mysql2');
// const dotenv = require('dotenv')
require('dotenv').config()

console.log(process.env.USERNAME)
/*
const c = require('ansi-colors');

console.log(c.red('This is a red string!'));
*/
const { Sql } = require('./classes/sqlCl')


var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  multipleStatements: true
});

const testSql = new Sql()
let sql = testSql.setDepartment('Science')

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  console.log(sql)
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});




/*
// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    employee_tracker();
});

var employee_tracker = function () {
    inquirer.prompt([{
        // Begin Command Line
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Department', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Log Out']
    }]).then((answers) => {
        // Views the Department Table in the Database
        if (answers.prompt === 'View All Department') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View All Roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Roles: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Employees: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'Add A Department') {
            inquirer.prompt([{
                // Adding a Department
                type: 'input',
                name: 'department',
                message: 'What is the name of the dpeartment?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please Add A Department!');
                        return false;
                    }
                }
            }]).then((answers) => {
                db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to the database.`)
                    employee_tracker();
                });
            })


            else if (answers.prompt === 'Log Out') {
            db.end();
            console.log("Good-Bye!");

            function promptQuit() {
    inquirer.prompt({
        type: "list",
        name: "promptQuit",
        message: "Would you like to quit this application or run again?",
        choices: ["Run Again", "Quit"]
    }).then(function (answer) {

        if (answer.promptQuit === "Run Again") {
            runApp();
        } else {
            connection.end();
        }
    });



    const mainQuestions =  [
      {
        type: 'list',
        name: 'mainQuestions',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Delete a department',
          'Delete a role',
          'Delete an employee',
          'Quit'
        ]
      }
    ]
*/