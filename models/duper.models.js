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
        try {
            const connection = await db();
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


// Obtener todas las tarjetas con la información de los clientes y establecimientos
exports.getTarjetasConClientes = async () => {
    try {
        const connection = await db();
        const [result] = await connection.execute(`
            SELECT tarjeta.ID_Tarjeta, tarjeta.ID_Establecimiento, cliente.Nombre_Cliente, establecimiento.Nombre_Establecimiento
            FROM tarjeta
            INNER JOIN cliente ON tarjeta.ID_Cliente = cliente.ID_Cliente
            INNER JOIN establecimiento ON tarjeta.ID_Establecimiento = establecimiento.ID_Establecimiento;
        `);
        await connection.release();
        return result;
    } catch (error) {
        console.error('Error al obtener las tarjetas:', error);
        throw error;
    }
};

// Obtener todos los establecimientos
exports.getEstablecimientos = async () => {
    try {
        const connection = await db();
        const [result] = await connection.execute(`
            SELECT * FROM establecimiento;
        `);
        await connection.release();
        return result;
    } catch (error) {
        console.error('Error al obtener los establecimientos:', error);
        throw error;
    }
};

// Obtener tarjetas por sucursal específica
exports.getTarjetasPorSucursal = async (sucursalID) => {
    try {
        const connection = await db();
        const [result] = await connection.execute(`
            SELECT tarjeta.ID_Tarjeta, tarjeta.ID_Establecimiento, cliente.Nombre_Cliente, establecimiento.Nombre_Establecimiento
            FROM tarjeta
            INNER JOIN cliente ON tarjeta.ID_Cliente = cliente.ID_Cliente
            INNER JOIN establecimiento ON tarjeta.ID_Establecimiento = establecimiento.ID_Establecimiento
            WHERE tarjeta.ID_Establecimiento = ?;
        `, [sucursalID]);
        await connection.release();
        return result;
    } catch (error) {
        console.error('Error al obtener las tarjetas por sucursal:', error);
        throw error;
    }
};

//reportes

// Obtener las promociones reclamadas por mes
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
