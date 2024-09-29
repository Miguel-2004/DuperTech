const express = require('express');
const router = express.Router();
const Controller = require('../controllers/empleadoController');

router.get('/empleados/nuevo', Controller.nuevoEmpleado);
router.post('/empleados/nuevo', Controller.nuevoEmpleado);
router.get('/empleados', Controller.getAllTrabajadores);
router.post('/empelados', Controller.getAllTrabajadores);


module.exports = router;