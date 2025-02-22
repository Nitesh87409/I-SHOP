
const Category = require('../models/category.model');
const Categorycontroller = {
    async create(req, res) {
        try {
            const data = req.body;


            const categorycount = await Category.findOne({ name: data.name }).countDocuments();
            if (categorycount == 1) {
                return res.send({ msg: "Category already exist", flag: 0 })

            }
            const category = new Category(data);
            category.save()
                .then(() => {
                    res.send({ msg: "Category created successfully", flag: 1 })
                }).catch(() => {
                    res.send({ msg: "Category not created", flag: 0 })
                });
        } catch (error) {
            res.send({
                msg: "internal server error",
                flag: 0
            })

        }

    },
    async read(req, res) {
        try {
            const categories = await Category.find().sort({ createdAt: -1 });
            res.send({ categories, total: categories.length, flag: 1 });
        } catch (error) {
            console.log(error);

            res.send({
                msg: "internal server error",
                flag: 0
            })
        }
    },
    delete(req, res) {
        try {
            const id = req.params.id
            console.log(id)
            Category.findByIdAndDelete(id)
                .then(
                    () => {
                        res.send({ msg: "category Deleted ", flag: 1 })
                    }
                ).catch(
                    () => {
                        res.send({ msg: "Unable to delete category  ", flag: 0 })
                    }
                )
        } catch (error) {
            res.send({ msg: "internal server Error ", flag: 0 })

        }
    }
}
module.exports = Categorycontroller;