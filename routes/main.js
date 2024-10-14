const express = require('express');
const router = express.Router();
const duperController = require('../controllers/duper.controller');

// Middleware de autenticación (solo si es necesario)
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

// Ruta para la página principal (GET y POST)
router.get('/main', duperController.mainPage);  // Ruta GET para la página principal
router.post('/main', duperController.mainPage); // Ruta POST para la página principal (si es necesario)

router.get('/mainE', duperController.mainEPage);  // Ruta GET para la página principal
router.post('/mainE', duperController.mainEPage); // Ruta POST para la página principal (si es necesario)

// Rutas para manejo de usuarios
router.get('/login', duperController.verificarUser);
router.post('/login', duperController.verificarUser);


module.exports = router;