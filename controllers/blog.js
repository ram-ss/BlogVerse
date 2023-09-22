const {blogs}=require('../models/blogSchema');
const { v4: uuid_v4 }=require('uuid')

exports.createBlog=async (req,res)=>{
    try{
        const {title,content}=req.body;
        const {email,userName}=req.user;
        const blogID=uuid_v4();
        const blog=await blogs.create({
            title:title,
            content:content,
            email:email,
            userName:userName,
            blogId:blogID
        });
        return res.status(200).json({
            success:true,
            message:"blog created",
            blog
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"create blogs failure"
        })
    }
}

exports.getBlog=async (req,res)=>{
    try{
        const {blogId}=req.body;
        const blog=await blogs.findOne({blogId:blogId});
        return res.status(200).json({
            success:true,
            message:"get blogs successfull",
            blog:blog
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"get blogs failure"
        })
    }
}

exports.deleteBlog=async (req,res)=>{
    try{
        const {blogId}=req.body;
        await blogs.findOneAndDelete({blogId:blogId});
        return res.status(200).json({
            success:true,
            message:"blog deleted"
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"deletion failure"
        })
    }
}

exports.getMyBlogs=async (req,res)=>{
    try{
        const {email}=req.user;
        const blogList=await blogs.find({email:email})
        return res.status(200).json({
            success:true,
            message:"my blogs fetched",
            blog:blogList
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"failure in fetching my blogs"
        })
    }
}