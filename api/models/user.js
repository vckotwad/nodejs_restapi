//importing mongoose
const mongoose=require("mongoose")


//creating user schema
const userSchema=mongoose.Schema({
    _id:    mongoose.Schema.Types.ObjectId,
    email:  {type:String,
        required:true,
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{type:String,required:true}

}

)


//exporting user schema
module.exports=mongoose.model("user",userSchema)