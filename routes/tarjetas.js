const express = require('express');
const router = express.Router();
const tarjetasController = require('../controllers/tarjetasController');

// Ruta para listar todas las tarjetas con paginación y filtros
router.get('/', tarjetasController.listarTarjetas);

module.exports = router;
