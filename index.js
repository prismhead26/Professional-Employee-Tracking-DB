const mysql = require('mysql2')
require('dotenv').config()
const { Sql } = require('./classes/sqlCl')

const con = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        multipleStatements: true
    }
)

con.connect(function(err) {
    if(err) throw err;
    console.log('Connection Successful!')
})