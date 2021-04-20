const mysql = require('mysql');

const mySqlConnection = function () {
    return mysql.createConnection({
        database: 'events',
        user: 'root',
        password: 'shrey123',
        host: 'localhost'
    })
}
module.exports = mySqlConnection