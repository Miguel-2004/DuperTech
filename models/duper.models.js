const db = require('../utils/database')

//funcion de prueba mientras no haya conexion a la base de datos.
exports.veryUser = function (usuario, password) {
    return {
        nombre: "Samuel",
        id:1,
        activo: true
    }
}

//funcion para verificar el usuario. Es para el inicio de sesion
exports.usuarios = class{
    static async verifyUser(correo, contrasena) {
        const connection = await db()
        try {
            await connection.beginTransaction()
    
            const [rows] = await connection.execute(`
                SELECT * FROM administrador WHERE Usuario = ? AND Contrasenia = ?`,
                [correo, contrasena]
            )
    
            const realResult = rows[0]
            
            await connection.commit()
            return realResult
        } catch (e) {
            await connection.rollback()
            throw e
        } finally {
            await connection.release()
        }
    }
    // funcion para obtener los datos de los trabajadores
    static async getTrabajador(){
        try {
            const connection = await db()
            const result = await connection.execute(`
            SELECT * FROM empleado`)
            await connection.release()
            const realResult = result[0]
            return realResult
        } catch (e) {
            throw e
        }
    }

    // obtener datos de clientes
    static async getCliente(){
        try {
            const connection = await db()
            const result = await connection.execute(`
            SELECT * FROM cliente`)
            await connection.release()
            const realResult = result[0]
            return realResult
        } catch (e) {
            throw e
        }
    }

    
}


