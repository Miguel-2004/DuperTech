
const express = require('express');
const router = express.Router();
const duperController = require('../controllers/duper.controller');

// Middleware de autenticación (puedes adaptarlo según tu lógica de autenticación)
const isAuthenticated = (req, res, next) => {
    // Lógica de autenticación, asegúrate de implementar `req.isAuthenticated()` si no lo tienes
    if (req.isAuthenticated()) { 
        return next();
    }
    res.redirect('/login');
};

// Rutas para manejar GET y POST
router.get('/main', isAuthenticated, duperController.getDuper);
router.post('/main', isAuthenticated, duperController.postDuper);

module.exports = router;
