const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MascotaSchema = Schema({
    nombreMascota: String,
    tipo: String,
    disponible: Boolean,
    idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios'}
});

module.exports = mongoose.model('Mascota', MascotaSchema)