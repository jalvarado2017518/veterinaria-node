const express = require('express');
const citasController = require('../controllers/citas.controller');
const md_autenticacion =  require('../middlewares/autenticacion');

const api = express.Router()

api.post('/agendarCita',md_autenticacion.Auth, citasController.agendarCita);
api.get('/citas',md_autenticacion.Auth, citasController.obtenerCitas);
api.delete('/cancelarCita/:idCita',md_autenticacion.Auth, citasController.cancelarCita);

module.exports = api;