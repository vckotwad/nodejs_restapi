//importing mongoose
const mongoose=require("mongoose")
//importing order model
const Order=require("../models/order")
//importing product model
const Product=require("../models/product")


//to get all the orders
module.exports.order_get_all=(req,res,next)=>{

    Order
    .find()
    .select("id productid quantity")
    .populate("product")
    .exec()
    .then(doc=>{
        res.status(200).json({
            length:doc.length,
            orders:doc.map(doc=>{
                return {
                    id:doc._id,
                    product:doc.product,
                    quantity:doc.quantity

                }
            })
        })
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })

}


//to create a order
module.exports.orders_post=(req,res,next)=>{

    Product.findById(req.body.productid)
    .then(product=>{
            if(!product){
                return res.status(404).json({message:"product not found"})
            }
        const order= new Order({
            _id:new mongoose.Types.ObjectId(),
            product:req.body.productid,
            quantity:req.body.quantity
        })

        return order.save()
    })
    .then(result=>{
        res.status(201).json({message:"order stored"})
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })


}


//to get specific order
module.exports.order_get_single=(req,res,next)=>{
    const id = req.params.orderid

    Order
    .findById(id)
    .select("_id productid quantity")
    .populate("product")
    .exec()
    .then(doc=>{
        res.status(200).json({
        
                    id:doc._id,
                    product:doc.product,
                    quantity:doc.quantity

                })
            })
        
    .catch(err=>{
        res.status(500).json({message:err})
    })
    

}


//to delete a order
module.exports.order_delete=(req,res,next)=>{

    const id = req.params.orderid

    Order
    .deleteMany({_id:id})
    .exec()
    .then(doc=>{
        res.status(200).json(doc)
    })
    .catch(err=>{
        res.status(500).json({message:err})
    })
  
}