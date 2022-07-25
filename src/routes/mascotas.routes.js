const express = require('express');
const mascotasController = require('../controllers/mascotas.controller');
const md_autenticacion =  require('../middlewares/autenticacion');

const api = express.Router()



api.put('/editarMascota/:idMascota', mascotasController.editarMascota);
api.post('/agregarMascota',md_autenticacion.Auth, mascotasController.agregarMascota);
api.delete('/eliminarMascota/:idMascota',mascotasController.eliminarMascota);
api.get('/mascotas',md_autenticacion.Auth, mascotasController.obtenerMascotas);
api.get('/mascotas/:idMascota', mascotasController.ObtenerMascotasId);



module.exports = api;