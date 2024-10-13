const db = require('../utils/database');

module.exports = class Cliente {

    // Obtener los datos de los clientes
    static async getCliente() {
        const connection = await db();
        try {
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

    static async editCliente (nombre, telefono, FechaNac, sexo, id) {
        const connection = await db();
        try {
            await connection.beginTransaction();

            const [result] = await connection.execute(`
                UPDATE cliente
                SET Nombre_Cliente = ?, Telefono_Cliente = ?, Fecha_Nac = ?, Sexo = ?
                WHERE ID_Cliente = ?`,
                [nombre, telefono, FechaNac, sexo, id]
            );
            
            await connection.commit();
            return "yes";
            } 
            catch (error) {
            throw error;
            } 
            finally {
            await connection.release();
            }
    };

    static async getClienteSinTarjeta() {
        const connection = await db();
        try {
            // Ejecutar la consulta
            const [result] = await connection.execute(`
                SELECT cliente.ID_Cliente, cliente.Nombre_Cliente, cliente.Telefono_Cliente
                FROM dupertech_tarjetas.cliente AS cliente
                LEFT JOIN dupertech_tarjetas.tarjeta AS tarjeta
                ON cliente.ID_Cliente = tarjeta.ID_Cliente
                WHERE tarjeta.ID_Tarjeta IS NULL;
            `);
            
            return result;
        } catch (e) {
            // Registrar el error y lanzar la excepción
            console.error("Error obteniendo clientes sin tarjeta:", e);
            throw e;
        } finally {
            // Asegurarse de liberar la conexión en cualquier caso
            await connection.release();
        }
    }
    
};