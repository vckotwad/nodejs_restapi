const express =require("express")
const app =express()
const productrouter=require("./api/routes/product")
const orderrouter=require("./api/routes/orders")
const morgan = require("morgan")
const bodyparser=require("body-parser")
const mongoose=require("mongoose")




app.use("/uploads",express.static("uploads"))
app.use(morgan("dev"))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","*")
    if(req.method==="OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE")
        res.status(200).json({})
    }
    next()
})


app.use("/products",productrouter.router)
app.use("/orders",orderrouter.router)

mongoose.connect("mongodb+srv://vckotwad:Vaibhav%40123@node-rest-shop.ldm81gy.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true })


app.use((req,res,next)=>{
    const error = new Error("Not Found")
    error.status=404
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})



app.listen(8000)