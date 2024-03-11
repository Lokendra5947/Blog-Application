const path  = require("path")
const { blogModel } = require("../Models/blogModel")

// blog Creation
const blogCreate = async(req,res)=>{
  let filelocation = path.join(__dirname,`../${req.file.destination+req.file.filename}`)
  try{
    const blog = await blogModel.create({...req.body,blogpic:filelocation})
    // console.log(filelocation)
    if (req.userid != blog.userid) {
      return res.status(400).send({ success: true, message: "Not Authorized" });
    }
    res.status(201).send({success:true,message:"blog Created", data:blog})}
catch (error){
  console.log("error Occured",error)
  res.status(500).send({success:false,message:"Internal Sever error"})
}
}
////////////////////////////////////////////////////////////////////////////
// get All the blogs
const allBlogs = async(req,res)=>{
  const blog = await blogModel.find()
  if(!blog){return res.status(404).send({success:false,message:"no blog found"})}
  res.status(200).send({success:true,message:"all Blogs",data:blog})
}
/////////////////////////////////////////////////////////////////////////////
// get single blog
const singleBlog = async(req,res)=>{
  const blog = await blogModel.findById(req.params.id)
  if(!blog){return res.status(404).send({success:false,message:"No blog Found"})}
  res.status(200).send({success:true,message:"blog Found",data:blog})
}
////////////////////////////////////////////////////////////////////////////////
// delete Blog
const deleteBlog = async (req,res)=>{
const blog = await blogModel.findById(req.params.id)
if(!blog){return res.status(404).send({success:false,message:"Blog not Exsist"})}
const deleteBlog = await blogModel.findByIdAndDelete(req.params.id)
if (req.userid != blog.userid) {
  return res.status(400).send({ success: true, message: "Not Authorized" });
}
res.status(200).send({success:true,message:"blog Deleted",data:deleteBlog})
}
/////////////////////////////////////////////////////////////////////////////////
// update Blog
const updateBlog = async(req,res)=>{
  let filelocation = path.join(__dirname,`../${req.file.destination+req.file.filename}`)
  const {title,description,} = req.body
  const blog = await blogModel.findById(req.params.id)
  if(!blog){return res.status(404).send({success:false,message:"Blog not Exsist"})}
  let updation = await blogModel.updateOne({_id:req.params.id},{title:title,description:description,blogpic:filelocation})
  if (req.userid != blog.userid) {
    return res.status(400).send({ success: true, message: "Not Authorized" });
  }
  res.status(200).send({success:true,message:"Updated Successfully", blog:updation})
}


module.exports = {blogCreate,allBlogs,singleBlog,deleteBlog,updateBlog}