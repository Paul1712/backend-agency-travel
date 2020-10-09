'use strict'

var validator = require('validator');
var Travel = require('../Models/travel');

var controller = {                                                                          // Utilizamos un objeto literal(JSON) para guardar dentro las funciones que deseamos realizar en nuestro Backend

    // Metodo de prueba
    test: (req, res) => {
        return res.status(200).send({
            test: 'Probando el metodo de prueba GET en Travel',
            status: 'success'
        })
    },

    // Metodo para guardar viaje
    save: (req, res) => {

        var params = req.body;                                                              // Recibimos los valores enviados desde el API

        try {
            var validate_code = !validator.isEmpty(params.code);                              // Utilizamos el modulo validator para validar los datos que recibimos
            var validate_capacity = !validator.isEmpty(params.capacity);
            var validate_origin = !validator.isEmpty(params.origin);
            var validate_destination = !validator.isEmpty(params.destination);
            var validate_price = !validator.isEmpty(params.price);

        } catch {
            return res.status(200).send({
                status: 'ERROR',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_code && validate_capacity && validate_origin && validate_destination && validate_price) {          // En caso de estar validados los datos, procedemos con la validacion del usuario antes de almacenarlo en la BD

            Travel.exists({ code: params.code }, (err, travel) => {                          // Utilizamos la funcion exist para validar que el codigo del viaje no este registrada                                                                              
                if (err) {
                    return res.status(404).send({
                        status: 'ERROR',
                        message: 'Error al buscar'
                    });
                }

                if (travel) {                                                             // Si nos devuelve un Travel(true) en la busqueda, ya el viaje está registrado
                    return res.status(200).send({
                        status: 'sucess',
                        message: 'Este viaje ya esta registrado'
                    });
                }

                var travel = new Travel();                                              // De no existir, instanciamos el nuevo viaje basado en el modelo Travel creado

                travel.code = params.code;                                                  // Asignamos los valores recibidos el cuerpo del Json, a nuestro objeto
                travel.capacity = params.capacity;
                travel.origin = params.origin;
                travel.destination = params.destination;
                travel.price = params.price;

                travel.save((err, travelSaved) => {                                     // Procedemos a guardar el viaje en la BD

                    if (err || !travelSaved) {
                        return res.status(404).send({
                            status: 'ERROR',
                            message: 'No se ha podido guardar la información'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        travelSaved
                    });

                });

            });

        } else {
            return res.status(200).send({
                status: 'ERROR',
                message: 'Los datos no son validos'
            });
        }
    },

}

module.exports = controller;                                                                    // Exportamos el controlador de modo de utilizarlo dentro de otros ficheros
