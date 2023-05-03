const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")


const User=require("../models/user")
const user = require("../models/user")
const jwt=require("jsonwebtoken")



//sign up
router.post("/signup",(req,res,next)=>{

    User.find({email:req.body.email}).exec()
    .then(user=>{
        if(user.length >= 1){
            return res.status(409).json({message:"user already exists"})
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }else{
                    const user= new User({
                        _id:new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password:hash
                    })
                    user.save()
                    .then(result=>{
                        res.status(201).json({message:"user created",})
                    })
                    .catch(err=>res.status(500).json(err))
        
                }
            })

        }
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })
 
})



//sign in
router.post("/login",(req,res,next)=>{
    User.find({email:req.body.email}).exec()
    .then(user=>{
            if (user.length < 1){
                return res.status(401).json({message:"auth failed"})
            }
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({message:"auth failed"})
                }
                if(result){
                    //creating jwt token
                    console.log(result)
                    const token=jwt.sign({
                        email:user[0].email,
                        id:user[0]._id
                    },"jwtpassword",
                    {
                        expiresIn:"1h"
                    })
                    //returning token 
                    return res.status(200).json({message:"auth successfull",
                            token:token})

                }
                //returning failure
                res.status(401).json({message:"auth failed"})

            })
    })
    //returning failure
    .catch(err=>{
        res.status(200).json({error:err})
    })


})


//deleting user
router.delete("/:userId",(req,res,next)=>{
    id=req.params.userId
    User.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({message:"user deleted",response:result})
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })
})




exports.router=router