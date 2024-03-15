
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
function employeeQuestions(choices) {
    const employeeQs = [
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
]
    return employeeQs;
}
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