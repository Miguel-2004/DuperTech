const express = require('express');
const router = express.Router();
const Controller = require('../controllers/empleadoController');

// Crear un nuevo empleado
router.get('/empleados/nuevo', Controller.editarEmpleado);
router.post('/empleados/nuevo', Controller.nuevoEmpleado);

// Obtener todos los empleados
router.get('/empleados', Controller.getTrabajadores);
router.post('/empleados', Controller.getTrabajadores);

// Editar un empleado existente
router.get('/empleados/editar', Controller.getTrabajadores);  // Para cargar la página de edición
router.post('/empleados/editar', Controller.editarEmpleado);     // Para enviar los datos de edición

module.exports = router;
