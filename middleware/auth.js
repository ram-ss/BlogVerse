const {user}=require('../models/userSchema')
const jwt=require('jsonwebtoken')
require('dotenv').config()

exports.auth=async (req,res,next)=>{
    try {
        const token=req.cookies.token
        const verifyToken=await jwt.verify(token,process.env.jwt_secret);
        console.log(verifyToken)
        const registeredUser=await user.findById({_id:verifyToken.id})
        if(!registeredUser){
            throw new Error("Couldn't find registered user")
        }
        else{
            console.log(verifyToken);
            req.user=verifyToken
            next();
        }
    } catch (error) {
        console.log(error)
    }
}