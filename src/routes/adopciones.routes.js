const express = require('express');
const adopcionesController = require('../controllers/adopciones.controller');
const md_autenticacion =  require('../middlewares/autenticacion');

const api = express.Router()



api.put('/editarAdopcion/:idAdopcion', adopcionesController.editarAdopcion);
api.post('/agregarAdopcion',md_autenticacion.Auth, adopcionesController.agregarAdopcion);
api.delete('/eliminarAdopcion/:idAdopcion',adopcionesController.eliminarAdopcion);
api.get('/adopciones',md_autenticacion.Auth, adopcionesController.obtenerAdopciones);
api.get('/adopciones/:idAdopcion', adopcionesController.ObtenerAdopcionesId);



module.exports = api;