const Model = require('../models/empeladoModel');
const Establecimiento = require('../models/establecimientos.model');

// Obtener empleados y administradores con búsqueda y paginación
exports.getTrabajadores = async (req, res) => {
    try {
        const searchQuery = req.query.search || '';  // Capturar búsqueda
        const currentPage = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (currentPage - 1) * limit;

        const establecimiento = await Establecimiento.getEstablecimientos();
        const admin = await Model.searchAdmin(searchQuery);  // Búsqueda por nombre de admin

        const Trabajadores = await Model.searchTrabajador(searchQuery, limit, offset);
        const totalTrabajadores = await Model.countSearchTrabajador(searchQuery);  // Contar trabajadores que coinciden con la búsqueda
        const totalPages = Math.ceil(totalTrabajadores / limit);

        res.render('empleados', {
            Trabajadores: Trabajadores,
            currentPage: currentPage,
            totalPages: totalPages,
            establecimiento: establecimiento,
            admin: admin,
            searchQuery: searchQuery
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los empleados o administradores');
    }
};

// Crear un nuevo empleado
exports.nuevoEmpleado = async (req, res) => {
    try {
        const ultimoUsuario = await Model.getUltimoUsuario();  // Obtener último usuario
        const nuevoUsuario = parseInt(ultimoUsuario) + 1;  // Incrementar usuario

        const establecimiento = await Establecimiento.getEstablecimientos();
        const admin = await Model.getAdmin();

        res.render('nuevoEmpleado', {
            nuevoUsuario: nuevoUsuario,
            establecimiento: establecimiento,
            admin: admin
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('nuevoEmpleado', { mensaje: 'Error al cargar los datos' });
    }
};

// Editar un empleado
exports.editarEmpleado = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const totalTrabajadores = await Model.countTrabajador();
        const establecimiento = await Establecimiento.getEstablecimientos();
        const admin = await Model.getAdmin();

        const Trabajadores = await Model.getTrabajador(limit, offset);
        const TrabajadoresArray = Array.isArray(Trabajadores) ? Trabajadores : [Trabajadores];
        const totalPages = Math.ceil(totalTrabajadores / limit);

        const { nombre, telefono, ID_Establecimiento, id_Admin, ID_Empleado } = req.body;

        const empleado = await Model.editTrabajador(nombre, telefono, ID_Establecimiento, id_Admin, ID_Empleado);

        if (!empleado) {
            return res.render('empleados', { mensaje: "Error", Trabajadores: TrabajadoresArray, currentPage: page, totalPages: totalPages, establecimiento: establecimiento, admin: admin });
        }

        res.render('empleados', {
            Trabajadores: TrabajadoresArray,
            currentPage: page,
            totalPages: totalPages,
            establecimiento: establecimiento,
            admin: admin
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('empleados', { mensaje: 'Error al cargar los datos' });
    }
};

// Actualizar el estado del empleado
exports.actualizarEstado = async (req, res) => {
    const { idEmpleado, estado } = req.body;

    // Verificación de que los datos existan
    if (!idEmpleado || estado === undefined) {
        return res.status(400).send('Datos incompletos.');
    }

    try {
        // Actualización en la base de datos
        await Model.actualizarEstado(idEmpleado, estado);

        // Redirigir de nuevo a la página de empleados después de la actualización
        res.redirect('/empleado');
    } catch (error) {
        console.error('Error al actualizar en la base de datos:', error);
        res.status(500).send('Error al actualizar el estado.');
    }
};

// Obtener el último usuario para autoincremento
exports.obtenerUltimoUsuario = async (req, res) => {
    try {
        const ultimoUsuario = await Model.getUltimoUsuario();
        res.json({ ultimoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al obtener el último usuario.' });
    }
};

// Obtener el administrador por establecimiento
exports.obtenerAdminPorEstablecimiento = async (req, res) => {
    const { ID_Establecimiento } = req.params;
    try {
        const admins = await Model.getAdminsPorEstablecimiento(ID_Establecimiento);
        res.json({ admins });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al obtener el administrador.' });
    }
};
