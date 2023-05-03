//importing express and router
const express=require("express")
const router=express.Router()


//importing middleware for checking authentication
const checkAuth=require("../middleware/check-auth")


//importing order controller where all the logic is written
const ordercontroller=require("../controller/orders")


//to get all the orders
router.get("/",checkAuth,ordercontroller.order_get_all)

//to create a order
router.post("/",checkAuth,ordercontroller.orders_post)
 
//to get specific order
router.get("/:orderid",ordercontroller.order_get_single)

//to delte a order
router.delete("/:orderid",checkAuth,ordercontroller.order_delete)


//export router to app.js file
exports.router=router