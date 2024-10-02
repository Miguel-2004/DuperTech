exports.listarTarjetas = async (req, res) => {
    try {
        // Obtener el ID de la sucursal del query string (para el filtrado)
        const sucursalID = req.query.sucursalID || null;

        // Obtener tarjetas, ya sea todas o filtradas por sucursal
        const tarjetas = sucursalID
            ? await DuperModel.getTarjetasPorSucursal(sucursalID)
            : await DuperModel.getTarjetasConClientes();

        // Obtener la lista de establecimientos
        const establecimientos = await DuperModel.getEstablecimientos();

        // Calcular el total de tarjetas
        const totalTarjetas = tarjetas.length;

        // Renderizar la vista 'tarjetas' y pasar los datos necesarios a la vista
        res.render('tarjetas', { pageTitle: 'tarjetas', establecimientos, tarjetas, totalTarjetas });
    } catch (error) {
        console.error('Error al listar las tarjetas:', error);
        res.status(500).send('Error al listar las tarjetas.');
    }
};
