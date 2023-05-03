//importing express and router
const express= require("express")
const router=express.Router()


//using product controller where all the login is written
const productcontroller=require("../controller/product")

//importing middleware for authentication
const checkAuth=require("../middleware/check-auth")

//import upload file middleware for uploading file
const upload_middleware=require("../middleware/upload_file")


//to get all product
router.get("/",productcontroller.product_get_all)

//to creating a product
router.post("/",checkAuth,upload_middleware.upload.single("productImage"),productcontroller.product_post)

//to get specific product
router.get("/:productid",productcontroller.product_get_specific)

//to patch a product
router.patch("/:productid",checkAuth,productcontroller.product_patch)

//to delete a product
router.delete("/:productid",checkAuth,productcontroller.product_delete)


//export router to app.js file
exports.router=router

