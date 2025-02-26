const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    colorname: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    colorslug: {
        type: String,
        unique: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: true
    },
    deletedAt: {
        type: Date,
        default: null
    },
    color_code:{
        type: String,
        default: true
    }
}, {
    timestamps: true
});

const Color = mongoose.model('Color', colorSchema);

module.exports = Color;