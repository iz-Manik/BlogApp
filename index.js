const path=require('path');
const express=require('express');
const app=express();
const port=3000;

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.get('/',(req,res)=>{
    return res.render('home');
});


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});