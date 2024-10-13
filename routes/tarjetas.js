const express = require('express');
const router = express.Router();
const tarjetasController = require('../controllers/tarjetasController');

router.get('/nuevo',tarjetasController.listarTarjetas);
router.post('/nuevo',tarjetasController.nuevaTarjeta);
// Ruta para listar todas las tarjetas con paginación y filtros
router.get('/', tarjetasController.listarTarjetas);
router.post('/',tarjetasController.listarTarjetas);

module.exports = router;
