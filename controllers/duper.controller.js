const DuperModel = require('../models/duper.models');

exports.mainPage = (req, res) => {
    res.render('main', { pageTitle: 'Página Principal' });
};

exports.getAllClientes = async (req, res, next) => {
    try {
        const Clientes = await DuperModel.usuarios.getCliente();
        const ClientesArray = Array.isArray(Clientes) ? Clientes : [Clientes];
        res.render('clientes', { Clientes: ClientesArray });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar la página de clientes');
    }
};

exports.verificarUser = async (req, res, next) => {
    try {
        const userCorreo = req.body.email;
        const userContrasena = req.body.password;
        const usuario = await DuperModel.usuarios.verifyUser(userCorreo, userContrasena);

        if (!usuario) {
            res.render('Login');
        } else {
            res.render('main');
        }
    } catch (e) {
        console.error(e);
        res.render('Login');
    }
};

exports.getReporte = async (req, res) => {
    const { category } = req.query;

    try {
        let data = [];
        if (category === 'promociones_reclamadas') {
            data = await DuperModel.getPromocionesReclamadasPorMes();
        }
        res.json(data);
    } catch (error) {
        console.error('Error al obtener los datos del reporte:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};
