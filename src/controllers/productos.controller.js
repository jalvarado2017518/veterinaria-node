const Productos = require('../models/productos.model');

function agregarProducto(req, res) {
    var parametros = req.body;
    var productosModel = new Productos();
    if (parametros.nombreProducto && parametros.stock) {
        productosModel.nombreProducto = parametros.nombreProducto;
        productosModel.precio = parametros.precio;
        productosModel.stock = parametros.stock;

        productosModel.save((err, productoGuardado) => {
            if (err) return res.status(500).send({ mensaje: "error en la peticion" })
            if (!productoGuardado) return res.status(500).send({ mensaje: "ocurrio un error al intentar agregar" })

            return res.status(200).send({ empleado: productoGuardado })
        })

    } else {
        return res.status(500).send({ mensaje: "debe llenar todos los campos necesarios" })
    }  
}

function editarProducto (req, res) {
    var idProd = req.params.idProducto;
    var parametros = req.body;

   
        Productos.findByIdAndUpdate(idProd, parametros, { new: true } ,(err, productoActualizado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion'});
            if(!productoActualizado) return res.status(404).send( { mensaje: 'Error, no a podido editar el producto'});
        
            return res.status(200).send({ producto: productoActualizado});
        });
        
    
}

function eliminarProducto(req, res) {
    var idProd = req.params.idProducto;

    Productos.findByIdAndDelete(idProd, (err, productoEliminado) => {
        if (err) return res.status(500).send({ mensaje: "Error en la petición" });
        if (!productoEliminado) return res.status(500).send({ mensaje: "Error al eliminar este producto, intenta de nuevo" });
        return res.status(200).send({ producto: productoEliminado });
    })
}

function obtenerProductos (req, res) {
    if (req.user.rol == "SuperAdmin") {
        Productos.find((err, productosObtenidos) => {
        if (err) return res.send({ mensaje: "Error: " + err })

        return res.send({ productos: productosObtenidos })

    })
    }else{
        Productos.find({idEmpresa: req.user.sub},(err, productosObtenidos) => {
            if (err) return res.send({ mensaje: "Error: " + err })
    
            return res.send({ productos: productosObtenidos })
    
        })
    }
}

module.exports = {
    obtenerProductos,
    agregarProducto,
    editarProducto,
    eliminarProducto
}