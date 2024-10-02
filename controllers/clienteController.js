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
        // Extraer los datos del cuerpo de la solicitud
        const nombre = req.body.nombre;
        const telefono = req.body.telefono;
        const FechaNac = req.body.FechaNac;
        const sexo = req.body.sexo;

        // Crear un nuevo cliente
        const nuevoCliente = await cliente.crearCliente(nombre, telefono, FechaNac, sexo);

        if (!nuevoCliente) {
            return res.render('clientes', { mensaje: 'Error al crear el cliente' });
        }

        // Obtener la lista actualizada de clientes después de crear el nuevo cliente
        const Clientes = await cliente.getCliente();
        const ClientesArray = Array.isArray(Clientes) ? Clientes : [Clientes];

        // Renderizar la vista con la lista actualizada de clientes
        res.render('clientes', { Clientes: ClientesArray });

    } catch (e) {
        console.error(e);
        res.status(500).render('clientes', { mensaje: 'Error al cargar los datos' });
    }
};


exports.editarCliente = async (req, res, next) => {
    try {
        // Obtener los clientes
        const Clientes = await cliente.getCliente();

        const ClientesArray = Array.isArray(Clientes) ? Clientes : [Clientes];
        res.render('clientes', { Clientes: ClientesArray });

        // Extraer y validar los campos del cuerpo de la solicitud
        const id = req.body.ID_Cliente;
        const nombre = req.body.Nombre_Cliente || null;  // Si no está definido, asignar null
        const telefono = req.body.Telefono_Cliente || null;
        const FechaNac = req.body.Fecha_Cliente || null;
        const sexo = req.body.sexo || null;

        // Llamar al modelo para editar el cliente
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

