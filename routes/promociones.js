const express = require('express');
const router = express.Router();
const promocionesController = require('../controllers/promocionesController');

// Ruta para agregar promociones
router.post('/registrar', promocionesController.registrarPromocion);

// Ruta para editar promociones
router.post('/editar', promocionesController.editarPromocion);

// Ruta para eliminar promociones
router.post('/eliminar', promocionesController.eliminarPromocion);

// Ruta para mostrar promociones
router.get('/', promocionesController.getPromocionesPaginated);

module.exports = router;
