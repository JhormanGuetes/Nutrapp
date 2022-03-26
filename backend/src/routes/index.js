const express = require('express');
const customerController = require('../controllers/customer.controller');
const userController = require('../controllers/user.controller');
const collectionController = require('../controllers/collection.controller.js');
const labController = require('../controllers/lab.controller.js');
const psychoController = require("../controllers/psycho.controller.js");
const customerMiddleware = require('../middleware/customer.middleware');

const router = express.Router();

module.exports = () => {
    router.post('/api/v1/auth', userController.auth); //Autenticar nutricionista
    router.post('/api/v1/register', userController.register); //Registrar nutricionista
    router.get('/api/v1/list', userController.list); //Listar todos los nutricionistas

    router.post('/api/v1/add-customer', customerController.addCustomer);
    router.put('/api/v1/add-psychological-habit', customerController.addPsychologicalHabit);
    router.put('/api/v1/add-feeding-habits', customerController.addFeedingHabits);
    router.put('/api/v1/background', customerController.background);
    router.get('/api/v1/list-customer', customerController.listCustomer);
    router.post('/api/v1/list-customer-nutritionist', customerController.listCustomerNutritionist);
    router.post(
        '/api/v1/formulas',
        customerMiddleware.pesoIdealHamwi,
        customerController.formulas);
    router.get('/api/v1/id-customer/:id', customerController.idCustomer);
    
    router.get('/api/v1/list-collection', collectionController.list);
    
    router.get('/api/v1/list-labs', labController.list);
    router.get('/api/v1/id-labs/:id', labController.listID);

    router.get('/api/v1/list-psycho', psychoController.list);
    router.get('/api/v1/id-psycho/:id', psychoController.listID);


    
    return router;
}