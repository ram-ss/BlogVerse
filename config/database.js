const mongoose=require('mongoose')
require('dotenv').config();
const connect_db=()=>{
    mongoose.connect(process.env.db_url,{
    useNewurlParser:true,
    useUnifiedTopology:true
    })
    .then(()=>{
        console.log('data base connection established');
    })
    .catch((err)=>{
        console.log('data base connection failed');
        console.error(err.message);
        process.exit(1);
    })
}
module.exports=connect_db;