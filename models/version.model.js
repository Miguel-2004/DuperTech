
const db = require('../utils/database');

module.exports = class Version {

    // Obtener todas las versiones
    static async getVersion() {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                SELECT * FROM version 
            `); 
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }

    // Obtener las versiones paginadas
    static async getVersionP(limit, offset) {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                SELECT * FROM version LIMIT ? OFFSET ?
            `, [limit, offset]);
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }

    // Contar el total de empleados
    static async countVersion() {
        const connection = await db();
        try {
            const [result] = await connection.execute('SELECT COUNT(*) as total FROM version');
            await connection.release();
            return result[0].total;
        } catch (e) {
            throw e;
        }
    }

    // Obtener una versión por su ID
    static async getVersionById(id) {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                SELECT numero, IF(LOCATE('#', color) = 0, CONCAT('#', color), color) AS color, imagen, promo1, promo2 
                FROM version 
                WHERE numero = ?
            `, [id]);
            await connection.release();
            return result[0];
        } catch (e) {
            throw e;
        }
    }
    

    // Actualizar una versión
    static async updateVersion(id, color, promo1, promo2) {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                UPDATE version 
                SET color = ?, promo1 = ?, promo2 = ?
                WHERE numero = ?`, [color, promo1, promo2, id]);
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }
    

    // Crear una nueva versión
    static async createVer(color, promo1, promo2, imagen) {
        const connection = await db();
        try {
            const [result] = await connection.execute(`INSERT INTO version (color, promo1, promo2, imagen) VALUES (?, ?, ?, ?)`, [color, promo1, promo2, imagen]);
            await connection.commit();
            
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }
};