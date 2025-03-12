const express = require('express');
const productcontroller = require('../controllers/product.controller');
const fileupload = require('express-fileupload');
const { create } = require('../models/category.model');
const productRouter = express.Router();

productRouter.post(
    '/add', fileupload({
        createParentPath: true
    }),
   productcontroller.addProduct
);

productRouter.get(
    '/get-data',
   productcontroller.readProductdata
);
productRouter.get(
    '/check-product-exists/:name', 
   productcontroller.checkproductexists
);



module.exports = productRouter;