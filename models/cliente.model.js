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

    // Obtener los datos de los clientes con paginación y búsqueda
    static async searchCliente(searchQuery, limit, offset) {
        const connection = await db();
        try {
          const [result] = await connection.execute(`
            SELECT * FROM cliente c JOIN tarjeta t ON c.ID_Cliente = t.ID_Cliente
            WHERE c.Nombre_Cliente LIKE ? OR c.Telefono_Cliente LIKE ?
            LIMIT ? OFFSET ?
          `, [`%${searchQuery}%`, `%${searchQuery}%`, limit, offset]);
      
          return result;
        } catch (e) {
          console.error(e);
          throw e;
        } finally {
          await connection.release();  // Asegúrate de liberar la conexión
        }
      }

    // Contar el número de clientes con búsqueda
    static async countSearchClientes(searchQuery) {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                SELECT COUNT(*) as count FROM cliente
                WHERE Nombre_Cliente LIKE ? OR Telefono_Cliente LIKE ?
            `, [`%${searchQuery}%`, `%${searchQuery}%`]);
            await connection.release();
            return result[0].count;
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
