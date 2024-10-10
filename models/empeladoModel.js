const db = require('../utils/database');

module.exports = class Usuario {
    static async getTrabajador(limit,offset) {
        try {
            const connection = await db();
            const [result] = await connection.execute(`
                SELECT * FROM empleado LIMIT ? OFFSET ?
            `, [limit, offset]);
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }

    // Obtener trabajador con paginación
    static async getTrabajadorP(limit, offset) {
        try {
            const connection = await db();
            const [result] = await connection.execute(`
                SELECT * FROM empleado LIMIT ? OFFSET ?
            `, [limit, offset]);
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }

    // Contar el total de empleados
    static async countTrabajador() {
        try {
            const connection = await db();
            const [result] = await connection.execute('SELECT COUNT(*) as total FROM empleado');
            await connection.release();
            return result[0].total;
        } catch (e) {
            throw e;
        }
    }

    static async getAdmin() {
        try {
            const connection = await db();
            const [result] = await connection.execute(`
                SELECT * FROM administrador
            `);
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }

    static async createEmpleado(nombre, telefono, usuario, contrasena, ID_Es, id_Admin) {
        const connection = await db();
        try {
            await connection.beginTransaction();
            await connection.execute(`
                INSERT INTO empleado (Nombre_Empleado, Telefono_Empleado, Usuario, Contrasenia, ID_Establecimiento, ID_Admin)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [nombre, telefono, usuario, contrasena, ID_Es, id_Admin]
            );
            await connection.commit();
            return "yes";
        } catch (error) {
            await connection.rollback();  // Rollback in case of an error
            throw error;
        } finally {
            await connection.release();
        }
    };

    static async editTrabajador(nombre, telefono, usuario, contrasena, ID_Es, id_Admin, ID_Empleado) {
        const connection = await db();
        try {
            await connection.beginTransaction();
            const[result] = await connection.execute(`UPDATE empleado SET Nombre_Empleado = ?, Telefono_Empleado = ?, Usuario = ?, Contrasenia = ?, ID_Establecimiento = ?, ID_Admin = ? WHERE ID_Empleado = ?`,
                [nombre, telefono, usuario, contrasena, ID_Es, id_Admin, ID_Empleado]  // Asegúrate de tener el ID_Empleado
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
