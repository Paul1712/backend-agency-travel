/*En este fichero tenemos la conexion a la BD y el servidor*/

'use strict'                        // Para activar el modo estricto y las nuevas funcionalidades de JavaScript

var mongoose = require('mongoose');     // Cargamos el modulo de Mongoose
var app = require('./app');             // Importamos el módulo app.js
var port = 3500;                        // Creamos el puerto a usar por la aplicación

mongoose.set('useFindAndModify', false);                                                         // Con el metodo set vamos a desactivar la forma de trabajar antigua con ciertos metodos, forzar a que los metodos antiguos se desactiven, de modo que podamos usar nuevos y de la documentacion de Mongoose.
mongoose.Promise = global.Promise;                                                               // Promesa con MongoDB para evitar fallos de conexión o al usar diferentes funciones, esto es a nivel de funcionamiento interno de Mongoose.
mongoose.connect('mongodb://localhost:27017/api_rest_agency_travel', { useNewUrlParser: true })  // Realizamos la conexión a la base de datos, en este caso es local 
        .then(() => {
            console.log('¡Conexión a la base de datos correcta!');                               // Mensaje exitoso de la promesa

            //Crear servidor y a escuchar peticiones HTTP
            app.listen(port, () => { 
                console.log('Servidor corriendo en http://localhost:' + port);
            }); 

        })
        .catch(() =>{
            console.log('- No se pudo realizar la conexión con la BD -');
        });