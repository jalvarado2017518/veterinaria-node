const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MascotaSchema = Schema({
    nombreMascota: String,
    tipo: String,
    descripcion: String,
    //idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios'}
});

module.exports = mongoose.model('Mascota', MascotaSchema)