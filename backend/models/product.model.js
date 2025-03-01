const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({

    name :{type:String, require:true},
    slug :{type:String, require:true , unique : true},
    price :{type:String, require:true},
    discount :{type:String, default: 0},
    final_price:{type:String, require:true},
    discription:{type:String, require:true },
    main_image:{type:String, require:true },
    other_image:{
        type:[String],
        require:true
    },
    category_id:{
        type:Schema.Types.ObjectId,
        ref :"Category",
        require: true
    },
    colors:{
        type:Schema.Types.ObjectId,
        ref :"Color",
        require: true
    }
})
module.exports = mongoose.model('Product', ProductSchema);
