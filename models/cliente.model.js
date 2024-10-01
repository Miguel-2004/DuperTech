const db = require('../utils/database');

module.exports = class Cliente {

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

    static async crearCliente (nombre, telefono, FechaNac, sexo) {
        const connection = await db();
        try {
            await connection.beginTransaction();

            const [result] = await connection.execute(`
                INSERT INTO cliente (Nombre_Cliente, Telefono_Cliente, Fecha_Nac, Sexo)
                VALUES (?, ?, ?, ?)`,
                [nombre, telefono, FechaNac, sexo]
        );
            await connection.commit();
            return "yes";
        } catch (error) {
            throw error;
        } finally {
            await connection.release();
        }
    };
};