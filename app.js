//importing expressJs
const express =require("express")
//creating express app
const app =express()




//importing routes
const productrouter=require("./api/routes/product")
const orderrouter=require("./api/routes/orders")
const userrouter=require("./api/routes/users")


//importing packages for required functionality
const morgan = require("morgan")
const bodyparser=require("body-parser")

//importing mongoose
const mongoose=require("mongoose")


//creating uploads folder static for access
app.use("/uploads",express.static("uploads"))


//using morgan for debugging
app.use(morgan("dev"))


//using bodyparser for parsing urlencoded request body
app.use(bodyparser.urlencoded({extended:false}))


//using bodyparser for parsing json request body
app.use(bodyparser.json())


//allows CORS
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","*")
    if(req.method==="OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE")
        res.status(200).json({})
    }
    next()
})


//using different routes
app.use("/products",productrouter.router)
app.use("/orders",orderrouter.router)
app.use("/users",userrouter.router)


//connecting to the mongodb database using environment variable
mongoose.connect(process.env.mongodb_string,{ useNewUrlParser: true })


//creating a page not found route
app.use((req,res,next)=>{
    const error = new Error("Not Found")
    error.status=404
    next(error)
})


//creating server error router
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})


//starting server
app.listen(8000)