const db = require('../utils/database');

module.exports = class Version {

    // Obtener el numero de version
    static async getVersion() {
        const connection = await db();
        try {
            const [result] = await connection.execute(`
                SELECT numero FROM version 
            `);
            await connection.release();
            return result;
        } catch (e) {
            throw e;
        }
    }

}