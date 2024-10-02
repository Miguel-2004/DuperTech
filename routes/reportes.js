const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportes.Controller');

// Ruta para obtener el reporte de recompensas por mes

router.get('/', reportesController.getReporteRecompensas);

module.exports = router;
