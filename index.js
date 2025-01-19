const path=require('path');
const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const checkForAuthentication=require('./middlewares/authentication');
const blogRoute=require('./routes/blog');
const Blog=require('./models/blog');

const app=express();
const port=3000;

mongoose.connect('mongodb://localhost:27017/blogify').
then((e)=>console.log('Connected to DB')).
catch((err)=>console.log(err));

const userRoute=require('./routes/user');

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(checkForAuthentication('token'));
app.use(express.static(path.resolve('./public')));

app.use("/user",userRoute);
app.use("/blog",blogRoute);

app.get('/',async(req,res)=>{
    const allBlogs=await Blog.find({}).sort({createdAt:-1});
    return res.render('home',{user:req.user , blogs:allBlogs});
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});