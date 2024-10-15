const express = require('express');
const router = express.Router();
const Controller = require('../controllers/empleadoController');

// Crear un nuevo empleado
router.get('/empleados/nuevo', Controller.getTrabajadores);
router.post('/empleados/nuevo', Controller.nuevoEmpleado);

// Editar un empleado existente
router.get('/empleados/editar', Controller.getTrabajadores);  
router.post('/empleados/editar', Controller.editarEmpleado);     

// Obtener todos los empleados
router.get('/empleados', Controller.getTrabajadores);
router.post('/empleados', Controller.getTrabajadores);


module.exports = router;
