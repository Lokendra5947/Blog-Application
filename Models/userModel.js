const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    city:{type:String,require:true},
    state:{type:String,require:true},
    profilePic:{type:String,
    default:""}
},{timestamps:true})
const userModel = mongoose.model("userModel",schema)
module.exports = {userModel}