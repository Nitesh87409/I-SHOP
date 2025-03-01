const Product = require('../models/product.model')

const productcontroller = {


    readProductdata: async (req, res) => {
        try {

            const product = req.params.id
                ? await Product.findById(req.params.id)
                : await Product.find();
            res.send({ product, flag: 1 })


        } catch (error) {
            res.send({ flag: 0, msg: 'internal server error' })
        }
    }

}
module.exports = productcontroller;