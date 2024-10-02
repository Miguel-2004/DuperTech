const db = require('../utils/database');

// Obtener todas las promociones
exports.getAllPromociones = async () => {
    try {
        const connection = await db();
        const [result] = await connection.execute(`
            SELECT * FROM recompensa;
        `);
        await connection.release();
        return result;
    } catch (error) {
        console.error('Error al obtener las promociones:', error);
        throw error;
    }
};

// Registrar una nueva promoción
exports.registrarPromocion = async (nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo) => {
    try {
        const connection = await db();
        await connection.beginTransaction();
        
        const [result] = await connection.execute(`
            INSERT INTO recompensa (Nombre_Recompensa, Fecha_Inicio, Fecha_Final)
            VALUES (?, ?, ?)
        `, [nombreRecompensa, fechaInicio, fechaFinal]);
        
        const idRecompensa = result.insertId;
        await connection.execute(`
            INSERT INTO regalo (ID_Recompensa, Descripcion_Regalo)
            VALUES (?, ?)
        `, [idRecompensa, descripcionRegalo]);
        
        await connection.commit();
        await connection.release();
    } catch (error) {
        console.error('Error al registrar la promoción:', error);
        throw error;
    }
};

// Editar una promoción existente
exports.editarPromocion = async (id, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo) => {
    try {
        const connection = await db();
        await connection.beginTransaction();

        await connection.execute(`
            UPDATE recompensa 
            SET Nombre_Recompensa = ?, Fecha_Inicio = ?, Fecha_Final = ?
            WHERE ID_Recompensa = ?
        `, [nombreRecompensa, fechaInicio, fechaFinal, id]);
        
        await connection.execute(`
            UPDATE regalo
            SET Descripcion_Regalo = ?
            WHERE ID_Recompensa = ?
        `, [descripcionRegalo, id]);

        await connection.commit();
        await connection.release();
    } catch (error) {
        console.error('Error al editar la promoción:', error);
        throw error;
    }
};

// Eliminar una promoción existente
exports.eliminarPromocion = async (ID_Recompensa) => {
    try {
        const connection = await db();
        await connection.beginTransaction();
        
        await connection.execute(`DELETE FROM regalo WHERE ID_Recompensa = ?`, [ID_Recompensa]);
        await connection.execute(`DELETE FROM recompensa WHERE ID_Recompensa = ?`, [ID_Recompensa]);

        await connection.commit();
        await connection.release();
    } catch (error) {
        console.error('Error al eliminar la promoción:', error);
        throw error;
    }
};
