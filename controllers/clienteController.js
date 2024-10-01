const empleado = require('../models/empeladoModel');
const Establecimiento = require('../models/establecimiento.model');
const cliente = require('../models/cliente.model');

exports.getAllClientes = async (req, res, next) => {
    try{
        const Clientes = await cliente.getCliente();
        //console.log(Clientes)

        const ClientesArray = Array.isArray(Clientes) ? Clientes : [Clientes];
        res.render('clientes', { Clientes: ClientesArray });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar la página principal');
    }
};

exports.nuevoCliente = async (req, res, next) => {
    try {

        const Clientes = await cliente.getCliente();
        //console.log(Clientes)

        const ClientesArray = Array.isArray(Clientes) ? Clientes : [Clientes];
        res.render('clientes', { Clientes: ClientesArray });

        const nombre = req.body.nombre;
        const telefono = req.body.telefono;
        const FechaNac = req.body.FechaNac;
        const sexo = req.body.sexo;
        const empleado = await Model.createEmpleado(nombre, telefono, FechaNac, sexo)

        if (!empleado) {
            return res.render('clientes', { mensaje: 'Error al crear el cliente' });
        }
        res.render('clientes', {Clientes: ClientesArray });
    } catch (e) {
        console.error(e);
        res.status(500).render('clientes', { mensaje: 'Error al cargar los datos' });
    }
};