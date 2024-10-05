const express = require('express');
const router = express.Router();
const Controller = require('../controllers/clienteController');

router.get('/clientes/nuevo', Controller.getAllClientes);
router.post('/clientes/nuevo', Controller.nuevoCliente);

router.get('/clientes/editar', Controller.getAllClientes);
router.post('/clientes/editar', Controller.editarCliente);

router.get('/clientes', Controller.getAllClientes);
router.post('/clientes', Controller.getAllClientes);


module.exports = router;