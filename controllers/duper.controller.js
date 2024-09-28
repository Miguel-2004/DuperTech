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

// Controlador para obtener todas las promociones

//promocion

exports.getAllPromociones = async (req, res, next) => {
    try {
        const Promociones = await DuperModel.getAllPromociones(); // Cambia el nombre a la función correcta
        console.log(Promociones); // Debug para verificar los datos recibidos

        const PromocionesArray = Array.isArray(Promociones) ? Promociones : [Promociones];

        res.render('promocion', { promociones: PromocionesArray });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar la página de promociones');
    }
};

// Controlador para registrar una nueva promoción
exports.registrarPromocion = async (req, res, next) => {
    try {
        const { nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo } = req.body;
        await DuperModel.registrarPromocion(nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo);
        res.redirect('/promociones');  // Redirigir a la página de promociones después de registrar
    } catch (error) {
        console.error('Error al registrar la promoción:', error);
        res.status(500).send('Error al registrar la promoción');
    }
};


// Controlador para editar una promoción existente
exports.editarPromocion = async (req, res, next) => {
    try {
        const { idRecompensa, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo } = req.body;
        await DuperModel.editarPromocion(idRecompensa, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo); // Editar promoción
        res.redirect('/promociones'); // Redirigir a la página de promociones
    } catch (err) {
        console.error('Error al editar la promoción:', err);
        res.status(500).send('Error al editar la promoción');
    }
};

// Controlador para eliminar una promoción
exports.eliminarPromocion = async (req, res, next) => {
    try {
        const { ID_Recompensa } = req.body; // Obtener el ID de la recompensa a eliminar
        await DuperModel.eliminarPromocion(ID_Recompensa); // Eliminar la promoción
        res.redirect('/promociones'); // Redirigir a la página de promociones
    } catch (err) {
        console.error('Error al eliminar la promoción:', err);
        res.status(500).send('Error al eliminar la promoción');
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