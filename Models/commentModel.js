const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
   comment:{type: String,require:true},
   userid:{type:mongoose.Schema.Types.ObjectId,require:true,ref:"userModel"},
    blogid:{type:mongoose.Schema.Types.ObjectId,require:true,ref:"blogModel"},
    isActive:{type: Boolean,default:true}
    
})
const commnetModel = mongoose.model("commentModel",commentSchema)
module.exports = {commnetModel}