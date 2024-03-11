const express = require("express")
const { blogCreate, allBlogs, singleBlog, deleteBlog, updateBlog, blogLikes, blogUnlike } = require("../Controller/blogController")
const { upload } = require("../helper/multer")
const { verifyToken } = require("../middleware/jwtVerify")
const blogRouter = express.Router()

blogRouter.post("/createblog",verifyToken,upload.single("blogpic"),blogCreate)
blogRouter.get("/",allBlogs)
blogRouter.get("/singleblog/:id",singleBlog)
blogRouter.delete("/:id",verifyToken,deleteBlog)
blogRouter.put("/update/:id",verifyToken,upload.single("blogpic"),updateBlog)

// blogRouter.post('/blogs/:id/like',verifyToken,blogLikes)
// blogRouter.delete('/blogs/:id/unlike',verifyToken,blogUnlike)

module.exports = {blogRouter}