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
                SELECT * FROM cliente
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
        const [result] = await connection.execute(`SELECT * FROM establecimiento;`);
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

// Obtener todas las promociones
exports.obtenerPromociones = async () => {
    try {
        const connection = await db();
        const [result] = await connection.execute(`SELECT ID_Recompensa, Nombre_Recompensa, Fecha_Inicio, Fecha_Final FROM recompensa`);
        
        // Depuración: Asegúrate de que los datos están llegando
        console.log('Promociones obtenidas en el modelo:', result); 
        
        await connection.release();
        return result;
    } catch (error) {
        console.error('Error al obtener las promociones:', error);
        throw error;
    }
};

// Insertar una nueva promoción y regalo
exports.insertarPromocion = async (nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo) => {
    try {
        const connection = await db();

        // Insertar en la tabla recompensa
        await connection.execute(
            `INSERT INTO recompensa (Nombre_Recompensa, Fecha_Inicio, Fecha_Final) VALUES (?, ?, ?)`,
            [nombreRecompensa, fechaInicio, fechaFinal]
        );

        // Obtener el ID generado para insertar en la tabla regalo
        const [rows] = await connection.execute(`SELECT LAST_INSERT_ID() as ID_Recompensa`);
        const idRecompensa = rows[0].ID_Recompensa;

        // Insertar en la tabla regalo usando el ID_Recompensa generado
        await connection.execute(
            `INSERT INTO regalo (ID_Recompensa, Nombre_Regalo, Descripcion_Regalo) VALUES (?, ?, ?)`,
            [idRecompensa, nombreRecompensa, descripcionRegalo]
        );

        await connection.release();
    } catch (error) {
        console.error('Error al insertar la promoción:', error);
        throw error;
    }
};

// Actualizar una promoción y su regalo
exports.actualizarPromocion = async (idRecompensa, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo) => {
    try {
        const connection = await db();

        // Actualizar la tabla recompensa
        await connection.execute(
            `UPDATE recompensa SET Nombre_Recompensa = ?, Fecha_Inicio = ?, Fecha_Final = ? WHERE ID_Recompensa = ?`,
            [nombreRecompensa, fechaInicio, fechaFinal, idRecompensa]
        );

        // Actualizar la tabla regalo vinculada al ID_Recompensa
        await connection.execute(
            `UPDATE regalo SET Nombre_Regalo = ?, Descripcion_Regalo = ? WHERE ID_Recompensa = ?`,
            [nombreRecompensa, descripcionRegalo, idRecompensa]
        );

        await connection.release();
    } catch (error) {
        console.error('Error al actualizar la promoción:', error);
        throw error;
    }
};
