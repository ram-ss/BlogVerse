const {user}=require('../models/userSchema')
const bcrypt=require('bcrypt');
const { sign } = require('jsonwebtoken');
const {v4:uuid_v4}=require('uuid')

exports.signUp=async (req,res)=>{
    try{
        const {email,password,confirmPassword,userName}=req.body;
        const userPresent=user.findOne({email:email});
        if(userPresent){
            return res.status(401).json({
                success:false,
                message:"user alredy exists"
            })
        }
        if(password!==confirmPassword){
            return res.status(401).json({
                success:false,
                message:"confirm password does not match"
            })
        }
        const hash=await bcrypt.hash(password,10);
        const newUser=await user.create({
            email:email,
            password:hash,
            userName:userName,
            userType:'user'
        })
        return res.success(200).json({
            success:true,
            message:"user created successfully",
            newUser
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"signup failure"
        })
    }
}

exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const userPresent=await user.findOne({email:email});
        if(!userPresent){
            return res.status(404).json({
                success:false,
                message:"user is not registered"
            })
        }
        if(await bcrypt.compare(password,userPresent.password)){
            const payload={
                email:userPresent.email,
                id:userPresent._id,
                userType:userPresent.userType
            }
            const token=jwt.sign(payload,process.env.jwt_secret,{expiresIn:'2h'});
            userPresent.token=token;
            userPresent.password=undefined;
            const options={
                expiresIn:Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            return res.cookie('token',token,options).status(200).json({
                success:true,
                message:"token generated and logged in",
                userPresent
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"password incorrect"
            })
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"login failure"
        })
    }
}