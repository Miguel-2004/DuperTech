const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportes.Controller');

// Definir la ruta de reportes usando la función del controlador
router.get('/', reportesController.getReporteSellos);

module.exports = router;
