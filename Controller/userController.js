const path = require("path")
const jwt = require("jsonwebtoken")
const { userModel } = require("../Models/userModel")
const { hashPassword, matchPassward } = require("../helper/hashPassword")
const { blogModel } = require("../Models/blogModel")
const Registration = async(req,res)=>{
    // console.log(req.file)
    let fileLocation = path.join(__dirname, `../${req.file.destination+req.file.filename}`)
    const {email} = req.body
    let user = await userModel.findOne({email:email})
    if(user) {return res.status(400).send({sucess:false,message:"User already Registerd"})}
    let hashPass = await hashPassword(req.body.password)
    let newUser = await userModel.create({...req.body,password:hashPass,profilePic:fileLocation})
    res.status(201).send({sucess:true,message:"Registred Suceessfulyy!!!!",data:newUser})
    
}
 
const login = async(req,res) =>{
const {email, password} = req.body
const user = await userModel.findOne({email:email})
if(!user) {return res.status(401).send({success:false,message:"user not exsist"})}
const matching = await matchPassward(password,user.password)
if(!matching) {return res.status(409).send({success:false,message:"Incorrect password"})}
var token = jwt.sign({user:user},"shhhh",{expiresIn: "1d"})
res.setHeader("token",token)
res.status(201).send({success:true,message:"login successfully",data:user,token:token})
}

const myBlog = async(req,res)=>{
    const user = await userModel.findById(req.params.id)
    if(!user){return res.status(400).send({success:false,message:"user not Find"})}
    const allBlogs  = await blogModel.find({userid:req.params.id})
    if(allBlogs.length ===0){return res.status(404).send({sucess:false,message:"no blog found"})}
    res.status(200).send({success:true,message:"all blogs",totalBlogs:allBlogs.length,blogs:allBlogs, user:user})


}
// forget passsword 
const resetpassword = async(req,res)=>{

try{
let user = await userModel.findOne({Email:req.body.Email})
if(!user){return res.status(400).send({ success:false,message:"Invalid email"}) }
if(req.body.newPassword != req.body.confirmPassword){return res.status(400).send({ success:false,message:"Password not matched"})}
let newHashPassword  = await hashPassword(req.body.newPassword);
let newdataUpdate = new userModel(user)
newdataUpdate.password = newHashPassword;
newdataUpdate.save();
res.status(200).send({sucess:true,message:"Password reset Successfully"})
}catch (error){
    console.log("error:  ",error)
    res.send("internal server error")
}
}
//  forget password
let forgetPassword = async (req, res) => {
    let user = await userModel.findOne({email:req.body.Email})
    if(!user){return  res.status(400).send({ status: false, message: "Email not found" }); }
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "lokendraSinghr40@gmail.com",
          pass: "kpaa fedt dlkv ",
        },
      });
      let details = {
        from:"lokendraSinghr40@gmail.com",
        to: req.body.email,
        subject: "hello",
        text: "hello its me user!!!!",
      };
      transporter.sendMail(details, async (err) => {
        if (err) {
          res.status(200).send({ status: false, message: err.message });
        } else {
          res.status(200).send({ status: true, message: "Email Send" });
        }
      });
    } catch (error) {
      console.log(error.message);
      res.send({ status: false, message: "server Down" });
    }
  }; 

module.exports = {Registration,login,resetpassword,forgetPassword,myBlog}
