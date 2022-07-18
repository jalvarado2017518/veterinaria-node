const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CitasSchema = Schema({
    nombre: { type: Schema.Types.Object, ref: 'Usuarios'},
    telefono:  { type: Schema.Types.Object, ref: 'Usuarios'},
    email:  { type: Schema.Types.Object, ref: 'Usuarios'},
    mensaje: String,
    fecha: String,
    horaInicio: String,
    horaFin: String,
    idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios'}
});

module.exports = mongoose.model('Citas', CitasSchema)