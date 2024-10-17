const express = require('express');
const router = express.Router();
const versionC = require('../controllers/versionController');

// Ruta para actualizar una versión existente
router.post('/update', versionC.updateVersion);

// Ruta para crear una nueva versión
router.get('/create', versionC.getVersionesPag)
router.post('/create', versionC.createVersion);


router.get('/', versionC.getVersionesPag);
router.post('/',versionC.getVersionesPag);

module.exports = router;
