const inquirer = require('inquirer')

const questions = [
    {   type: 'list',
        name: 'database-text',
        message: 'Welcome! First lets decide on the database:',
        choices: [ 'Create an employeeTracker_db', 'Use an existing one' ]
    },
    {
        type: 'list',
        name: 'text',
        message: 'What would you like to do?',
        default: '(Use Arrow Keys)',
        choices: [ 'view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit' ]
    },
    {
        name: 'department-text',
        message: 'What is the name of the department?',
    },
    {
        name: 'role-text',
        message: 'What is the name of the role?',
    },
    {
        name: 'salary-text',
        message: 'What is the salary of the role?',
    },
    {
        type: 'list',
        name: 'ineherent-text',
        message: 'Which department does the role belong to?',
        // updates if newly created dept and creates choices for user
    },
    {
        name: 'firstName-text',
        message: "What is the employee's first name?",
    },
    {
        name: 'lastName-text',
        message: "What is the employee's last name?",
    },
    {
        type: 'list',
        name: 'employeeRole-text',
        message: "What is the employee's role?",
        // updates if newly created role and displays choices for user
    },
    {
        type: 'list',
        name: 'manager-text',
        message: "Who is the employee's manager?",
        // choices array of managers and 'none'
    },
    {
        type: 'list',
        name: 'updateRole-text',
        message: "Which employee's role would you like to update?",
        // choices of all employees
    },
    {
        type: 'list',
        name: 'assignRole-text',
        message: "Which do you want to assign the selected employee?",
        // choices of all roles
    },
]

async function init() {
    const answers = await inquirer.prompt(questions)
    console.log('answers: ', answers)
}

init()