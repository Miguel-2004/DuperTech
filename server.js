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

const rutaUsers = require('./routes/main');

app.use('/users', rutaUsers);
app.use('/empleados', rutaUsers);
app.use('/clientes', rutaUsers);
app.use('/promociones', rutaUsers);

app.get('/', (req, res) => {
    res.render('Login');
});

app.get('/main', (req, res) => {
    res.render('main', { pageTitle: 'Página Principal' });
});

app.get('/clientes', (req, res) => {
    res.render('clientes', { pageTitle: 'clientes' });
});

app.get('/reportes', (req, res) => {
    res.render('reportes', { pageTitle: 'reportes' });
});

app.get('/promociones', (req, res) => {
    res.render('promocion', { pageTitle: 'promociones' });
});

app.get('/tarjetas', duperController.listarTarjetas);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).render('404');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use(express.static('public'));
