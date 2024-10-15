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

// Actualizar una versión existente
exports.updateVersion = async (req, res) => {
    try {
        const { id, color, promo1, promo2 } = req.body;
        await Version.updateVersion(id, color, promo1, promo2);
        res.json({ success: true, message: 'Versión actualizada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error al actualizar la versión' });
    }
};

// Crear una nueva versión
exports.createVersion = async (req, res) => {
    try {
        const { color, promo1, promo2 } = req.body;
        await Version.createVersion(color, promo1, promo2);  // Crear nueva versión
        res.redirect(process.env.PATH_SERVER + 'version'); // Redirigir después de crear
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al crear la versión');
    }
};
