/* Creamos el modelo del cliente, donde especificamos la forma en que vamos a almacenar los datos en la BD */

'use strict'

var mongoose = require('mongoose');                             // Iniciamos el modulo de Mongoose
var Schema = mongoose.Schema;                                   // Utilizamos la propiedad Schema de mongoose

var CustomerSchema = new Schema({                               // Definimos la esctructura que tendra cada uno de los objetos y documentos de este tipo
    ced: String,
    name: String,
    address: String,
    phone: String,
    codeTravel: Array, 
});

module.exports = mongoose.model('Customer', CustomerSchema);          // Exportamos el modelo como un modulo para poder ser utilizado en nuestro Backend. (crear objetos nuevos ó utilizar el modelo para conectarnos mediante él a su colección de datos en la BD y poder utilizar métodos como "Save", "Find". . .)