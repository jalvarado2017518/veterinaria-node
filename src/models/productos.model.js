const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductosSchema = Schema({
    nombreProducto: String,
    precio: Number,
    stock: Number
});

module.exports = mongoose.model('Productos', ProductosSchema)