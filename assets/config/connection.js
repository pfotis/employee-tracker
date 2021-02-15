const mysql = require('mysql');

if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'p@ssworD',
        database: 'employeeDB',
    });
}

module.exports = connection;