'use strict'

// Importar modulo validator
var validator = require('validator');       

// Importar modelos
var Customer = require('../Models/customer');
var Travel = require('../Models/travel');

var controller = {

    // Metodo de prueba
    test: (req, res) => {
        return res.status(200).send({
            test: 'Probando el metodo de prueba GET en Customer',
            status: 'success'
        })
    },

    // Metodo para guardar Cliente
    save: (req, res) => {

        var params = req.body;                                                              // Recibimos los valores enviados desde el API

        try {
            var validate_ced = !validator.isEmpty(params.ced);                              // Utilizamos el modulo validator para validar los datos que recibimos
            var validate_name = !validator.isEmpty(params.name);
            var validate_address = !validator.isEmpty(params.address);
            var validate_phone = !validator.isEmpty(params.phone);

        } catch {
            return res.status(200).send({
                status: 'ERROR',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_ced && validate_name && validate_address && validate_phone) {          // En caso de estar validados los datos, procedemos con la validacion del usuario antes de almacenarlo en la BD

            Customer.exists({ ced: params.ced }, (err, customer) => {                          // Utilizamos la funcion exist para verificar que la cedula no este registrada de modo de no duplicarla                                                                            
                if (err) {
                    return res.status(404).send({
                        status: 'ERROR',
                        message: 'Error al buscar'
                    });
                }

                if (customer) {                                                             // Si nos devuelve un Customer(true) en la busqueda, es porque ya el cliente existe
                    return res.status(200).send({
                        status: 'sucess',
                        message: 'El cliente ya existe'
                    });
                }

                var customer = new Customer();                                              // De no existir, instanciamos el nuevo cliente basado en el modelo Customer creado

                customer.ced = params.ced;                                                  // Asignamos los valores recibidos el cuerpo del Json, a nuestro objeto
                customer.name = params.name;
                customer.address = params.address;
                customer.phone = params.phone;

                customer.save((err, customerSaved) => {                                     // Procedemos a guardar el cliente en la BD

                    if (err || !customerSaved) {
                        return res.status(404).send({
                            status: 'ERROR',
                            message: 'No se ha podido guardar la información'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        customerSaved
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

    // Metodo para agregar viajes a un cliente
    addTravel: (req, res) => {

        var customerId = req.params.id;                                                     // Captamos el id del cliente que nos viene por la URL
        var params = req.body;                                                              // Captamos el cuerpo del Json con el codigo del viaje que queremos vincularle
        //console.log(params.code)

        try {
            var validate_code = !validator.isEmpty(params.code);                            // Utilizamos el modulo validator, para validar que no este vacía la información que estamos recibiendo

        } catch {
            return res.status(200).send({
                status: 'ERROR',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_code) {                                                                 // En caso de tener la información. . 

            Travel.exists({ code: params.code }, (err, travel) => {                          // Utilizamos la funcion exist para validar que el codigo del viaje no este registrado en la BD                                                                              

                //console.log(travel);

                if (err) {
                    return res.status(404).send({
                        status: 'ERROR',
                        message: 'Error al buscar viaje'
                    });
                }

                if (!travel) {                                                                 
                    return res.status(404).send({
                        status: 'ERROR',
                        message: 'El vuelo no existe'
                    });
                }

                Customer.findOneAndUpdate({ _id: customerId }, { $push: { codeTravel: params.code } }, { new: true }, (err, customerUpdated) => {                       // En caso de existir el viaje registrado con el codigo, procedemos a agregarlo al cliente realizando un update del campo codeTravel que almacenas los codigos de los viajes que vinculados a el
                    /* Cuando usamos la propiedad "findOneAndUpdate" le enviamos 4 parametros:
                       1: "{_id: customerId}" para identificar el id del objeto que vamos a actualizar
                       2: "params" contiene los datos que vamos a actualizar, tambien podemos crear un objeto con los datos especificos que deseamos actualizar
                       3: "{new:true}" con esta expresión indicamos que se nos devuelva el objeto nuevo luego de actualizarlo y no el anterior.
                       4: Funcion Callback para obtener algun error en caso dado o devolver el objeto actualizado. */


                    if (!customerUpdated || customerUpdated == undefined) {
                        return res.status(404).send({
                            status: 'ERROR',
                            message: 'El cliente no existe'
                        });
                    }

                    if (err) {
                        return res.status(200).send({
                            status: 'ERROR',
                            message: 'Error al agregar vuelo'
                        });
                    }

                    return res.status(200).send({                                   // Si el cliente existe, lo actualizamos y devolvemos un mensaje success con el objeto actualizado
                        status: 'success',
                        message: 'Viaje agregado',
                        customer: customerUpdated
                    });
                });
            });

        } else {
            return res.status(200).send({
                status: 'ERROR',
                message: '¡Los datos no son validos!'
            });
        }
    }

}

module.exports = controller;                                                       // Exportamos el controlador de modo de utilizarlo dentro de otros ficheros
