const express = require('express');
const router = express.Router();
const duperController = require('../controllers/duper.controller');
const tarjetasController = require('../controllers/tarjetasController');

router.get('/tarjetasE/nuevo',tarjetasController.listarTarjetasE);
router.post('/tarjetasE/nuevo',tarjetasController.nuevaTarjetaE);

router.get('/tarjetasE',tarjetasController.listarTarjetasE);
router.post('/tarjetasE',tarjetasController.listarTarjetasE);

router.get('/', duperController.mainEPage);  // Ruta GET para la página principal
router.post('/', duperController.mainEPage); // Ruta POST para la página principal (si es necesario)


module.exports = router;