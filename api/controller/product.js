//importing product model
const Product=require("../models/product")
//importin mongoose
const mongoose=require("mongoose")


//getting all product
module.exports.product_get_all=(req,res,next)=>{
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
}


//creating new product
module.exports.product_post=(req,res,next)=>{
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
}


//get specific product
module.exports.product_get_specific=(req,res,next)=>{
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
  
}


//patching a product
module.exports.product_patch=(req,res,next)=>{
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
}


//deleting a product
module.exports.product_delete=(req,res,next)=>{
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

}



