// const questions = [
//     {   type: 'list',
//         name: 'database-text',
//         message: 'Welcome! First lets decide on the database:',
//         choices: [ 'Create an employeeTracker_db', 'Use an existing one' ]
//     },
//     {
//         type: 'list',
//         name: 'text',
//         message: 'What would you like to do?',
//         default: '(Use Arrow Keys)',
//         choices: [ 'view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit' ]
//     },
//     {
//         name: 'department-text',
//         message: 'What is the name of the department?',
//     },
//     {
//         name: 'role-text',
//         message: 'What is the name of the role?',
//     },
//     {
//         name: 'salary-text',
//         message: 'What is the salary of the role?',
//     },
//     {
//         type: 'list',
//         name: 'ineherent-text',
//         message: 'Which department does the role belong to?',
//         // updates if newly created dept and creates choices for user
//     },
//     {
//         name: 'firstName-text',
//         message: "What is the employee's first name?",
//     },
//     {
//         name: 'lastName-text',
//         message: "What is the employee's last name?",
//     },
//     {
//         type: 'list',
//         name: 'employeeRole-text',
//         message: "What is the employee's role?",
//         // updates if newly created role and displays choices for user
//     },
//     {
//         type: 'list',
//         name: 'manager-text',
//         message: "Who is the employee's manager?",
//         // choices array of managers and 'none'
//     },
//     {
//         type: 'list',
//         name: 'updateRole-text',
//         message: "Which employee's role would you like to update?",
//         // choices of all employees
//     },
//     {
//         type: 'list',
//         name: 'assignRole-text',
//         message: "Which do you want to assign the selected employee?",
//         // choices of all roles
//     },
// ]

const questions = [
    {   type: 'list',
        name: 'test',
        message: 'Welcome! First lets decide on the database:',
        choices: [ 'Create an employeeTracker_db', 'Use an existing one', 'Hello World' ]
    },
]

const startQuestions = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like do?',
        choices: [ 
            'view all departments', 
            'view all roles', 
            'view all employees', 
            'add a department', 
            'add a role', 
            'add an employee', 
            'update an employee role', 
            'quit' ]
    }
]
const departmentQuestion = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'departmentName'
    }
]
const roleQuestions = [
    {
        type: 'input',
        message: 'What is the name of the new role?',
        name: 'roleName'
    },
    {
        type: 'input',
        message: 'What is the salary of the new role?',
        name: 'roleSalary'
    },
    {
        type: 'input',
        message: 'What is the department id number?',
        name: 'departmentId'
    },
]
const employeeQuestions = [
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
        type: 'input',
        message: "What is the employee's role id number?",
        name: 'roleId'
    },
    {
        type: 'input',
        message: "What is the manager's id number?",
        name: 'managerId'
    },
]
const updateQuestions = [
    {
        type: 'input',
        message: 'Which employee would you like to update?',
        name: 'updateName'
    },
    {
        type: 'input',
        message: 'What do you want to update to?',
        name: 'updateRole'
    }
]

module.exports = { questions, startQuestions, departmentQuestion, roleQuestions, employeeQuestions, updateQuestions }