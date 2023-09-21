const {user}=require('../models/userSchema')
const jwt=require('jsonwebtoken')
require('dotenv').config()

exports.auth=async (req,res,next)=>{
    try {
        const token=await req.cookies._jwt
        const verifyToken=jwt.verify(token,process.env.secretKeyCookie);
        const registeredUser=await user.findOne({_id:verifyToken._id,"tokens.token":token})
        if(!registeredUser){
            throw new Error("Couldn't find registered user")
        }
        else{
            req.token=token
            req.registeredUser=registeredUser
            req.id=registeredUser._id
            next()
        }
    } catch (error) {
        console.log(error)
    }
}