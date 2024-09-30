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

// Funciones relacionadas con promociones

// Obtener todas las promociones
// Obtener todas las promociones desde la base de datos
exports.getAllPromociones = async () => {
    try {
        const connection = await db();
        const [result] = await connection.execute(`
            SELECT * FROM recompensa;
        `);
        await connection.release();
        return result;
    } catch (error) {
        console.error('Error al obtener las promociones:', error);
        throw error;
    }
};


// Registrar una nueva promoción
exports.registrarPromocion = async (nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo) => {
    try {
        const connection = await db();
        await connection.beginTransaction();
        
        const [result] = await connection.execute(`
            INSERT INTO recompensa (Nombre_Recompensa, Fecha_Inicio, Fecha_Final)
            VALUES (?, ?, ?)
        `, [nombreRecompensa, fechaInicio, fechaFinal]);
        
        const idRecompensa = result.insertId;
        await connection.execute(`
            INSERT INTO regalo (ID_Recompensa, Descripcion_Regalo)
            VALUES (?, ?)
        `, [idRecompensa, descripcionRegalo]);
        
        await connection.commit();
        await connection.release();
    } catch (error) {
        console.error('Error al registrar la promoción:', error);
        throw error;
    }
};

// Editar una promoción existente
exports.editarPromocion = async (id, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo) => {
    try {
        const connection = await db();
        await connection.beginTransaction();

        await connection.execute(`
            UPDATE recompensa 
            SET Nombre_Recompensa = ?, Fecha_Inicio = ?, Fecha_Final = ?
            WHERE ID_Recompensa = ?
        `, [nombreRecompensa, fechaInicio, fechaFinal, id]);
        
        await connection.execute(`
            UPDATE regalo
            SET Descripcion_Regalo = ?
            WHERE ID_Recompensa = ?
        `, [descripcionRegalo, id]);

        await connection.commit();
        await connection.release();
    } catch (error) {
        console.error('Error al editar la promoción:', error);
        throw error;
    }
};

// Eliminar una promoción existente
exports.eliminarPromocion = async (ID_Recompensa) => {
    try {
        const connection = await db();
        await connection.beginTransaction();
        
        await connection.execute(`DELETE FROM regalo WHERE ID_Recompensa = ?`, [ID_Recompensa]);
        await connection.execute(`DELETE FROM recompensa WHERE ID_Recompensa = ?`, [ID_Recompensa]);

        await connection.commit();
        await connection.release();
    } catch (error) {
        console.error('Error al eliminar la promoción:', error);
        throw error;
    }
};

// Obtener todas las tarjetas con la información de los clientes y establecimientos
exports.getTarjetasConClientes = async () => {
    try {
        const connection = await db();
        const [result] = await connection.execute(`
            SELECT tarjeta.ID_Tarjeta, tarjeta.ID_Establecimiento, cliente.Nombre_Cliente, establecimiento.Nombre_Establecimiento, tarjeta.Numero_Sellos 
            FROM tarjeta 
            INNER JOIN cliente ON tarjeta.ID_Cliente = cliente.ID_Cliente 
            INNER JOIN establecimiento ON tarjeta.ID_Establecimiento = establecimiento.ID_Establecimiento 
            LEFT JOIN sello ON tarjeta.ID_Tarjeta = sello.ID_Tarjeta 
            GROUP BY tarjeta.ID_Tarjeta, tarjeta.ID_Establecimiento, cliente.Nombre_Cliente, establecimiento.Nombre_Establecimiento; 
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
