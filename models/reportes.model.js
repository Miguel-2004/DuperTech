const db = require('../utils/database');

module.exports = class Reporte {
    // Obtener sellos por empleado
    static async getSellosPorEmpleado() {
        try {
            const connection = await db();
            const [result] = await connection.execute(`
                SELECT 
                    ID_Empleado,
                    COUNT(Sello_ID) AS Total_Sellos
                FROM 
                    sello
                GROUP BY 
                    ID_Empleado;
            `);

            await connection.release();
            return result;
        } catch (error) {
            console.error('Error en el modelo al ejecutar la consulta:', error);
            throw error;
        }
    }
};
