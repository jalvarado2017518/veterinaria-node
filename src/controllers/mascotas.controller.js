const Mascotas = require('../models/mascotas.model');

function agregarMascota(req, res) {
    let parametros = req.body
    if (parametros.nombreMascota && parametros.tipo) {
        Mascotas.find({ nombre: parametros.nombreMascota }, (err, mascotasEncontradas) => {
            if (err) return res.status(404).send({ mensaje: 'Error en la peticion'});
                let mascotasModel = new Mascotas();
                mascotasModel.nombreMascota = parametros.nombreMascota;
                mascotasModel.descripcion = parametros.descripcion;
                mascotasModel.tipo = parametros.tipo;
                mascotasModel.save((err, mascotaGuardada) => {
                    if (err) return res.status(404).send({ mensaje: 'Error en la peticion' });
                    return res.status(200).send({ mascotas: mascotaGuardada })
                })
        })
    } else {
        return res.status(500).send({ mensaje: 'Por favor, llene todos los campos' })
    }

}

function editarMascota (req, res) {
    var idMascota = req.params.idMascota;
    var parametros = req.body;

        Mascotas.findByIdAndUpdate(idMascota, parametros, { new: true } ,(err, mascotaActualizada) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion'});
            if(!mascotaActualizada) return res.status(404).send( { mensaje: 'Error, no a podido editar la mascota'});
        
            return res.status(200).send({ mascota: mascotaActualizada});
        });
        
    
}

function eliminarMascota(req, res) {
    var idMas = req.params.idMascota;

    Mascotas.findByIdAndDelete(idMas, (err, mascotaEliminada) => {
        if (err) return res.status(500).send({ mensaje: "Error en la petición" });
        if (!mascotaEliminada) return res.status(500).send({ mensaje: "Error al eliminar la mascota, intenta de nuevo" });
        return res.status(200).send({ mascota: mascotaEliminada });
    })
}

function obtenerMascotas (req, res) {
        Mascotas.find((err, mascotasObtenidas) => {
        if (err) return res.send({ mensaje: "Error: " + err })

        return res.send({ mascotas: mascotasObtenidas })

    })
    
}

function ObtenerMascotasId(req, res) {
    var idMasc = req.params.idMascota;

    Mascotas.findById(idMasc, (err, mascotaEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!mascotaEncontrado) return res.status(500).send( { mensaje: 'Error al obtener los datos' });

        return res.status(200).send({ mascota: mascotaEncontrado });
    })
}

module.exports = {
    obtenerMascotas,
    agregarMascota,
    editarMascota,
    eliminarMascota,
    ObtenerMascotasId
}