// duper.controller.js

const DuperModel = require('../models/duper.models');


exports.getAllTrabajadores = async (req, res, next) => {
    try{
        const Trabajadores = await DuperModel.usuarios.getTrabajador();
        console.log(Trabajadores)

        const TrabajadoresArray = Array.isArray(Trabajadores) ? Trabajadores : [Trabajadores];
        res.render('empleados', { Trabajadores: TrabajadoresArray });

        //res.render('empleados', {Trabajadores});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar la página principal');
    }
};

exports.getAllClientes = async (req, res, next) => {
    try{
        const Clientes = await DuperModel.usuarios.getCliente();
        console.log(Clientes)

        const ClientesArray = Array.isArray(Clientes) ? Clientes : [Clientes];
        res.render('clientes', { Clientes: ClientesArray });

        //res.render('empleados', {Trabajadores});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar la página principal');
    }
};


//promocion
// Obtener todas las promociones
exports.getAllPromociones = async (req, res, next) => {
    try {
        const Promociones = await DuperModel.usuarios.PromocionesPrueba();
        console.log(Promociones); // Debug para verificar los datos recibidos

        const PromocionesArray = Array.isArray(Promociones) ? Promociones : [Promociones]; // Asegurar que siempre sea un array

        res.render('promocion', { Promociones: PromocionesArray }); // Enviar "PromocionesArray" como "Promociones"
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar la página de promociones');
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

exports.listarPromociones = async (req, res) => {
    try {
        const promociones = await DuperModel.obtenerPromociones();
        if (!promociones || promociones.length === 0) {
            console.log('No se encontraron promociones');
            return res.render('promocion', { promociones: [] });  // Envía un array vacío
        }

        console.log('Promociones obtenidas en el controlador:', promociones);
        res.render('promocion', { promociones });
    } catch (error) {
        console.error('Error al listar las promociones:', error);
        res.status(500).send('Error al listar las promociones.');
    }
};

exports.registrarPromocion = async (req, res) => {
    const { nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo } = req.body;

    // Validar campos
    if (!nombreRecompensa || !fechaInicio || !fechaFinal || !descripcionRegalo) {
        console.log('Campos incompletos para registrar la promoción');
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    try {
        await DuperModel.insertarPromocion(nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo);
        res.redirect('/promociones');
    } catch (error) {
        console.error('Error al registrar la promoción:', error);
        res.status(500).send('Error al registrar la promoción.');
    }
};

exports.editarPromocion = async (req, res) => {
    const { idRecompensa, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo } = req.body;

    // Validar campos
    if (!idRecompensa || !nombreRecompensa || !fechaInicio || !fechaFinal || !descripcionRegalo) {
        console.log('Campos incompletos para editar la promoción');
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    try {
        await DuperModel.actualizarPromocion(idRecompensa, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo);
        res.redirect('/promociones');
    } catch (error) {
        console.error('Error al editar la promoción:', error);
        res.status(500).send('Error al editar la promoción.');
    }
};
