
const db = require('../utils/database');

module.exports = class Version {

    // Obtener todas las versiones
    static async getVersion() {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                SELECT * FROM version 
            `); // Asegúrate de que estés obteniendo todos los datos que necesitas (color, imagen, etc.)
            await connection.release();
            return result;
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
            await connection.execute(`
                UPDATE version 
                SET color = ?, promo1 = ?, promo2 = ?
                WHERE numero = ?`, [color, promo1, promo2, id]);
            await connection.release();
        } catch (e) {
            throw e;
        }
    }
    

    // Crear una nueva versión
    static async createVersion(color, promo1, promo2) {
        const connection = await db();
        try {
            await connection.execute(`INSERT INTO version (color, promo1, promo2) VALUES (?, ?, ?)`, [color, promo1, promo2]);
            await connection.release();
        } catch (e) {
            throw e;
        }
    }
};