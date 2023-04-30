const express=require("express")
const router=express.Router()


router.get("/",(req,res)=>{
    res.status(200).json({message:"here is your order"})
})

router.post("/",(req,res,next)=>{
    const order={
        productid:req.body.productid,
        quantity:req.body.quantity
    }
    res.status(201).json({
        mesaage:'post method on orders',
        createdOrder:order
    })
})

router.get("/:orderid",(req,res,next)=>{
    
    res.status(200).json({
        message:`showing response for order id ${req.params.orderid}`
    })
})

router.delete("/:orderid",(req,res,next)=>{
    res.status(200).json({
        message:`deleting order ${req.params.orderid}`
    }
        
    )
})






exports.router=router