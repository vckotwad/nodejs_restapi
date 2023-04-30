const express= require("express")
const router=express.Router()
const Product=require("../models/product")
const mongoose=require("mongoose")

router.get("/",(req,res,next)=>{
    res.status(200).json({message:"handling get request to product"})
})

router.post("/",(req,res)=>{

    const product=new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    })
    
    product
        .save()
        .then(result=>{
            console.log(result)
        })
        .catch(err=> console.log(err))


    res.status(201).json({
        message:"handling post request to product",
        createdProduct:product
    })

})

router.get("/:productid",(req,res,next)=>{
    const id = req.params.productid
    res.status(200).json({message:`sending response for ${id}`,
                id:id})
})

router.patch("/:productid",(req,res,next)=>{
    const id =req.params.productid
    res.status(200).json({message:`patching done for the product ${id}`})
})

router.delete("/:productid",(req,res,next)=>{
    const id =req.params.productid
    res.status(200).json({message:`delted product with id ${id}`})
})

exports.router=router

