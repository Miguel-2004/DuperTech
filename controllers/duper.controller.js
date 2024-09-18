// duper.controller.js

const DuperModel = require('../models/duper.models');


exports.getAllTrabajadores = async (req, res, next) => {
    try{
        const Trabajadores = await DuperModel.usuarios.trabajadorPrueba();
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
        const Clientes = await DuperModel.usuarios.clientePrueba();
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

        const usuario = await DuperModel.veryUser(userCorreo, userContrasena) // Cambiar veryUser a verifyUser cuando haya coneccion con la base de datos.

        if (!usuario){
            res.render('/Login')
        }

        res.redirect('/main')
    } catch (e) {
        console.error(e)
        res.render('/Login')
    }
}
