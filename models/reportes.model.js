const db = require('../utils/database');

module.exports = class Reporte {
    static async getSellosPorEmpleado() {
        try {
            const connection = await db();
            const [result] = await connection.execute(`
                SELECT 
                    e.ID_Empleado,
                    e.Nombre_Empleado,
                    COUNT(s.Sello_ID) AS Total_Sellos
                FROM 
                    sello s
                JOIN 
                    empleado e ON s.ID_Empleado = e.ID_Empleado
                GROUP BY 
                    e.ID_Empleado, e.Nombre_Empleado;
            `);

            await connection.release();
            return result;
        } catch (error) {
            console.error('Error en el modelo al ejecutar la consulta:', error);
            throw error;
        }
    }
};
