const Product = require('../models/product.model')
const { generateFileName } = require('../helper');
const fs = require('fs');


const productcontroller = {

    async changeStatus(req, res) {
        try {
            const id = req.body.id;
            const new_status = req.body.new_status;
            Product.findByIdAndUpdate(id, { status: new_status })
                .then(
                    () => {
                        res.send({ msg: "status changed", flag: 1 });
                    }
                ).catch(
                    () => {
                        res.send({ msg: "Unable to change status", flag: 0 });
                    }
                )

        } catch (error) {
            console.log(error)
            res.send({ msg: "Internal server error", flag: 0 });
        }

    },

    addProduct: async (req, res) => {
        try {
            const image = req.files.image;
            const { slug, category, name, color, Orignal_price, discounted_price, final_price, Discription } = req.body;
            const destination = "./public/image/products/";
            const imageName = generateFileName(image.name);

            image.mv(
                destination + imageName,
                (err) => {
                    if (err) {
                        res.send({ msg: "image not uploaded", flag: 0 });
                    } else {
                        const product = new Product({
                            name,
                            slug,
                            category_id: category,
                            colors: JSON.parse(color),
                            price: Orignal_price,
                            discount: discounted_price,
                            final_price: final_price,
                            discription: Discription,
                            main_image: imageName
                       
                        });
                        product.save()
                            .then(() => {
                                res.send({ msg: "product added succesfully", flag: 1 });
                            }).catch((error) => {
                                console.log(error.message);
                                fs.unlinkSync(destination + imageName);
                                res.send({ msg: "internal server error", flag: 0 });
                            });
                    }
                }
            )



        } catch (error) {

        }
    },


    checkproductexists: async (req, res) => {

        try {

            const name = req.params.name
            const product = await Product.findOne({ name: name }).countDocuments();
            if (product == 1) {
                res.send({ msg: "product already exists", flag: 0 });
            } else {
                res.send({ msg: "product does not exists", flag: 1 });

            }

        } catch (error) {
            res.send({ msg: "internal server error", flag: 0 });

        }
    },


    readProductdata: async (req, res) => {
        try {

            const product = req.params.id
                ? await Product.findById(req.params.id)
                : await Product.find().populate(
                    ["category_id","colors"]
                );
            res.send({ product, flag: 1 })


        } catch (error) {
            res.send({ flag: 0, msg: 'internal server error' })
        }
    }

}
module.exports = productcontroller;