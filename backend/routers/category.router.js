const express = require('express');
const Categorycontroller = require('../controllers/category.controller');
const CategoryRouter = express.Router();


CategoryRouter.post('/create',

    Categorycontroller.create
);

CategoryRouter.get('/get-data',

    Categorycontroller.read
);
CategoryRouter.get('/trash-data',

    Categorycontroller.readTrashData
);
CategoryRouter.delete(
    '/delete/:id',
    Categorycontroller.delete
);
CategoryRouter.patch(
    '/move-to-trash/:id',
    Categorycontroller.moveToTrash
);
CategoryRouter.patch(
    "/change-status",
    Categorycontroller.changeStatus
)
module.exports = CategoryRouter;