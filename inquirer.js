
// Starting questions / Main screen
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
// Add a department
const departmentQuestion = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'departmentName'
    }
]
// Add a role
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
// Add an employee
function employeeQuestions(roles, manager) {
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
        name: 'roleName',
        choices: roles,
    },
    {
        type: 'input',
        message: "What is the employee's role id number?",
        name: 'roleId',
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'managerName',
        choices: manager,
    },
    {
        type: 'input',
        message: "What is the manager's id number?",
        name: 'managerId',
    },
]
    return employeeQs;
}
// update an employee
function updateQuestions(employees, roles) {
    const updateQs = [
    {
        type: 'list',
        message: 'Which employee would you like to update?',
        name: 'updateName',
        choices: employees,
    },
    {
        type: 'list',
        message: 'What do you want to update to?',
        name: 'updateRole',
        choices: roles,
    },
    {
        type: 'input',
        message: "What is the new role's corresponding id number?",
        name: 'updateId',
    },
]
    return updateQs;
}


module.exports = { startQuestions, departmentQuestion, roleQuestions, employeeQuestions, updateQuestions }