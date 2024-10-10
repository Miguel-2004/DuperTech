const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportes.Controller');

router.get('/', reportesController.getReporteSellos);


module.exports = router;
