//importing mongoose to create models
const mongoose=require("mongoose")


//create a schema for order
const orderSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    product:{type:mongoose.Schema.Types.ObjectId,
            ref:"Product",default:1},
    quantity:{type : Number, 
           required : true}
}

)


//exporting orderschema
module.exports=mongoose.model("order",orderSchema)