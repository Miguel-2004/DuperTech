const TarjetasModel = require('../models/tarjetas.model');
const cliente = require('../models/cliente.model');
const Establecimiento = require('../models/establecimientos.model');
const version = require('../models/version.model');

// Listar tarjetas con paginación y filtros
exports.listarTarjetas = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const search = req.query.search || null;
    let idTarjeta = null;
    let nombreCliente = null;
    let telefono = null;

    if (search) {
        if (!isNaN(search)) {
            if (search.length === 10) {
                telefono = search;
            } else {
                idTarjeta = search;
            }
        } else {
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

        // Obtener los clientes sin tarjeta
        const Clientes = await cliente.getClienteSinTarjeta();

        const versiones = await version.getVersion();

        // Renderizar la vista de tarjetas
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
            establecimientos,
            Clientes,
            versiones
        });
    } catch (error) {
        console.error('Error al listar las tarjetas:', error);
        res.status(500).send('Error al listar las tarjetas.');
    }
};


exports.nuevaTarjeta = async (req, res, next) => {
    try {
        // Extracción de datos del formulario
        const idTarjeta = req.body.idtarjeta;
        const idCliente = req.body.idcliente;
        const ID_Establecimiento = req.body.idestablecimiento;
        const version = req.body.version;

        // Generar la fecha actual (si no se recibe del formulario)
        const fechaE = new Date(); // Usar la fecha actual para la emisión

        // Crear nueva tarjeta
        const Tarjeta = await TarjetasModel.crearTarjeta(idTarjeta, idCliente, ID_Establecimiento, fechaE, version);


        if (!Tarjeta) {
            // Si la tarjeta no se crea correctamente, redirige a la página de tarjetas con un mensaje de error
            return res.redirect(process.env.PATH_SERVER + 'tarjetas?error=creacionTarjeta');
        }

        // Si la creación es exitosa, redirige a la página principal de tarjetas
        return res.redirect(process.env.PATH_SERVER + 'tarjetas');
    } catch (e) {
        console.error("Error en el proceso de creación de tarjeta:", e);

        // Si ocurre un error inesperado, redirige a la página de tarjetas con un mensaje de error
        return res.redirect(process.env.PATH_SERVER + 'tarjetas?error=errorGeneral');
    }
};    