const {createHmac , randomBytes}=require('node:crypto');
const { Schema, model }=require('mongoose');

const userSchema=new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    profileImageURL:{
        type:String,
        default:'/images/default.png'
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
},
    {timestamps:true}
);

userSchema.pre('save',function(next){
    if(!this.isModified('password')) return ;
    const salt=randomBytes(16).toString('hex');
    const hashedPassword=createHmac('sha256',salt).update(this.password).digest('hex');
    this.salt=salt;
    this.password=hashedPassword;
    next();
});
// The pre('save') middleware function in Mongoose relies on this to refer to the current document being
// saved (i.e., the user document in this case).
// If you use an arrow function, the value of this will not refer to the document; instead,
// it will inherit this from the enclosing scope, which is likely not what you want.

userSchema.static('matchPassword',async function(email,password){
    const user=await this.findOne({email});
    if(!user) throw new Error('User not found');

    const salt=user.salt;
    const hashedPassword=user.password;

    const hashedGivenPassword=createHmac('sha256',salt).update(password).digest('hex');

    if(!hashedGivenPassword===hashedPassword) throw new Error('Invalid password');

    return {...user, password: undefined , salt: undefined};
});

const User=model('User',userSchema);

module.exports=User;