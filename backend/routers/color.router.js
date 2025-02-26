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
)

module.exports = ColorRouter;