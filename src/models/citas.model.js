const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CitasSchema = Schema({
    nombre: { type: Schema.Types.Object, ref: 'Usuarios'},
    telefono:  { type: Schema.Types.Object, ref: 'Usuarios'},
    email:  { type: Schema.Types.Object, ref: 'Usuarios'},
    mascota:  { type: Schema.Types.Object, ref: 'Usuarios'},
    mensaje: String,
    fecha: String,
    hora: String,
    pregunta1: String,
    pregunta2: String
});

module.exports = mongoose.model('Citas', CitasSchema)