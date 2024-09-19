const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 

const app = express();
const PORT = 3000;

// Importar el controlador
const duperController = require('./controllers/duper.controller');

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Importar las rutas principales desde el archivo de rutas
const rutaUsers = require('./routes/main');

// Usar las rutas correctas
app.use('/users', rutaUsers);
app.use('/empleados', rutaUsers);
app.use('/clientes', rutaUsers);

// Ruta para promociones debe ser manejada por el controlador
app.get('/promociones', duperController.listarPromociones);

// Ruta para registrar una nueva promoción
app.post('/promociones/añadir', duperController.registrarPromocion);

// Ruta para editar una promoción existente
app.post('/promociones/editar', duperController.editarPromocion);

// Página principal
app.get('/', (req, res) => {
    res.render('Login');
});

// Otras rutas que ya funcionan bien
app.get('/main', (req, res) => {
    res.render('main', { pageTitle: 'Página Principal' });
});

// Ruta para tarjetas
app.get('/tarjetas', duperController.listarTarjetas);

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
