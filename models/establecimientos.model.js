const db = require('../utils/database');

module.exports = class Establecimiento {

    //obtener establecimientos sin paginacion
    static async getEstablecimientos() {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                SELECT * FROM establecimiento
            `);
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }

    // Obtener establecimientos con paginación
    static async getEstablecimientosPaginated(limit, offset) {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                SELECT * FROM establecimiento LIMIT ? OFFSET ?
            `, [limit, offset]);
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }

    // Contar el total de establecimientos
    static async countEstablecimientos() {
        const connection = await db();
        try {
            const [result] = await connection.execute('SELECT COUNT(*) as total FROM establecimiento');
            await connection.release();
            return result[0].total;
        } catch (e) {
            throw e;
        }
    }

    // Agregar un establecimiento
    static async agregarEstablecimiento(nombre, direccion) {
        const connection = await db();
        try {
            await connection.execute(`
                INSERT INTO establecimiento (Nombre_Establecimiento, Dir_Estab)
                VALUES (?, ?)
            `, [nombre, direccion]);
            await connection.release();
        } catch (e) {
            throw e;
        }
    }

    // Editar un establecimiento
    static async editarEstablecimiento(id, nombre, direccion) {
        const connection = await db();
        try {
            await connection.execute(`
                UPDATE establecimiento
                SET Nombre_Establecimiento = ?, Dir_Estab = ?
                WHERE ID_Establecimiento = ?
            `, [nombre, direccion, id]);
            await connection.release();
        } catch (e) {
            throw e;
        }
    }

    // Eliminar un establecimiento
    static async eliminarEstablecimiento(id) {
        const connection = await db();
        try {
            await connection.execute('DELETE FROM establecimiento WHERE ID_Establecimiento = ?', [id]);
            await connection.release();
        } catch (e) {
            throw e;
        }
    }
};
