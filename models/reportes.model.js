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

    static async reclamacion() {
        try {
            const connection = await db();
            const [result] = await connection.execute(`
                SELECT 
                    DATE_FORMAT(Fecha_Reclamacion, '%Y-%m') AS mes,
                    COUNT(*) AS canjeadas
                FROM 
                    reclamacion_recompensa
                GROUP BY 
                    mes
                ORDER BY 
                    mes;
            `);

            await connection.release();
            return result;
        } catch (error) {
            console.log('Error en el modelo al ejecutar la consulta:', error);
            throw error;
        }
    }

    static async getTarjetasPorSucursal() {
        try {
            const connection = await db();
            const [result] = await connection.execute(`
                SELECT 
                    s.Nombre_Establecimiento,
                    COUNT(t.ID_Tarjeta) AS Total_Tarjetas
                FROM 
                    tarjeta t
                JOIN 
                    establecimiento s ON t.ID_Establecimiento = s.ID_Establecimiento
                GROUP BY 
                    s.Nombre_Establecimiento;
            `);

            await connection.release();
            return result;
        } catch (error) {
            console.error('Error en el modelo al ejecutar la consulta de tarjetas por sucursal:', error);
            throw error;
        }
    }

    static async getSellosPorSucursal() {
        try {
            const connection = await db();
            const [result] = await connection.execute(`
                SELECT 
                    s.Nombre_Establecimiento,
                    COUNT(se.Sello_ID) AS Total_Sellos
                FROM 
                    sello se
                JOIN 
                    tarjeta t ON se.ID_Tarjeta = t.ID_Tarjeta
                JOIN 
                    establecimiento s ON t.ID_Establecimiento = s.ID_Establecimiento
                GROUP BY 
                    s.Nombre_Establecimiento;
            `);

            await connection.release();
            return result;
        } catch (error) {
            console.error('Error en el modelo al ejecutar la consulta de sellos por sucursal:', error);
            throw error;
        }
    }
};
