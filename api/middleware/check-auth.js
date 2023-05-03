//importing jwt for jwt authentication
const jwt=require("jsonwebtoken")


//exporting checkauth middleware
module.exports=(req,res,next)=>{
    try{
        const token =req.headers.authorization.split(" ")[1]
        
        const decoded=jwt.verify(token,"jwtpassword")
        req.userData=decoded
        next()
    }catch{
        return res.status(401).json({
            message:"auth failed"
        })

    }
}