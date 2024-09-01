
const express = require('express');
const router = express.Router();
const duperController = require('../controllers/duper.controller');

// Middleware de autenticación
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { 
        return next();
    }
    res.redirect('/login');
};

// Rutas para manejar GET y POST
router.get('/main', isAuthenticated, duperController.getDuper);
router.post('/main', isAuthenticated, duperController.postDuper);

module.exports = router;
