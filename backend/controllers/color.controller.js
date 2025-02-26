const Color = require('../models/color.model');

const ColorController = {

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
