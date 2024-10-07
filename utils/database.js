const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'mysql-dupertech.alwaysdata.net',
    user: "dupertech_user",
    password: "DuperUser",
    database: "dupertech_tarjetas", //cambiar nombre
    connectionLimit: 10 // Numero de conexiones
}).promise()

module.exports = async () => {
    try {
        const connection = await pool.getConnection()
        return connection
    } catch(e) {
        throw e
    }
}