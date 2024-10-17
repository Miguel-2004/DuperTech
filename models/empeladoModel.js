const db = require('../utils/database');

module.exports = class Usuario {
    // Buscar empleados con paginación
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

    // Buscar empleados por nombre con paginación
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

    // Contar empleados que coincidan con la búsqueda
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

    // Obtener el último usuario para autoincremento
    static async getUltimoUsuario() {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                SELECT Usuario FROM empleado ORDER BY Usuario DESC LIMIT 1
            `);
            await connection.release();
            return result[0].Usuario;
        } catch (e) {
            throw e;
        }
    }

    // Buscar administradores por nombre
    static async searchAdmin(searchQuery) {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                SELECT * FROM administrador 
                WHERE Nombre LIKE ?
            `, [`%${searchQuery}%`]);
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }

    // Obtener administradores
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

    // Obtener administradores por establecimiento
    static async getAdminsPorEstablecimiento(ID_Establecimiento) {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                SELECT * FROM administrador WHERE ID_Establecimiento = ?
            `, [ID_Establecimiento]);
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }

    // Actualizar el estado del empleado
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

    // Crear empleado
    static async createEmpleado(nombre, telefono, usuario, contrasena, ID_Establecimiento, id_Admin) {
        const connection = await db();
        try {
            await connection.beginTransaction();
            await connection.execute(`
                INSERT INTO empleado (Nombre_Empleado, Telefono_Empleado, Usuario, Contrasenia, ID_Establecimiento, ID_Admin)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [nombre, telefono, usuario, contrasena, ID_Establecimiento, id_Admin]
            );
            await connection.commit();
            return "yes";
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            await connection.release();
        }
    }

    // Editar empleado
    static async editTrabajador(nombre, telefono, ID_Establecimiento, id_Admin, ID_Empleado) {
        const connection = await db();
        try {
            await connection.beginTransaction();
            const [result] = await connection.execute(`
                UPDATE empleado 
                SET Nombre_Empleado = ?, Telefono_Empleado = ?, ID_Establecimiento = ?, ID_Admin = ? 
                WHERE ID_Empleado = ?`,
                [nombre, telefono, ID_Establecimiento, id_Admin, ID_Empleado]
            );
            await connection.commit();
            return result;
        } catch (error) {
            throw error;
        } finally {
            await connection.release();
        }
    }
};
