//importing mongoose
const mongoose=require("mongoose")


//creating product schema
const productSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,
            required:true},
    price:{type : Number, 
           required : true},
    productImage:{
        type:String,
        require:true
    }
}

)


//exporting product schema
module.exports=mongoose.model("Product",productSchema)