const { blogModel } = require("../Models/blogModel")
const { commnetModel } = require("../Models/commentModel")
//  Add Comment
const blogcomment = async(req,res)=>{
const blog = await blogModel.find({blogid:req.body.blogid})
if(!blog){return res.status(401).send({success:false,message:"No blog Found"})}
const coment  = await commnetModel.create(req.body)
res.status(201).send({success:true,message:"Comment Added!!",data:coment})
}
///////////////////////////////////////////////////////////////////////////////
// Update Comment
const updateComment = async(req,res)=>{
try{const comment = await commnetModel.findById(req.params.id)
if(!comment){return res.status(401).send({success:false,message:"Comment not Found"})}
let updation = await commnetModel.updateOne({_id:req.params.id},{comment:req.body.comment})
if(!updation){return res.status(401).send({success:false,message:"blog not updated"})}
res.status(200).send({success:true,message:"Updated Successfully", blog:updation})
}
catch (error){
    console.log("error",error)
}
//////////////////////////////////////////////////////////////////
}
// delete Comment
const deleteComment = async(req,res)=>{
const comment = await commnetModel.findById(req.params.id)
if(!comment){return res.status(401).send({success:false,message:"No Comment Found"})}
const deletee = await commnetModel.findByIdAndDelete(req.params.id)
res.status(200).send({success:true, message:"comment Deleted",data:deletee})
}


module.exports = {blogcomment,updateComment,deleteComment}