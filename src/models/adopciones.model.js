const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdopcionesSchema = Schema({
    idMascota: { type: Schema.Types.ObjectId, ref: 'Mascota'},
    pregunta1: String,
    pregunta2: String,
    pregunta3: String,
    pregunta4: String,
    pregunta5: String,
    idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios'}
});

module.exports = mongoose.model('Adopciones', AdopcionesSchema)