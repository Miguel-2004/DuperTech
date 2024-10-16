const Model = require('../models/empeladoModel');
const Establecimiento = require('../models/establecimientos.model');

exports.getAllTrabajadores = async (req, res, next) => {
    try {
        const Trabajadores = await Model.getTrabajador();
        const establecimiento = await Establecimiento.getEstablecimientos();
        const admin = await Model.getAdmin();

        const TrabajadoresArray = Array.isArray(Trabajadores) ? Trabajadores : [Trabajadores];
        res.render('empleados', { Trabajadores: TrabajadoresArray, establecimiento: establecimiento, admin: admin });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar la página principal');
    }
};

// Obtener los empleados con paginación y búsqueda por nombre
exports.getTrabajadores = async (req, res) => {
    try {
        const searchQuery = req.query.search || ''; // Búsqueda solo por nombre
        const currentPage = parseInt(req.query.page) || 1;
        const limit = 10; // Número de elementos por página
        const offset = (currentPage - 1) * limit;

        const establecimiento = await Establecimiento.getEstablecimientos();
        const admin = await Model.getAdmin();

        // Obtener los trabajadores y el total con búsqueda por nombre
        const Trabajadores = await Model.searchTrabajador(searchQuery, limit, offset);
        const totalTrabajadores = await Model.countSearchTrabajador(searchQuery);
        const totalPages = Math.ceil(totalTrabajadores / limit);

        res.render('empleados', {
            Trabajadores: Trabajadores,
            currentPage: currentPage,
            totalPages: totalPages,
            establecimiento: establecimiento,
            admin: admin,
            searchQuery: searchQuery // Pasar el término de búsqueda a la vista
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los empleados');
    }
};

exports.nuevoEmpleado = async (req, res, next) => {
    try {
        const currentPage = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (currentPage - 1) * limit;

        const establecimiento = await Establecimiento.getEstablecimientos();
        const admin = await Model.getAdmin();

        const nombre = req.body.nombre;
        const telefono = req.body.telefono;
        const usuario = req.body.usuario;
        const contrasena = req.body.password;
        const ID_Es = req.body.ID_Establecimiento;
        const id_Admin = req.body.id_Admin;

        const empleado = await Model.createEmpleado(nombre, telefono, usuario, contrasena, ID_Es, id_Admin);

        if (!empleado) {
            return res.render('empleados', { mensaje: 'Error al crear el empleado' });
        }
        res.render('empleados', {
            establecimiento: establecimiento,
            admin: admin 
        });
    } catch (e) {
        console.error(e);
        res.status(500).render('empleados', { mensaje: 'Error al cargar los datos' });
    }
};

exports.editarEmpleado = async (req, res, next) => {
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

        res.render('empleados', {
            Trabajadores: TrabajadoresArray,
            currentPage: page,
            totalPages: totalPages,
            establecimiento: establecimiento,
            admin: admin
        });

        const nombre = req.body.nombre || null;
        const telefono = req.body.telefono || null;
        const usuario = req.body.usuario || null;
        const contrasena = req.body.contrasena || null;
        const ID_Es = req.body.ID_Establecimiento || null;
        const id_Admin = req.body.id_Admin || null;
        const ID_Empleado = req.body.ID_Empleado || null;

        const empleado = await Model.editTrabajador(nombre, telefono, usuario, contrasena, ID_Es, id_Admin, ID_Empleado);

        if (!empleado) {
            return res.render('empleados', {mensaje: "error", Trabajadores: TrabajadoresArray});
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

    if (!idEmpleado || estado === undefined) {
        return res.status(400).json({ success: false, message: 'Datos incompletos' });
    }

    try {
        await Model.actualizarEstado(idEmpleado, estado);
        res.json({ success: true });
    } catch (error) {
        console.error('Error al actualizar en la base de datos:', error);
        res.status(500).json({ success: false, message: 'Error al actualizar el estado.' });
    }
};
