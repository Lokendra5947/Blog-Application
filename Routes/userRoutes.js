const express = require("express")
const { Registration, login, resetpassword, forgetPassword, myBlog } = require("../Controller/userController")
const { upload } = require("../helper/multer")
const { verifyToken } = require("../middleware/jwtVerify")
const { allBlogs } = require("../Controller/blogController")
let userRoutes =express.Router()

// userRoutes.get("/",(req,res)=>{
//     res.send("blog userRouter!!!")
// }) 
userRoutes.post('/regitser',upload.single("profilePic"),Registration)
userRoutes.post('/login',login)
userRoutes.post("/resetpassword",verifyToken,resetpassword)
userRoutes.post("/forgetpassword",verifyToken,forgetPassword)
userRoutes.get("/myblog/:id",myBlog)


module.exports = {userRoutes}