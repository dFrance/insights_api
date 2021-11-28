const { Router } = require('express')

const CardController = require('./Controller/CardController')
const CategoryController = require('./Controller/CategoryController')

const routes = new Router();

routes.get('/cards', CardController.index);
routes.post('/cards', CardController.store);
routes.get('/category', CategoryController.index);
routes.post('/category', CategoryController.store);

module.exports = routes;