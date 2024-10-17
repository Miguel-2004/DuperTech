// controllers/versionController.js

const Version = require('../models/version.model');
const Promocion = require('../models/promociones.model');

// Obtener todas las versiones
exports.getVersiones = async (req, res) => {
    try {
        const versiones = await Version.getVersion();
        const promociones = await Promocion.getPromociones();
        res.render('version', { versiones, promociones });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener las versiones');
    }
};

exports.getVersionesPag = async (req, res) => {
    try {
        // Obtener el número de página de la solicitud (predeterminada en 1 si no se pasa)
        const currentPage = parseInt(req.query.page) || 1;
        const limit = 10; // Número de elementos por página
        const offset = (currentPage - 1) * limit;

        const promociones = await Promocion.getPromociones();

        // Obtener los trabajadores y el total
        const versiones = await Version.getVersionP(limit, offset);
        const totalVersiones = await Version.countVersion();
        const totalPages = Math.ceil(totalVersiones / limit);

        res.render('version', {
            versiones: versiones,
            currentPage: currentPage,
            totalPages: totalPages,
            promociones:promociones
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los establecimientos');
    }
};

// Actualizar una versión existente
exports.updateVersion = async (req, res) => {
    try {
        const id = req.body.version;
        const color = req.body.color;
        const promo1 = req.body.promo1;
        const promo2 = req.body.promo2;

        console.log(id , color, promo1, promo2);

        const version = await Version.updateVersion(id, color, promo1, promo2);

        if (!version) {
            return res.redirect(process.env.PATH_SERVER +'version', { mensaje: 'Error al crear la version' });
        }
        res.redirect(process.env.PATH_SERVER +'version');
    } catch (err) {
        console.error('Error al actualizar los datos',err);
        res.status(500).send( 'Error al actualizar la versión' );
    }
};

// Crear una nueva versión
exports.createVersion = async (req, res) => {
    try {

        console.log("Datos recibidos en el cuerpo:", req.body);
        
        const color = req.body.color || null;
        const promo1 = req.body.promo1 || null;
        const promo2 = req.body.promo2 || null;
        const imagen = req.body.image || null;

        console.log(color, promo1, promo2, imagen);

        const version = await Version.createVer(color, promo1, promo2, imagen);  // Crear nueva versión
        console.log(version);

        if (!version) {
            return res.redirect(process.env.PATH_SERVER +'version', { mensaje: 'Error al crear la version' });
        }
        res.redirect(process.env.PATH_SERVER + 'version'); // Redirigir después de crear
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al crear la versión');
    }
};
