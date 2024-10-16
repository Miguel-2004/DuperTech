const db = require('../utils/database');

module.exports = class Usuario {
    static async getTrabajador(limit, offset) {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                SELECT * FROM empleado LIMIT ? OFFSET ?
            `, [limit, offset]);
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }

    static async countTrabajador() {
        const connection = await db();
        try {
            const [result] = await connection.execute('SELECT COUNT(*) as total FROM empleado');
            await connection.release();
            return result[0].total;
        } catch (e) {
            throw e;
        }
    }

    static async getAdmin() {
        const connection = await db();
        try {
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
            await connection.rollback();
            throw error;
        } finally {
            await connection.release();
        }
    };

    static async editTrabajador(nombre, telefono, usuario, contrasena, ID_Es, id_Admin, ID_Empleado) {
        const connection = await db();
        try {
            await connection.beginTransaction();
            await connection.execute(`
                UPDATE empleado SET Nombre_Empleado = ?, Telefono_Empleado = ?, Usuario = ?, Contrasenia = ?, ID_Establecimiento = ?, ID_Admin = ?
                WHERE ID_Empleado = ?`,
                [nombre, telefono, usuario, contrasena, ID_Es, id_Admin, ID_Empleado]
            );
            await connection.commit();
            return "yes";
        } catch (error) {
            throw error;
        } finally {
            await connection.release();
        }
    };

    static async searchTrabajador(searchQuery, limit, offset) {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                SELECT * FROM empleado 
                WHERE Nombre_Empleado LIKE ? 
                LIMIT ? OFFSET ?
            `, [`%${searchQuery}%`, limit, offset]);
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }

    static async countSearchTrabajador(searchQuery) {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                SELECT COUNT(*) as total FROM empleado 
                WHERE Nombre_Empleado LIKE ?
            `, [`%${searchQuery}%`]);
            await connection.release();
            return result[0].total;
        } catch (e) {
            throw e;
        }
    }

    static async actualizarEstado(idEmpleado, estado) {
        const connection = await db();
        try {
            await connection.execute(`
                UPDATE empleado SET estado = ? WHERE ID_Empleado = ?
            `, [estado, idEmpleado]);
            await connection.release();
        } catch (error) {
            console.error('Error al actualizar en la base de datos:', error);
            throw error;
        }
    }
};
