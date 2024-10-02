const TarjetasModel = require('../models/tarjetas.model');

// Listar todas las tarjetas
exports.listarTarjetas = async (req, res) => {
    try {
        const sucursalID = req.query.sucursalID || null;
        const tarjetas = sucursalID
            ? await TarjetasModel.getTarjetasPorSucursal(sucursalID)
            : await TarjetasModel.getTarjetasConClientes();

        const establecimientos = await TarjetasModel.getEstablecimientos();
        const totalTarjetas = tarjetas.length;

        res.render('tarjetas', { tarjetas, establecimientos, totalTarjetas });
    } catch (error) {
        console.error('Error al listar las tarjetas:', error);
        res.status(500).send('Error al listar las tarjetas.');
    }
};
