const Usuarios = require('../models/usuarios.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')


function Login(req, res) {
    var parametros = req.body;
    Usuarios.findOne({ email: parametros.email }, (err, usuariosEncontrado) => {
        if (err) return res.status(500).send({ mensaje: "Error en la petición" });
        if (usuariosEncontrado) {
             // COMPARO CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
            bcrypt.compare(parametros.password, usuariosEncontrado.password,
                (err, verificacionPassword) => {
                        // VERIFICO SI EL PASSWORD COINCIDE EN BASE DE DATOS
                    if (verificacionPassword) {
                             // SI EL PARAMETRO OBTENERTOKEN ES TRUE, CREA EL TOKEN
                        if (parametros.obtenerToken === 'true') {
                            return res.status(200)
                                .send({ token: jwt.crearToken(usuariosEncontrado) })
                        } else {
                            usuariosEncontrado.password = undefined;
                            return res.status(200)
                                .send({ usuario: usuariosEncontrado })
                        }
                    } else {
                        return res.status(500)
                            .send({ mensaje: "La contraseña no coincide, intente de nuevo" });
                    }
                })

        } else {
            return res.status(500)
                .send({ mensaje: "El correo no existe, intente de nuevo" })
        }
    })
}

function agregarUsuario(req, res) {
    var parametros = req.body;
    var usuarioModelo = new Usuarios();

    if (parametros.nombre && parametros.email && parametros.telefono && parametros.password) {
        usuarioModelo.nombre = parametros.nombre;
        usuarioModelo.email = parametros.email;
        usuarioModelo.telefono = parametros.telefono;
        usuarioModelo.password = parametros.password;
        usuarioModelo.rol = 'Cliente';

        Usuarios.find({ email: parametros.email }, (err, clienteRegistrado) => {
            if (clienteRegistrado.length == 0) {
                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                    usuarioModelo.password = passwordEncriptada;
                    usuarioModelo.save((err, clienteGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error en la petición' });
                        if (!clienteGuardado) return res.status(404).send({ mensaje: 'No se agrego al usuario, intente de nuevo' });
                        return res.status(201).send({ usuarios: clienteGuardado });
                    })

                })
            } else {
                return res.status(500).send({ mensaje: 'Este correo ya existe, intente de nuevo' });
            }

        })
    }

}
function editarUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
    var parametros = req.body;
    Usuarios.findByIdAndUpdate(idUsuario, parametros, { new: true }, (err, usuarioActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioActualizado) return res.status(404).send({ mensaje: 'Error al editar el usuario' });
        return res.status(200).send({ usuario: usuarioActualizado })
    })

}

function eliminarUsuario(req, res) {
    var id = req.params.idUsuario;
    Usuarios.findByIdAndDelete(id, (err, usuarioEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioEliminado) return res.status(404).send({ mensaje: 'Error al eliminar el usuario' });
        return res.status(200).send({ usuario: usuarioEliminado })
    })

}

function buscarUsuario(req, res) {
    Usuarios.find((err, usuarioEncontrado) => {
        if (err) return res.send({ mensaje: "Error: " + err })
        for (let i = 0; i < usuarioEncontrado.length; i++) {

        }
        return res.status(200).send({ usuario: usuarioEncontrado })
    })
}


module.exports = {
    Login,
    agregarUsuario,
    editarUsuario,
    eliminarUsuario,
    buscarUsuario
}
