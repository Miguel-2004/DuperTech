const db = require('../utils/database');

// Contar el número total de promociones
exports.countPromociones = async () => {
    const connection = await db();
    try {
        const [result] = await connection.execute('SELECT COUNT(*) as total FROM recompensa');
        await connection.release();
        return result[0].total;
    } catch (error) {
        console.error('Error al contar las promociones:', error);
        throw error;
    }
};

// Obtener promociones con paginación
exports.getPromocionesPaginated = async (limit, offset) => {
    const connection = await db();
    try {
        const [result] = await connection.execute('SELECT * FROM recompensa LIMIT ? OFFSET ?', [limit, offset]);
        await connection.release();
        return result;
    } catch (error) {
        console.error('Error al obtener las promociones paginadas:', error);
        throw error;
    }
};

exports.getPromociones = async (limit, offset) => {
    const connection = await db();
    try {
        const [result] = await connection.execute('SELECT * FROM recompensa');
        await connection.release();
        return result;
    } catch (error) {
        console.error('Error al obtener las promociones paginadas:', error);
        throw error;
    }
};

// Registrar nueva promoción (en recompensa y regalo)
exports.registrarPromocion = async (nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo) => {
    const connection = await db();
    try {
        await connection.beginTransaction();

        const [result] = await connection.execute(
            'INSERT INTO recompensa (Nombre_Recompensa, Fecha_Inicio, Fecha_Final) VALUES (?, ?, ?)', 
            [nombreRecompensa, fechaInicio, fechaFinal]
        );
        const idRecompensa = result.insertId;

        await connection.execute(
            'INSERT INTO regalo (ID_Recompensa, Nombre_Regalo, Descripcion_Regalo) VALUES (?, ?, ?)', 
            [idRecompensa, nombreRecompensa, descripcionRegalo]
        );

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        console.error('Error al registrar la promoción:', error);
        throw error;
    } finally {
        connection.release();
    }
};

// Editar una promoción existente
exports.editarPromocion = async (idRecompensa, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo) => {
    const connection = await db();
    try {
        await connection.beginTransaction();

        await connection.execute(
            'UPDATE recompensa SET Nombre_Recompensa = ?, Fecha_Inicio = ?, Fecha_Final = ? WHERE ID_Recompensa = ?',
            [nombreRecompensa, fechaInicio, fechaFinal, idRecompensa]
        );

        await connection.execute(
            'UPDATE regalo SET Nombre_Regalo = ?, Descripcion_Regalo = ? WHERE ID_Recompensa = ?',
            [nombreRecompensa, descripcionRegalo, idRecompensa]
        );

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        console.error('Error al editar la promoción:', error);
        throw error;
    } finally {
        connection.release();
    }
};

// Eliminar una promoción (de recompensa y regalo)
exports.eliminarPromocion = async (idRecompensa) => {
    const connection = await db();
    try {
        await connection.beginTransaction();

        await connection.execute('DELETE FROM regalo WHERE ID_Recompensa = ?', [idRecompensa]);
        await connection.execute('DELETE FROM recompensa WHERE ID_Recompensa = ?', [idRecompensa]);

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        console.error('Error al eliminar la promoción:', error);
        throw error;
    } finally {
        connection.release();
    }
};
