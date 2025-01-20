const {Schema,model}=require('mongoose');

const commentSchema=new Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    blog:{
        type:Schema.Types.ObjectId,
        ref:'blog'
    }
},{timestamps:true});

const Comment=model('comments',commentSchema);

module.exports=Comment;