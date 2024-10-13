const db = require('../utils/database');

// Función de prueba mientras no haya conexión a la base de datos.
exports.veryUser = function (usuario, password) {
    return {
        nombre: "Samuel",
        id: 1,
        activo: true
    };
};

// Clase para manejar usuarios.
exports.usuarios = class {
    // Verificar usuario para inicio de sesión
    static async verifyUser(correo, contrasena) {
        const connection = await db();
        try {
            await connection.beginTransaction();
    
            const [rows] = await connection.execute(`
                SELECT * FROM administrador 
                WHERE Usuario = ? AND Contrasenia = ?`, 
                [correo, contrasena]
            );
    
            const realResult = rows[0];
            
            await connection.commit();
            return realResult;
        } catch (e) {
            await connection.rollback();
            throw e;
        } finally {
            await connection.release();
        }
    }

    // Obtener los datos de los trabajadores
    static async getTrabajador() {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                SELECT * FROM empleado
            `);
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }

    // Obtener los datos de los clientes
    static async getCliente() {
        try {
            const connection = await db();
            const [result] = await connection.execute(`
                SELECT * FROM cliente c JOIN tarjeta t ON c.ID_Cliente = t.ID_Cliente
            `);
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }
};

// Obtener las promociones reclamadas por mes (para reportes)
exports.getPromocionesReclamadasPorMes = async () => {
    try {
        const [rows] = await db.execute(`
            SELECT 
                DATE_FORMAT(Fecha_Reclamacion, '%Y-%m') AS Mes,
                COUNT(ID_Reclamacion) AS Total_Reclamaciones
            FROM 
                reclamacion_recompensa
            GROUP BY 
                Mes
            ORDER BY 
                Mes;
        `);
        return rows; // Devolver el resultado de la consulta
    } catch (error) {
        console.error('Error al obtener promociones reclamadas por mes:', error);
        throw error;
    }
};

exports.createEmpleado = async function (nombre, telefono, usuario, contrasena) {
    try {
        const connection = await db();
        const result = await connection.execute(`
            INSERT INTO empleado (Nombre_Empleado, Telefono_Empleado, Usuario, Contrasenia)
            VALUES (?, ?, ?, ?)
        `, [nombre, telefono, usuario, contrasena]);
        await connection.release();
        return "yes";
    } catch (error) {
        throw error;
    }
};
