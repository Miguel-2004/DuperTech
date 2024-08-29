const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 

const app = express();
const PORT = 3000;

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.render('Login');
});

app.get('/main', (req, res) => {
    res.render('main', { pageTitle: 'Página Principal' }); // Renderiza el archivo main.ejs
});


app.use((req, res, next) => {
    res.status(404).render('404');  // Renderiza la vista 404.ejs cuando no se encuentra la ruta
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use(express.static('public'));
