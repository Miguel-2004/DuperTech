
exports.veryUser = function (usuario, password) {
    return {
        nombre: "Samuel",
        id:1,
        activo: true
    }
}

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
}

