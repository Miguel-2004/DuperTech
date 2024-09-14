
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
                SELECT * FROM Usuarios WHERE Correo = ? AND Contrasena = ?`,
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

    static async getTrabajador(){
        try {
            const connection = await db()
            const result = await connection.execute(`
            SELECT IDUsuario, Nombre FROM Usuarios
            WHERE Rol = 'empleado'
            `)
            await connection.release()
            const realResult = result[0]
            return realResult
        } catch (e) {
            throw e
        }
    }

    static async trabajadorPrueba() {
        return [
            {
                nombre: "Samuel",
                id: 1,
                activo: true
            },
            {
                nombre: "Erick",
                id: 2,
                activo: true
            },
            {
                nombre: "Diego",
                id: 3,
                activo: false
            },
            {
                nombre: "Santiago",
                id: 4,
                activo: true
            }
        ];
    }
}


