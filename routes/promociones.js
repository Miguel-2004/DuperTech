const express = require('express');
const router = express.Router();
const promocionesController = require('../controllers/promocionesController');

// Ruta para registrar una nueva promoción
router.post('/registrar', promocionesController.registrarPromocion);

// Ruta para editar una promoción existente
router.post('/editar', promocionesController.editarPromocion);

// Ruta para eliminar una promoción
router.post('/eliminar', promocionesController.eliminarPromocion);

// Ruta para listar todas las promociones
router.get('/', promocionesController.getAllPromociones);

module.exports = router;
