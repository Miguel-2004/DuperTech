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
    try {
        const { nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo } = req.body;
        await PromocionesModel.registrarPromocion(nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo);
        res.redirect('/promociones');
    } catch (error) {
        console.error('Error al registrar la promoción:', error);
        res.status(500).send('Error al registrar la promoción.');
    }
};

// Editar una promoción existente
exports.editarPromocion = async (req, res) => {
    try {
        const { idRecompensa, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo } = req.body;
        await PromocionesModel.editarPromocion(idRecompensa, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo);
        res.redirect('/promociones');
    } catch (error) {
        console.error('Error al editar la promoción:', error);
        res.status(500).send('Error al editar la promoción.');
    }
};

// Eliminar una promoción
exports.eliminarPromocion = async (req, res) => {
    try {
        const { ID_Recompensa } = req.body;
        await PromocionesModel.eliminarPromocion(ID_Recompensa);
        res.redirect('/promociones');
    } catch (error) {
        console.error('Error al eliminar la promoción:', error);
        res.status(500).send('Error al eliminar la promoción.');
    }
};
