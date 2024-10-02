// duper.controller.js
const DuperModel = require('../models/duper.models');


exports.getAllClientes = async (req, res, next) => {
    try{
        const Clientes = await DuperModel.usuarios.getCliente();
        //console.log(Clientes)

        const ClientesArray = Array.isArray(Clientes) ? Clientes : [Clientes];
        res.render('clientes', { Clientes: ClientesArray });

        //res.render('empleados', {Trabajadores});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar la página principal');
    }
};

// Controlador para manejar la solicitud GET
exports.getDuper = async (req, res, next) => {
    try {
        const data = await DuperModel.getAllData(); 
        res.render('main', { data }); // Renderiza la vista `main` con los datos obtenidos
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar la página principal');
    }
};

// Controlador para manejar la solicitud POST
exports.postDuper = async (req, res, next) => {
    try {
        await DuperModel.saveData(req.body); // Guarda los datos enviados en el formulario
        res.redirect('/main'); // Redirige a la ruta `/main` después de procesar la solicitud
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al procesar la solicitud');
    }
};

exports.verificarUser = async (req, res, next) => {
    try{
        const userCorreo = req.body.email
        const userContrasena = req.body.password

        const usuario = await DuperModel.usuarios.verifyUser(userCorreo, userContrasena) // Cambiar veryUser a verifyUser cuando haya coneccion con la base de datos.

        console.log(usuario)

        if (!usuario){
            res.render('Login')
        }

        res.redirect('/main')
    } catch (e) {
        console.error(e)
        res.render('Login')
    }
};

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



//reportes

// Controlador para obtener los reportes dinámicamente
exports.getReporte = async (req, res) => {
    const { category } = req.query;

    try {
        let data = [];
        if (category === 'promociones_reclamadas') {
            data = await DuperModel.getPromocionesReclamadasPorMes();
        }
        res.json(data); // Devolver los datos en formato JSON
    } catch (error) {
        console.error('Error al obtener los datos del reporte:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

module.exports.registrar_empleado = async (req, res) => {
    try {
        const {nombre, telefono, usuario, contrasena} = req.body

        const newEmpleado = await model.createEmpleado(nombre, telefono, usuario, contrasena)

        res.status(201).redirect("/empleados/empleados")

    } catch (error) {
        throw error;
    }
};