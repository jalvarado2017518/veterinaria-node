const express = require('express');
const usuariosControlador = require('../controllers/usuarios.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/login', usuariosControlador.Login);
api.get('/usuarios',md_autenticacion.Auth, usuariosControlador.ObtenerUsuarios);
api.get('/usuarios/:idUsuario', usuariosControlador.ObtenerUsuarioId);
api.post('/agregarUsuarios', usuariosControlador.agregarUsuario);
api.put('/editarUsuario/:idUsuario',md_autenticacion.Auth, usuariosControlador.editarUsuario);
api.delete('/eliminarUsuario/:idUsuario',usuariosControlador.eliminarUsuario);
api.put('/editarUsuarioAdmin/:idUsuario', usuariosControlador.editarUsuarioAdmin);


module.exports = api;