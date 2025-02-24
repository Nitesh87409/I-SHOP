
const Category = require('../models/category.model');
const Categorycontroller = {

    async moveToTrash(req, res) {
        try {
            const id = req.params.id;
            console.log(id, "id")
            Category.findByIdAndUpdate(id, { deletedAt: new Date() })
                .then(
                    () => {
                        res.send({ msg: "Category moved to tarsh", flag: 1 });
                    }
                ).catch(
                    () => {
                        res.send({ msg: "Unable to move to tarsh", flag: 0 });
                    }
                )
        } catch (error) {
            res.send({ msg: "Internal server error", flag: 0 });

        }
    },
    async changeStatus(req, res) {
        try {
            const id = req.body.id;
            const new_status = req.body.new_status;
            Category.findByIdAndUpdate(id, { status: new_status })
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
    async readTrashData(req, res) {
        try {
            const categories = await Category.find({ deletedAt: { $ne: null } }).sort({ createdAt: -1 });
            res.send({ categories, total: categories.length, flag: 1 });
        } catch (error) {
            console.log(error);

            res.send({
                msg: "internal server error",
                flag: 0
            })
        }

    },
    async read(req, res) {
        try {
            const categories = await Category.find({ deletedAt: null }).sort({ createdAt: -1 });
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
    },
    restore(req, res) {
        try {
            const id = req.params.id
            Category.updateOne({ _id: id }, { deletedAt: null })
                .then(
                    () => {
                        res.send({ msg: "Category Restore succesfully", flag: 1 })
                    }
                ).catch(
                    () => {
                        res.Send({ msg: "Category not Restore", flag: 0 })
                    }
                )

        } catch (error) {
            res.send({ msg: "internal server Error", flag: 0 })

        }
    }
}
module.exports = Categorycontroller;