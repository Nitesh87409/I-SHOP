const express = require('express');
const mongoose = require('mongoose');
const CategoryRouter = require('./routers/category.router');
const app = express();
const cors = require('cors');
const ColorRouter = require('./routers/color.router');
const productRouter = require('./routers/product.router')

app.use(cors({ origin: 'http://localhost:3000' }));


app.use(express.json());
app.use("/category", CategoryRouter);
app.use("/color",ColorRouter);
app.use("/product",productRouter);

mongoose.connect('mongodb://localhost:27017/',
    {
        dbName: "ishop"
    }).then(() => {
        console.log('Database connected');

        app.listen(5000, () => {
            console.log('Server is running for 5000');
        });


    }).catch(() => {


        console.log('Database connection failed');


    });

