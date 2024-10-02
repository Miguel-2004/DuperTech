const db = require('../utils/database');

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
