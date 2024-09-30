const db = require('../utils/database');


module.exports = class Establecimiento {

    static async getEstablecimientos() {
        try {
            const connection = await db();
            const [result] = await connection.execute(`
                SELECT * FROM establecimiento;
            `);
            await connection.release();
            return result;
        } catch (error) {
            console.error('Error al obtener los establecimientos:', error);
            throw error;
        }
    }
};