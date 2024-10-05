const Establecimiento = require('../models/establecimientos.model');

// Obtener todos los establecimientos con paginación
exports.getEstablecimientos = async (req, res) => {
    try {
        // Obtener el número de página de la solicitud (predeterminada en 1 si no se pasa)
        const currentPage = parseInt(req.query.page) || 1;
        const limit = 10; // Número de elementos por página
        const offset = (currentPage - 1) * limit;

        // Obtener los establecimientos y el total
        const establecimientos = await Establecimiento.getEstablecimientosPaginated(limit, offset);
        const totalEstablecimientos = await Establecimiento.countEstablecimientos();
        const totalPages = Math.ceil(totalEstablecimientos / limit);

        res.render('establecimientos', {
            establecimientos: establecimientos,
            currentPage: currentPage,
            totalPages: totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los establecimientos');
    }
};

// Agregar un nuevo establecimiento
exports.agregarEstablecimiento = async (req, res) => {
    const { nombre, direccion } = req.body;
    try {
        await Establecimiento.agregarEstablecimiento(nombre, direccion);
        res.redirect('/establecimientos');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar el establecimiento');
    }
};

// Editar un establecimiento
exports.editarEstablecimiento = async (req, res) => {
    const { id, nombre, direccion } = req.body;
    try {
        await Establecimiento.editarEstablecimiento(id, nombre, direccion);
        res.redirect('/establecimientos');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al editar el establecimiento');
    }
};

// Eliminar un establecimiento
exports.eliminarEstablecimiento = async (req, res) => {
    const { id } = req.body;
    try {
        await Establecimiento.eliminarEstablecimiento(id);
        res.redirect('/establecimientos');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el establecimiento');
    }
};
