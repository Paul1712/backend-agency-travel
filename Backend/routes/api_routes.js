/* Fichero donde vamos a agregar las rutas de nuestra api */

'use strict'

// Iniciamos el modulo express de Node
var express = require('express');     

// Importamos los controladores
var CustomerController = require('../Controllers/customer');
var TravelController = require('../Controllers/travel');

// Instanciamos el modulo router de Node, que nos va a permitir utilizar los servicios HTTP y configurar las URL de nuestra API con los metodos del controlador
var router = express.Router();

//Rutas de prueba
router.get('/customer-test', CustomerController.test);
router.get('/travel-test', TravelController.test);

//Rutas utiles - CUSTOMER
router.post('/save-customer', CustomerController.save);
router.post('/add-travel/:id?', CustomerController.addTravel);

//Rutas utiles - TRAVEL
router.post('/save-travel', TravelController.save);

module.exports = router;                            // Exportamos el moodulo para ser utilizado en otros ficheros(app.js)