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

// Rutas para manejo de usuarios
router.get('/login', duperController.verificarUser);
router.post('/login', duperController.verificarUser);

// Rutas para empleados
router.post('/empleados', duperController.registrar_empleado);
router.get('/empleados', duperController.getAllTrabajadores);

// Rutas para clientes
router.get('/clientes', duperController.getAllClientes);

// Rutas para promociones
router.get('/promociones', duperController.getAllPromociones); // Listar todas las promociones
router.post('/promociones/añadir', duperController.registrarPromocion); // Añadir una nueva promoción
router.post('/promociones/editar', duperController.editarPromocion); // Editar una promoción
router.post('/promociones/eliminar', duperController.eliminarPromocion); // Eliminar una promoción

// Rutas para tarjetas
router.get('/tarjetas', duperController.listarTarjetas);

// Rutas para reportes
router.get('/reportes', duperController.getReporte); 

module.exports = router;
