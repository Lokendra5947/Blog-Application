const { default: mongoose } = require("mongoose");

const blogScehma = new mongoose.Schema({
  title:{type:String,require:true},
  description:{type:String,require:true},
  userid:{type:mongoose.Types.ObjectId, ref:"userModel"},
  isActive:{type:Boolean,default:true},
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel'
  }],
  blogpic:{type:String,default:""},
},{timestamps:true})
const blogModel = mongoose.model("blogModel",blogScehma)
module.exports = {blogModel}