const Adopciones = require('../models/adopciones.model');


function agregarAdopcion(req, res) {
    var parametros = req.body;
    var adopcionesModel = new Adopciones();
    if (parametros.pregunta1 && parametros.pregunta2 && parametros.pregunta3 && parametros.pregunta4 && parametros.pregunta5) {
        adopcionesModel.idMascota = parametros.idMascota;
        
        adopcionesModel.pregunta1 = parametros.pregunta1;
        adopcionesModel.pregunta2 = parametros.pregunta2;
        adopcionesModel.pregunta3 = parametros.pregunta3;
        adopcionesModel.pregunta4 = parametros.pregunta4;
        adopcionesModel.pregunta5 = parametros.pregunta5;
        adopcionesModel.idUsuario = req.user.sub;
        
        adopcionesModel.save((err, adopcionGuardada) => {
            if (err) return res.status(500).send({ mensaje: "error en la peticion" })
            if (!adopcionGuardada) return res.status(500).send({ mensaje: "ocurrio un error al intentar agregar" })

            return res.status(200).send({ adopcion: adopcionGuardada })
        })

    } else {
        return res.status(500).send({ mensaje: "debe llenar todos los campos necesarios" })
    }  
}


function editarAdopcion (req, res) {
    var idAdopcion = req.params.idAdopcion;
    var parametros = req.body;

    Adopciones.findByIdAndUpdate(idAdopcion, parametros, { new: true } ,(err, adopcionActualizada) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion'});
            if(!adopcionActualizada) return res.status(404).send( { mensaje: 'Error, no a podido editar la mascota'});
        
            return res.status(200).send({ adopcion: adopcionActualizada});
        });
        
    
}

function eliminarAdopcion(req, res) {
    var idAdopcion = req.params.idAdopcion;

    Adopciones.findByIdAndDelete(idAdopcion, (err, adopcionEliminada) => {
        if (err) return res.status(500).send({ mensaje: "Error en la petición" });
        if (!adopcionEliminada) return res.status(500).send({ mensaje: "Error al eliminar la mascota, intenta de nuevo" });
        return res.status(200).send({ adopcion: adopcionEliminada });
    })
}

function obtenerAdopciones(req, res) {
    if (req.user.rol == "SuperAdmin") {
        Adopciones.find((err,adopcionesObtenidas)=>{
            if(err) return res.send({mensaje: "Error: " + err})
    
            return res.send({adopciones: adopcionesObtenidas})
        })
    }else{
        Adopciones.find({idUsuario: req.user.sub},(err, adopcionesObtenidas) => {
            if (err) return res.send({ mensaje: "Error: " + err })
    
            return res.send({ adopciones: adopcionesObtenidas })
    
        })
    }
    
}

function ObtenerAdopcionesId(req, res) {
    var idMasc = req.params.idMascota;

    Adopciones.findById(idMasc, (err, mascotaEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!mascotaEncontrado) return res.status(500).send( { mensaje: 'Error al obtener los datos' });

        return res.status(200).send({ mascota: mascotaEncontrado });
    })
}

module.exports = {
    obtenerAdopciones,
    agregarAdopcion,
    editarAdopcion,
    eliminarAdopcion,
    ObtenerAdopcionesId
}