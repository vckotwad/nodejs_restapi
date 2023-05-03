//importing multer for file uploading
const Multer=require("multer")


//create storage strategy
const Storage=Multer.diskStorage({
    destination:function(req,file,cb){
         cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})

//create filefilter strategy
const fileFilter=(req,file,cb)=>{
    //reject file
    if (file.mimetype==="image/jpeg"|| file.mimetype==="image/png"){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

//create upload strategy using above strategies
const upload=Multer({
    storage:Storage,
    limits:{
        fileSize:1024*1024*4},
    fileFilter:fileFilter
    })


//export upload middleware to product routes
module.exports.upload=upload