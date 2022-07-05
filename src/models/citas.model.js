const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CitasSchema = Schema({
    descripcion: String,
    fecha: String,
    idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios'}
});

module.exports = mongoose.model('Citas', CitasSchema)