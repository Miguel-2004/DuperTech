const mysql = require('mysql2')

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "sistema_tarjetas", //cambiar nombre
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