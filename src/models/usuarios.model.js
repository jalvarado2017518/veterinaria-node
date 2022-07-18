const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuariosSchema = Schema({
    nombre: String,
    email: String,
    telefono: Number,
    password: String,
    rol: String
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);