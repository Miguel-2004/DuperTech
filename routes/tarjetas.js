const express = require('express');
const router = express.Router();
const tarjetasController = require('../controllers/tarjetasController');

// Ruta para listar todas las tarjetas
router.get('/ver', tarjetasController.listarTarjetas);

module.exports = router;
