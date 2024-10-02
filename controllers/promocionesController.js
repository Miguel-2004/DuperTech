const PromocionesModel = require('../models/promociones.model');

// Obtener todas las promociones
exports.getAllPromociones = async (req, res) => {
    try {
        const promociones = await PromocionesModel.getAllPromociones();
        res.render('promocion', { promociones });
    } catch (error) {
        console.error('Error al obtener las promociones:', error);
        res.status(500).send('Error al obtener las promociones.');
    }
};

// Registrar una nueva promoción
exports.registrarPromocion = async (req, res) => {
    console.log(req.body);  // Verifica los datos que llegan
    const { nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo } = req.body;

    // Verificación de campos requeridos
    if (!nombreRecompensa || !fechaInicio || !fechaFinal || !descripcionRegalo) {
        return res.status(400).send('Todos los campos son requeridos.');
    }

    try {
        // Llamada al modelo para registrar la nueva promoción
        await PromocionesModel.registrarPromocion(nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo);
        res.redirect('/promociones');
    } catch (error) {
        console.error('Error al registrar la promoción:', error);
        res.status(500).send('Error al registrar la promoción.');
    }
};

// Editar una promoción existente
exports.editarPromocion = async (req, res) => {
    const { idRecompensa, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo } = req.body;

    if (!idRecompensa || !nombreRecompensa || !fechaInicio || !fechaFinal || !descripcionRegalo) {
        return res.status(400).send('Todos los campos son requeridos.');
    }

    try {
        await PromocionesModel.editarPromocion(idRecompensa, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo);
        res.redirect('/promociones');
    } catch (error) {
        console.error('Error al editar la promoción:', error);
        res.status(500).send('Error al editar la promoción.');
    }
};

// Eliminar una promoción
exports.eliminarPromocion = async (req, res) => {
    const { ID_Recompensa } = req.body;

    if (!ID_Recompensa) {
        return res.status(400).send('ID de la recompensa es requerido.');
    }

    try {
        await PromocionesModel.eliminarPromocion(ID_Recompensa);
        res.redirect('/promociones');
    } catch (error) {
        console.error('Error al eliminar la promoción:', error);
        res.status(500).send('Error al eliminar la promoción.');
    }
};
