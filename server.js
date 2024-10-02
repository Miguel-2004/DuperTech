const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 

const app = express();
const PORT = 3000;

// Importar el controlador
const duperController = require('./controllers/duper.controller');

// Middleware para procesar formularios
app.use(bodyParser.urlencoded({ extended: false }));

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Importar las rutas principales desde el archivo de rutas
const rutaUsers = require('./routes/main');
const rutaEmpleados = require('./routes/empleado');
const rutaClientes = require('./routes/cliente');
const rutaTarjetas = require('./routes/tarjetas');
const rutaPromociones = require ('./routes/promociones');
const rutaEstablecimientos = require ('./routes/establecimientos');

// Usar las rutas correctas
app.use('/users', rutaUsers);
app.use('/empleado', rutaEmpleados);
app.use('/cliente', rutaClientes);
app.use('/tarjetas', rutaTarjetas);
app.use('/promociones', rutaPromociones);
app.use('/establecimientos', rutaEstablecimientos);


// Página principal
app.get('/', (req, res) => {
    res.redirect('/users/Login');
});

// Otras rutas que ya funcionan bien
app.get('/main', (req, res) => {
    res.render('main', { pageTitle: 'Página Principal' });
});

// Ruta para tarjetas


// Ruta para clientes
app.get('/clientes', (req, res) => {
    res.render('clientes', { pageTitle: 'clientes' });
});

// Ruta para reportes
app.get('/reportes', (req, res) => {
    res.render('reportes', { pageTitle: 'reportes' });
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).render('404');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Servir archivos estáticos
app.use(express.static('public'));
