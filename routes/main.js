const express = require('express');
const router = express.Router();
const duperController = require('../controllers/duper.controller');

// Middleware de autenticación (Solo si es necesario)
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

// Rutas para manejar GET y POST
router.get('/main', isAuthenticated, duperController.getDuper); // Aplica autenticación solo si es necesario
router.post('/main', isAuthenticated, duperController.postDuper);

router.get('/login', duperController.verificarUser);
router.post('/login', duperController.verificarUser);

// Rutas para empleados, clientes, tarjetas y promociones
router.get('/empleados', duperController.getAllTrabajadores);
router.get('/clientes', duperController.getAllClientes);
router.get('/tarjetas', duperController.listarTarjetas);
router.get('/promociones', duperController.listarPromociones);  // Ruta de promociones
router.post('/promociones/añadir', duperController.registrarPromocion);
router.post('/promociones/eliminar', duperController.eliminarPromocion);


// Exportar las rutas para que sean usadas en server.js
module.exports = router;
