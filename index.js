const express=require('express');
const db_connect=require('./config/database')
require('dotenv').config();

const app=express();

const cookieParser = require('cookie-parser')
app.use(cookieParser())


const port=process.env.port || 3002;

app.use(express.json());
const allRoutes=require('./routes/allRoutes')
app.use('/blog-verse/v1',allRoutes)

const cors=require('cors')
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.listen(port,()=>{
    console.log(`server started at ${port}`);
})
db_connect();
app.get('/blog-verse/v1',(req,res)=>{
    res.send(`<h1>Welcome to Blog Verse Application</h1>`)
})