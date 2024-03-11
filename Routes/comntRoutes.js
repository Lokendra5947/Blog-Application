const express = require("express")
const { blogcomment, updateComment, deleteComment } = require("../Controller/comntController")
const { verifyToken } = require("../middleware/jwtVerify")
const commentRouter = express.Router()

commentRouter.post("/addcomment",verifyToken,blogcomment)
commentRouter.put("/update/:id",verifyToken,updateComment)
commentRouter.delete("/delete/:id",verifyToken,deleteComment)


module.exports = {commentRouter}