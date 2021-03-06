const Citas = require('../models/citas.model');


function agendarCita(req, res) {
    var parametros = req.body;
    var citaModel = new Citas();

    if(parametros.email && parametros.fecha  && parametros.horaInicio && parametros.horaFin){
        citaModel.nombre = parametros.nombre;
        citaModel.telefono = parametros.telefono;
        citaModel.email = parametros.email;
        citaModel.mensaje = parametros.mensaje;
        citaModel.fecha = parametros.fecha;
        citaModel.horaInicio = parametros.horaInicio;
        citaModel.horaFin = parametros.horaFin;
        citaModel.idUsuario = req.user.sub;
        
        citaModel.save((err, citaGuaradada) => {
            if (err) return res.status(500).send({message: 'Error en la peticion'});
            if (!citaGuaradada) return res.status(404).send({message: 'No se pudo guardar la cita'});

            return res.status(200).send({ Cita: citaGuaradada });
        });
    }else{
        return res.status(500).send({message: 'Algunos de los campos estan vacios'});
    }
}

function obtenerCitas (req, res) {
    if (req.user.rol == "SuperAdmin") {
        Citas.find((err, citasObtenidas) => {
        if (err) return res.send({ mensaje: "Error: " + err })

        return res.send({ citas: citasObtenidas })

    })
    }else{
        Citas.find({idUsuario: req.user.sub},(err, citasObtenidas) => {
            if (err) return res.send({ mensaje: "Error: " + err })
    
            return res.send({ citas: citasObtenidas })
    
        })
    }
}

function cancelarCita(req, res) {
    var idCit = req.params.idCita;

    Citas.findByIdAndDelete(idCit, (err, citaCancelada) => {
        if (err) return res.status(500).send({ mensaje: "Error en la petición" });
        if (!citaCancelada) return res.status(500).send({ mensaje: "Error al cancelar la cita, intenta de nuevo" });
        return res.status(200).send({ cita: citaCancelada });
    })
}

module.exports = {
    agendarCita,
    obtenerCitas,
    cancelarCita
}