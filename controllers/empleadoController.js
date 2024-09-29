const Model = require('../models/empeladoModel');


exports.getAllTrabajadores = async (req, res, next) => {
    try{
        const Trabajadores = await Model.usuarios.getTrabajador();
        //console.log(Trabajadores)

        const TrabajadoresArray = Array.isArray(Trabajadores) ? Trabajadores : [Trabajadores];
        res.render('empleados', { Trabajadores: TrabajadoresArray });

        //res.render('empleados', {Trabajadores});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar la página principal');
    }
};

exports.nuevoEmpleado = async (req, res, next) => {
    try {
        const Establecimiento = await Model.establecimiento.getEstablecimientos();
        const admin = await Model.usuarios.getAdmin();

        const nombre = req.body.nombre;
        const telefono = req.body.telefono;
        const usuario = req.body.usuario;
        const contrasena = req.body.password;
        const ID_Es = req.body.id_Establecimiento;
        const id_Admin = req.body.id_Admin;
        const empleado = await Model.usuarios.createEmpleado(nombre, telefono, usuario, contrasena, ID_Es, id_Admin)

        if (!empleado) {
            return res.render('empleados', { mensaje: 'Error al crear el empleado' });
        }
        res.render('empleados', { Establecimiento });
    } catch (e) {
        console.error(e);
        res.status(500).render('empleados', { mensaje: 'Error al cargar los datos', Establecimiento });
    }
};