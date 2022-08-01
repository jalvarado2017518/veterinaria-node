const Citas = require('../models/citas.model');


function agendarCita(req, res) {
    var parametros = req.body;
    var citaModel = new Citas();

    if(parametros.email && parametros.fecha ){
        citaModel.nombre = parametros.nombre;
        citaModel.telefono = parametros.telefono;
        citaModel.email = parametros.email;
        citaModel.mensaje = parametros.mensaje;
        citaModel.fecha = parametros.fecha;
        citaModel.hora = parametros.hora;
        citaModel.mascota = parametros.mascota;
        citaModel.pregunta1 = parametros.pregunta1;
        citaModel.pregunta2 = parametros.pregunta2;

        
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
        Citas.find({email: req.user.email},(err, citasObtenidas) => {
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

function ObtenerCitasId(req, res) {
    var idDate = req.params.idCita;

    Citas.findById(idDate, (err, citaEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!citaEncontrada) return res.status(500).send( { mensaje: 'Error al obtener los datos' });

        return res.status(200).send({ cita: citaEncontrada });
    })
}


module.exports = {
    agendarCita,
    obtenerCitas,
    cancelarCita,
    ObtenerCitasId
}