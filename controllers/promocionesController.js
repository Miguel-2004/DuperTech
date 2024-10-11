const PromocionesModel = require('../models/promociones.model');

// Obtener promociones con paginación
exports.getPromocionesPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const totalPromociones = await PromocionesModel.countPromociones();
        const totalPages = Math.ceil(totalPromociones / limit);
        const promociones = await PromocionesModel.getPromocionesPaginated(limit, offset);

        res.render('promocion', {
            promociones,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.error('Error al obtener las promociones:', error);
        res.status(500).send('Error al obtener las promociones.');
    }
};

// Registrar una nueva promoción
exports.registrarPromocion = async (req, res) => {
    const { nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo } = req.body;

    try {
        await PromocionesModel.registrarPromocion(nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo);
        res.redirect(process.env.PATH_SERVER+'promociones');
    } catch (error) {
        console.error('Error al registrar la promoción:', error);
        res.status(500).send('Error al registrar la promoción.');
    }
};

// Editar una promoción existente
exports.editarPromocion = async (req, res) => {
    const { idRecompensa, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo } = req.body;

    try {
        await PromocionesModel.editarPromocion(idRecompensa, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo);
        res.redirect(process.env.PATH_SERVER+'promociones');
    } catch (error) {
        console.error('Error al editar la promoción:', error);
        res.status(500).send('Error al editar la promoción.');
    }
};

// Eliminar una promoción
exports.eliminarPromocion = async (req, res) => {
    const { ID_Recompensa } = req.body;

    try {
        await PromocionesModel.eliminarPromocion(ID_Recompensa);
        res.redirect(process.env.PATH_SERVER+'promociones');
    } catch (error) {
        console.error('Error al eliminar la promoción:', error);
        res.status(500).send('Error al eliminar la promoción.');
    }
};
