const Model = require('../models/empeladoModel');
const Establecimiento = require('../models/establecimiento.model');


exports.getAllTrabajadores = async (req, res, next) => {
    try{
        const Trabajadores = await Model.getTrabajador();
        //console.log(Trabajadores)
        const establecimiento = await Establecimiento.getEstablecimientos();
        const admin = await Model.getAdmin();

        const TrabajadoresArray = Array.isArray(Trabajadores) ? Trabajadores : [Trabajadores];
        res.render('empleados', { Trabajadores: TrabajadoresArray, establecimiento:establecimiento, admin: admin });

        //res.render('empleados', {Trabajadores});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar la página principal');
    }
};

exports.nuevoEmpleado = async (req, res, next) => {
    try {
        const establecimiento = await Establecimiento.getEstablecimientos();
        //console.log(establecimiento);
        const admin = await Model.getAdmin();

        const Trabajadores = await Model.getTrabajador();
        const TrabajadoresArray = Array.isArray(Trabajadores) ? Trabajadores : [Trabajadores];
        
        // console.log(Trabajadores);


        const nombre = req.body.nombre;
        const telefono = req.body.telefono;
        const usuario = req.body.usuario;
        const contrasena = req.body.password;
        const ID_Es = req.body.ID_Establecimiento;
        const id_Admin = req.body.id_Admin;
        const empleado = await Model.createEmpleado(nombre, telefono, usuario, contrasena, ID_Es, id_Admin)

        if (!empleado) {
            return res.render('empleados', { mensaje: 'Error al crear el empleado' });
        }
        res.render('empleados', { establecimiento: establecimiento, Trabajadores: TrabajadoresArray, admin: admin });
    } catch (e) {
        console.error(e);
        res.status(500).render('empleados', { mensaje: 'Error al cargar los datos' });
    }
};

exports.editarEmpleado = async (req, res, next) => {
    try{
        const Trabajadores = await Model.getTrabajador();
        //console.log(Trabajadores)
        const establecimiento = await Establecimiento.getEstablecimientos();
        const admin = await Model.getAdmin();

        const TrabajadoresArray = Array.isArray(Trabajadores) ? Trabajadores : [Trabajadores];
        res.render('empleados', { Trabajadores: TrabajadoresArray, establecimiento:establecimiento, admin: admin });

        //res.render('empleados', {Trabajadores});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar la página principal');
    }
};