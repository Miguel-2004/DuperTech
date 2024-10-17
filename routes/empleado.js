const express = require('express');
const router = express.Router();
const Controller = require('../controllers/empleadoController');

// Ruta para mostrar el formulario de creación de un nuevo empleado
router.get('/empleados/nuevo', Controller.getTrabajadores);

// Ruta para procesar la creación de un nuevo empleado
router.post('/empleados/nuevo', Controller.nuevoEmpleado);

// Ruta para mostrar el formulario de edición de un empleado específico
router.get('/empleados/editar', Controller.getTrabajadores);

// Ruta para procesar la edición de un empleado
router.post('/empleados/editar', Controller.editarEmpleado);

// Ruta para actualizar el estado de un empleado (activo/inactivo)
router.post('/empleados/actualizarEstado', Controller.actualizarEstado);

// Ruta para obtener el último usuario (autoincrementar el nombre de usuario)
router.get('/empleados/obtenerUltimoUsuario', Controller.obtenerUltimoUsuario);

// Ruta para obtener los administradores de un establecimiento específico
router.get('/empleados/obtenerAdminPorEstablecimiento/:ID_Establecimiento', Controller.obtenerAdminPorEstablecimiento);

// Ruta para obtener todos los empleados, con paginación y funcionalidad de búsqueda
router.get('/empleados', Controller.getTrabajadores);

module.exports = router;
