const TarjetasModel = require('../models/tarjetas.model');

// Listar tarjetas con paginación y filtros
exports.listarTarjetas = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;  // Mostrar 10 tarjetas por página
    const offset = (page - 1) * limit;

    // Recibir el parámetro de búsqueda
    const search = req.query.search || null;
    let idTarjeta = null;
    let nombreCliente = null;
    let telefono = null;

    // Identificar el tipo de búsqueda que se está realizando
    if (search) {
        // Verificar si es un número para buscar por ID o Teléfono
        if (!isNaN(search)) {
            // Si el valor es numérico, puede ser un ID o un número de teléfono
            if (search.length === 10) {
                telefono = search;  // Asumimos que es un número de teléfono
            } else {
                idTarjeta = search;  // Asumimos que es un ID de tarjeta
            }
        } else {
            // Si no es un número, asumimos que es el nombre del cliente
            nombreCliente = search;
        }
    }

    const establecimiento = req.query.establecimiento || null;

    try {
        // Obtener el número total de tarjetas con los filtros aplicados
        const totalTarjetas = await TarjetasModel.countTarjetas({ idTarjeta, nombreCliente, telefono, establecimiento });
        const totalPages = Math.ceil(totalTarjetas / limit);

        // Obtener las tarjetas con los filtros aplicados
        const tarjetas = await TarjetasModel.getTarjetasPaginadas(limit, offset, { idTarjeta, nombreCliente, telefono, establecimiento });

        // Obtener todos los establecimientos para el filtro
        const establecimientos = await TarjetasModel.getEstablecimientos();

        // Renderizar la vista de tarjetas y pasar las variables necesarias
        res.render('tarjetas', {
            tarjetas,
            currentPage: page,
            totalPages,
            totalTarjetas,
            idTarjeta,
            nombreCliente,
            telefono,
            establecimiento,
            establecimientoFiltro: establecimiento,
            establecimientos
        });
    } catch (error) {
        console.error('Error al listar las tarjetas:', error);
        res.status(500).send('Error al listar las tarjetas.');
    }
};
