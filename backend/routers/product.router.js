const express = require('express');
const productcontroller = require('../controllers/product.controller');
const productRouter = express.Router();


productRouter.get(
    '/get-data', 
   productcontroller.readProductdata
)

module.exports = productRouter;