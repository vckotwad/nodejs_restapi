//importing express and router
const express=require("express")
const router=express.Router()
const checkAuth=require("../middleware/check-auth")


//importing user controller where all the login is written
const usercontroller=require("../controller/users")


//sign up
router.post("/signup",usercontroller.users_signup)

//sign in
router.post("/login",usercontroller.user_login)

//deleting user
router.delete("/:userId",checkAuth,usercontroller.user_delete)


//exporting router to app.js file
exports.router=router