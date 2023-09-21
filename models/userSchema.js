const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

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
    cPassword:String,
    userType:String,
    tokens:[{
        token:String,
    }]
})

userSchema.methods.generateAuthToken=async function(){
    try {
        let token=jwt.sign({_id:this.id},process.env.secretKeyCookie)
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token	
    } catch (error) {
        console.log(error)
    }
}
const user=mongoose.model('user',userSchema)
module.exports= {user};
