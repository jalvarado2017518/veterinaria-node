// IMPORTACIONES
const express = require('express');
const cors = require('cors');
var app = express();

// IMPORTACIONES RUTAS
const CitasRutas = require('./src/routes/citas.routes');
const MascotasRutas = require('./src/routes/mascotas.routes');
const ProductosRutas = require('./src/routes/productos.routes');
const UsuariosRutas = require('./src/routes/usuarios.routes');
const AdopcionesRutas = require('./src/routes/adopciones.routes');

// MIDDLEWARES -> INTERMEDIARIOS
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/obtenerProductos

app.use('/api', UsuariosRutas, ProductosRutas, MascotasRutas, CitasRutas,AdopcionesRutas);


module.exports = app;