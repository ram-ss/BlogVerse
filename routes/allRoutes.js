const express=require('express')
const router=express.Router();
const {login,signUp}=require('../controllers/auth');
const {auth}=require('../middleware/auth');
const {createBlog,deleteBlog,getBlog,getMyBlogs}=require('../controllers/blog')

router.post('/login',login);
router.post('/signUp',signUp);

router.post('/createBlog',auth,createBlog);
router.post('/delete',auth,deleteBlog);
router.post('/getBlog',auth,getBlog);
router.get('/getMyBlogs',auth,getMyBlogs);

module.exports=router;


