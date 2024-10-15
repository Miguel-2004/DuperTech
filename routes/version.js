const express = require('express');
const router = express.Router();
const versionC = require('../controllers/versionController');

// Ruta para actualizar una versión existente
router.post('/update', versionC.updateVersion);

// Ruta para crear una nueva versión
router.post('/create', versionC.createVersion);


router.get('/', versionC.getVersiones);
router.post('/',versionC.getVersiones);

module.exports = router;
