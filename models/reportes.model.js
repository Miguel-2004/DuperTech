const db = require('../utils/database');

module.exports = class Reporte {
    // Obtener recompensas reclamadas por año y mes
    static async getRecompensasPorMes() {
        try {
            const connection = await db();
            //console.log('Conexión a la base de datos establecida.');

            const [result] = await connection.execute(`
                SELECT 
                    YEAR(Fecha_Reclamacion) AS Año,
                    MONTH(Fecha_Reclamacion) AS Mes,
                    COUNT(ID_Recompensa) AS Total_Recompensas
                FROM 
                    reclamacion_recompensa
                GROUP BY 
                    Año, Mes
                ORDER BY 
                    Año, Mes;
            `);

            //console.log('Datos obtenidos desde la base de datos:', result);

            await connection.release();
            return result;
        } catch (error) {
            console.error('Error en el modelo al ejecutar la consulta:', error);
            throw error;
        }
    }
};
