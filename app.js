const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// App
const app = express();

// Configuración de MongoDB
const MONGO_URI = 'mongodb://localhost:27017/coffee-shop'; // Cambia si usas otro host/puerto
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true })); // Para leer datos de formularios
app.use(express.json()); // Para JSON
app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos

// Sesiones
app.use(session({
  secret: 'secreto-cafe', // Cambiar por uno más seguro
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hora
}));

// Rutas
app.use('/auth', require('./routes/authRoutes'));
app.use('/pedidos', require('./routes/orderRoutes'));
app.use('/reporte', require('./routes/reportRoutes'));

// Ruta raíz (redirección)
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
