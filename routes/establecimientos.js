const express = require('express');
const router = express.Router();
const establecimientosController = require('../controllers/establecimientosController');

// Ruta para obtener todos los establecimientos
router.get('/', establecimientosController.getEstablecimientos);

// Ruta para agregar un nuevo establecimiento
router.post('/agregar', establecimientosController.agregarEstablecimiento);

// Ruta para editar un establecimiento existente
router.post('/editar', establecimientosController.editarEstablecimiento);

// Ruta para eliminar un establecimiento
router.post('/eliminar', establecimientosController.eliminarEstablecimiento);

module.exports = router;
