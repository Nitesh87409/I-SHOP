const express = require('express');
const Colorcontroller = require('../controllers/color.controller');
const ColorRouter = express.Router();


ColorRouter.post(
    '/create-color',
    Colorcontroller.createcolor
);

ColorRouter.get(
    '/get-data',
    Colorcontroller.readColorData
);
ColorRouter.patch(
    "/change-status",
    Colorcontroller.changeStatus

);
ColorRouter.patch(
    '/move-to-trash/:id',
    Colorcontroller.moveToTrash
);
ColorRouter.get(
    '/trash-data',
    Colorcontroller.readTrashData
);
ColorRouter.delete(
    '/delete/:id',
    Colorcontroller.delete
);
ColorRouter.patch(
    '/restore/:id',
    Colorcontroller.restore
)

module.exports = ColorRouter;