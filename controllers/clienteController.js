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
        const cliente = await cliente.crearCliente(nombre, telefono, FechaNac, sexo)

        if (!cliente) {
            return res.render('clientes', { mensaje: 'Error al crear el cliente' });
        }
        res.render('clientes', {Clientes: ClientesArray });
    } catch (e) {
        console.error(e);
        res.status(500).render('clientes', { mensaje: 'Error al cargar los datos' });
    }
};

exports.editarCliente = async (req, res, next) => {
    try {
        const Clientes = await cliente.getCliente();  // Obtener clientes

        const ClientesArray = Array.isArray(Clientes) ? Clientes : [Clientes];
        res.render('clientes', { Clientes: ClientesArray });

        const id = req.body.ID_Cliente;
        const nombre = req.body.Nombre_Cliente;  // Corrección aquí
        const telefono = req.body.Telefono_Cliente;
        const FechaNac = req.body.Fecha_Cliente;
        const sexo = req.body.Sexo_Cliente;

        const Cliente = await cliente.editCliente(nombre, telefono, FechaNac, sexo, id);

        if (!Cliente) {
            return res.render('clientes', { mensaje: 'Error al editar el cliente' });
        }
        res.render('clientes', { Clientes: ClientesArray });
    } catch (e) {
        console.error(e);
        res.status(500).render('clientes', { mensaje: 'Error al cargar los datos' });
    }
};
