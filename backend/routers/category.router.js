const express = require('express');
const Categorycontroller = require('../controllers/category.controller');
const CategoryRouter = express.Router();


CategoryRouter.post('/create',

    Categorycontroller.create
);

CategoryRouter.get('/get-data',

    Categorycontroller.read
);
// CategoryRouter.delete(
//     '/delete/id:',
//     Categorycontroller.delete
// )
module.exports = CategoryRouter;