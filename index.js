const path=require('path');
const express=require('express');
const mongoose=require('mongoose');


const app=express();
const port=3000;

mongoose.connect('mongodb://localhost:27017/blogify').
then((e)=>console.log('Connected to DB')).
catch((err)=>console.log(err));

const userRoute=require('./routes/user');

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.urlencoded({extended:true}));
app.use("/user",userRoute);

app.get('/',(req,res)=>{
    return res.render('home');
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});