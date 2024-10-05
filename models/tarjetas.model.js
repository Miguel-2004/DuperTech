const db = require('../utils/database');

// Obtener tarjetas con paginación y filtros
exports.getTarjetasPaginadas = async (limit, offset, { idTarjeta = null, nombreCliente = null, telefono = null, establecimiento = null } = {}) => {
    try {
        const connection = await db();
        let query = `
            SELECT tarjeta.ID_Tarjeta, cliente.Nombre_Cliente, cliente.Telefono_Cliente, establecimiento.Nombre_Establecimiento, tarjeta.Numero_Sellos 
            FROM tarjeta 
            INNER JOIN cliente ON tarjeta.ID_Cliente = cliente.ID_Cliente 
            INNER JOIN establecimiento ON tarjeta.ID_Establecimiento = establecimiento.ID_Establecimiento 
            WHERE 1 = 1
        `;

        const params = [];

        // Filtros dinámicos
        if (idTarjeta) {
            query += ` AND tarjeta.ID_Tarjeta = ?`;
            params.push(idTarjeta);
        }

        if (nombreCliente) {
            query += ` AND cliente.Nombre_Cliente LIKE ?`;
            params.push(`%${nombreCliente}%`);
        }

        if (telefono) {
            query += ` AND cliente.Telefono_Cliente LIKE ?`;
            params.push(`%${telefono}%`);
        }

        if (establecimiento) {
            query += ` AND establecimiento.Nombre_Establecimiento LIKE ?`;
            params.push(`%${establecimiento}%`);
        }

        // Añadir paginación
        query += ` LIMIT ? OFFSET ?`;
        params.push(limit, offset);

        const [result] = await connection.execute(query, params);
        await connection.release();
        return result;
    } catch (error) {
        console.error('Error al obtener las tarjetas paginadas:', error);
        throw error;
    }
};

// Contar tarjetas con filtros
exports.countTarjetas = async ({ idTarjeta = null, nombreCliente = null, telefono = null, establecimiento = null } = {}) => {
    try {
        const connection = await db();
        let query = `
            SELECT COUNT(*) as total 
            FROM tarjeta 
            INNER JOIN cliente ON tarjeta.ID_Cliente = cliente.ID_Cliente
            INNER JOIN establecimiento ON tarjeta.ID_Establecimiento = establecimiento.ID_Establecimiento
            WHERE 1 = 1
        `;

        const params = [];

        // Filtros dinámicos
        if (idTarjeta) {
            query += ` AND tarjeta.ID_Tarjeta = ?`;
            params.push(idTarjeta);
        }

        if (nombreCliente) {
            query += ` AND cliente.Nombre_Cliente LIKE ?`;
            params.push(`%${nombreCliente}%`);
        }

        if (telefono) {
            query += ` AND cliente.Telefono_Cliente LIKE ?`;
            params.push(`%${telefono}%`);
        }

        if (establecimiento) {
            query += ` AND establecimiento.Nombre_Establecimiento LIKE ?`;
            params.push(`%${establecimiento}%`);
        }

        const [result] = await connection.execute(query, params);
        await connection.release();
        return result[0].total;
    } catch (error) {
        console.error('Error al contar las tarjetas:', error);
        throw error;
    }
};

// Obtener todos los establecimientos
exports.getEstablecimientos = async () => {
    try {
        const connection = await db();
        const [result] = await connection.execute(`SELECT * FROM establecimiento`);
        await connection.release();
        return result;
    } catch (error) {
        console.error('Error al obtener los establecimientos:', error);
        throw error;
    }
};
