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
<<<<<<< HEAD
const rutaPromociones = require ('./routes/promociones');
const rutaEstablecimientos = require ('./routes/establecimientos');

=======
const rutaPromociones = require('./routes/promociones');
const rutaReportes = require('./routes/reportes');
>>>>>>> 02afa5fc02c0af850a0004b6f810278226dea38d
// Usar las rutas correctas
app.use('/users', rutaUsers);
app.use('/empleado', rutaEmpleados);
app.use('/cliente', rutaClientes);
app.use('/tarjetas', rutaTarjetas);
app.use('/promociones', rutaPromociones);
<<<<<<< HEAD
app.use('/establecimientos', rutaEstablecimientos);

=======
app.use('/reportes',rutaReportes);
>>>>>>> 02afa5fc02c0af850a0004b6f810278226dea38d

// Página principal
app.get('/', (req, res) => {
    res.redirect('/users/Login');
});

app.get('/main', (req, res) => {
    res.render('main', { pageTitle: 'Página Principal' });
});

app.get('/clientes', (req, res) => {
    res.render('clientes', { pageTitle: 'Clientes' });
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
