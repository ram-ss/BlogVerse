const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userType:String,
    tokens:[{
        token:String,
    }]
})

const user=mongoose.model('user',userSchema)
module.exports= {user};
