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

exports.nuevoEmpleado = async (req, res, next) => {
    try {
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
        res.redirect('/empleados');  // Redirige después de crear
    } catch (e) {
        console.error(e);
        res.status(500).render('empleados', { mensaje: 'Error al cargar los datos' });
    }
};

exports.editarEmpleado = async (req, res, next) => {
    try {
        const nombre = req.body.nombre;
        const telefono = req.body.telefono;
        const usuario = req.body.usuario;
        const contrasena = req.body.password;
        const ID_Es = req.body.ID_Establecimiento;
        const id_Admin = req.body.id_Admin;
        const id_Empleado = req.body.ID_Empleado;  // Asegúrate de obtener este valor del formulario

        const resultado = await Model.editTrabajador(nombre, telefono, usuario, contrasena, ID_Es, id_Admin, id_Empleado);

        if (resultado === "yes") {
            res.redirect('/empleados');  // Redirige o muestra algún mensaje de éxito
        } else {
            res.render('empleados', { mensaje: 'Error al editar el empleado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('empleados', { mensaje: 'Error al cargar los datos' });
    }
};
