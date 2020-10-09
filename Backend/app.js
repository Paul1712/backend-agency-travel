/* Creamos el modulo con la información y dependencias necesarias para crear el servidor */ 

'use strict'                  // Para activar el modo estricto y las nuevas funcionalidades de JavaScript

// Cargar modulos o dependencias de Node para crear servidor
var express = require ('express');
var bodyParser = require ('body-parser');

// Ejecutar Express (http)
var app = express();

//Cargar ficheros rutas
var api_routes = require('./routes/api_routes');

// Middlewares: Es lo que se ejecuta antes de cargar una ruta o una URL de la aplicación, con esto iniciamos el modulo express

app.use(bodyParser.urlencoded({limit:"50mb", extended:false}));                            //Nos permite cargar y usar el bodyParser, especificando el tamano máximo del archivo a recibir por el Json
app.use(bodyParser.json({limit: '50mb'}));                                                 //Con esto convertimos cualquier tipo de peticion que recibamos a un JSON, especificando el tamano máximo del archivo a recibir por el Json

//CORS: Para permitir peticiones desde el frontend
app.use((req, res, next) => {                                                               // Código obtenido de victorroblesweb.es
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Anadir prefijos a rutas / Cargar rutas
app.use('/api', api_routes);


//Ruta o metodo de prueba, lo utilizamos antes de crear el archivo de las rutas para probar la conexion del servidor(api_routes).
/*app.get('/', (req, res) => {                            // Los 2 parametros que usa son: 1.La ruta en sí que se va a utilizar para llamar el metodo.  2.Funcion Callback con el método que va a hacer la ruta en concreto. (req: lo que recibimos, res: lo que respondemos)
    return res.status(200).send({                       // Metodo get, debe siempre devolver algo. "res.status(200)"= Se refiere al codigo de respuesta(http codes wikipedia). Con el método send envíamos una respuesta.
        test: 'Probando el metodo de prueba GET',
        autor: 'Paul Cordero',
        status: 'success'                               // Cuerpo del JSON que enviamos al hacer la peticion a este metodo.
    });
});
*/

//Exportar modulo
module.exports = app;  // Esto nos va a permitir usar el modulo que creamos fuera de este fichero