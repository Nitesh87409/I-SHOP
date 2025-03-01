const express = require('express');
const Categorycontroller = require('../controllers/category.controller');
const CategoryRouter = express.Router();


CategoryRouter.post(
    '/create',
    Categorycontroller.create
);

CategoryRouter.get(
    '/get-data/:id?',
    Categorycontroller.read
);
CategoryRouter.get(
    '/trash-data',
    Categorycontroller.readTrashData
);
CategoryRouter.delete(
    '/delete/:id',
    Categorycontroller.delete
);
CategoryRouter.put(
    '/update/:id',
    Categorycontroller.update
);
CategoryRouter.patch(
    '/move-to-trash/:id',
    Categorycontroller.moveToTrash
);
CategoryRouter.patch(
    '/restore/:id',
    Categorycontroller.restore
)
CategoryRouter.patch(
    "/change-status",
    Categorycontroller.changeStatus
)
module.exports = CategoryRouter;