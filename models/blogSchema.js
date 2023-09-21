const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    blogId:{
        type:String,
        required:true
    },
    comments:[{
        user:String,
        comment:String
    }]
})

const blogs=mongoose.model('blog',blogSchema)
module.exports= {blogs};