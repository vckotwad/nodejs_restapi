const express= require("express")
const router=express.Router()
const Product=require("../models/product")
const mongoose=require("mongoose")
const Multer=require("multer")

const Storage=Multer.diskStorage({
    destination:function(req,file,cb){
         cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    //reject file
    if (file.mimetype==="image/jpeg"|| file.mimetype==="image/png"){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
const upload=Multer({
    storage:Storage,
    limits:{
        fileSize:1024*1024*4},
    fileFilter:fileFilter
    })

router.get("/",(req,res,next)=>{
    Product.find()
    .select("_id name price productImage")
    .exec()
    .then(doc=>{
        const response={
            count:doc.length,
            products:doc.map(doc=>{
                return {name:doc.name,
                price:doc.price,
                productImage:doc.productImage,
                request:{
                    type:"GET",
                    url: "http://localhost:8000/products/"+doc._id
                }

        }})
            
        }

            console.log(doc)
            res.status(200).json(response)
       
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:err})
    })
})

router.post("/",upload.single("productImage"),(req,res,next)=>{
    console.log(req.file)
    const product=new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        productImage:req.file.path
    })

    product
        .save()
        .then(result=>{
            console.log(result)
            res.status(201).json({
                message:"handling post request to product",
                createdProduct:{
                    id:result._id,
                    name:result.name,
                    price:result.price
                }
            })
        })
        .catch(err=> {res.status(403).json(err)})
        




})

router.get("/:productid",(req,res,next)=>{
    const id = req.params.productid

    Product.findById(id)
    .select("_id name price productImage")
    .exec()
    .then(doc=>{
        if (doc){
            console.log(doc)
        res.status(200).json(doc)
        }
        else{
            console.log("no item found")
            res.status(404).json({
                message:"no item found for the given id"
            })
        }
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:err})

    })
    
  
})

router.patch("/:productid",(req,res,next)=>{
    const id =req.params.productid
    // updateops={}
    // for (let ops in req.body){
    //     updateops[ops.propname]=ops.value
    // }
    Product.updateOne({_id:id},{$set:req.body})
        .exec()
        .then(result=>{
            console.log(result)
            res.status(200).json(result)
                    })
        .catch(err=>console.log(err))
})

router.delete("/:productid",(req,res,next)=>{
    const id =req.params.productid

    Product
    .deleteMany({_id:id})
    .exec()
    .then(doc=>{
        if (doc){

        console.log(doc)
        res.status(200).json(doc)

        }else{
            console.log("item not found")
            res.status(200).json({message:"item not found"})
        }
        
    })
    .catch(err=>{

        console.log(err)
        res.status(500).json({message:err})
    }
        )

})

exports.router=router

