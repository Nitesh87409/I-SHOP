const Color = require('../models/color.model');

const ColorController = {

    async update(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            Color.findByIdAndUpdate(id, { colorname: data.name, colorslug: data.slug , color_code: data.colorcode})
                .then(
                    () => {
                        res.send({ msg: "Color updated", flag: 1 });
                    }
                ).catch(
                    () => {
                        res.send({ msg: "Unable to update Color", flag: 0 });
                    }
                )

        } catch (error) {
            res.send({ msg: "Internal server error", flag: 0 });

        }
    },

    restore(req, res) {
        try {
            const id = req.params.id
            Color.updateOne({ _id: id }, { deletedAt: null })
                .then(
                    () => {
                        res.send({ msg: "Color Restore succesfully", flag: 1 })
                    }
                ).catch(
                    () => {
                        res.Send({ msg: "Color not Restore", flag: 0 })
                    }
                )

        } catch (error) {
            res.send({ msg: "internal server Error", flag: 0 })

        }
    },
    delete(req, res) {
        try {
            const id = req.params.id
            Color.findByIdAndDelete(id)
                .then(
                    () => {
                        res.send({ msg: "Color Deleted ", flag: 1 })
                    }
                ).catch(
                    () => {
                        res.send({ msg: "Unable to delete Color  ", flag: 0 })
                    }
                )
        } catch (error) {
            res.send({ msg: "internal server Error ", flag: 0 })

        }
    },

    async readTrashData(req, res) {
        try {
            const color = await Color.find({ deletedAt: { $ne: null } }).sort({ createdAt: -1 });
            res.send({ color, total: color.length, flag: 1 });
        } catch (error) {
            console.log(error);

            res.send({
                msg: "internal server error",
                flag: 0
            })
        }

    },

    async moveToTrash(req, res) {
        try {
            const id = req.params.id;
            console.log(id, "id")
            Color.findByIdAndUpdate(id, { deletedAt: new Date() })
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
            console.log(error);
            res.send({ msg: "Internal server error", flag: 0 });

        }
    },

    async changeStatus(req, res) {
        try {
            const id = req.body.id;
            const new_status = req.body.new_status;
            Color.findByIdAndUpdate(id, { status: new_status })
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

    async readColorData(req, res) {

        try {
            let color;
            if (req.params.id) {

                color = await Color.findById(req.params.id)
                res.send({ color, flag: 1 });
            } else {
                color = await Color.find({ deletedAt: null }).sort({ createdAt: -1 });
                res.send({ color, total: color.length, flag: 1 });
            }

        } catch (error) {
            console.log(error);

            res.send({
                msg: "internal server error",
                flag: 0
            })
        }



    },



    async createcolor(req, res) {
        try {
            const { colorname } = req.body;

            // Check if the color already exists
            const existingColor = await Color.findOne({ colorname });
            if (existingColor) {
                return res.status(400).json({ msg: "Color already exists", flag: 0 });
            }

            // Create and save the new color
            const color = new Color(req.body);
            await color.save();

            return res.status(201).json({ msg: "Color created successfully", flag: 1 });
        } catch (error) {
            console.error("Error creating color:", error);
            return res.status(500).json({ msg: "Internal server error", flag: 0 });
        }
    }
};

module.exports = ColorController;
