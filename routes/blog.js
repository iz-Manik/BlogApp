const {Router}=require('express');
const multer=require('multer');
const path=require('path');

const Blog=require('../models/blog');
const Comment=require('../models/comment');

const router=Router();

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.resolve(`./public/uploads`));
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname);
    }
});

const upload = multer({ storage: storage });


router.get('/add-new',(req,res)=>{
    return res.render('addBlog',{
        user:req.user
    });
});

router.get('/:id',async(req,res)=>{
    const blog=await Blog.findById(req.params.id).populate('createdBy');
    return res.render('blog',{
        blog,
        user:req.user
    });
});

router.post('/comment/:blogId',async(req,res)=>{
    const {content}=req.body.content;
    const comment=Comment.create({
        content,
        user:req.user._id,
        blog:req.params.blogId
    });
    return res.redirect(`/blog/${req.params.blogId}`);
});

router.post('/',upload.single('coverImage'),async(req,res)=>{
    const {title,body}=req.body;
    const blog=Blog.create({
        title,
        body,
        coverImageURL:`/uploads/${req.user._id}`,
        createdBy:req.user._id,
    })
    return res.redirect(`/blog/${blog._id}`);
}
);

module.exports=router;