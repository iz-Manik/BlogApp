const path=require('path');
const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const checkForAuthentication=require('./middlewares/authentication');

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

app.use("/user",userRoute);

app.get('/',(req,res)=>{
    return res.render('home',{user:req.user});
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});