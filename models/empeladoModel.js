const db = require('../utils/database');

module.exports = class Usuario {
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

    static async createEmpleado (nombre, telefono, usuario, contrasena, ID_Es, id_Admin) {
        const connection = await db();
        try {
            await connection.beginTransaction();

            const [result] = await connection.execute(`
                INSERT INTO empleado (Nombre_Empleado, Telefono_Empleado, Usuario, Contrasenia, ID_Establecimiento, ID_Admin)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [nombre, telefono, usuario, contrasena, ID_Es, id_Admin]
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
