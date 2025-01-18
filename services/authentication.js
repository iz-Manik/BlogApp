const JWT=require('jsonwebtoken');

const secret="Man@123"

function createToken(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role
    };
    const token=JWT.sign(payload,secret);
    return token;
}

function verifyToken(token){
    return JWT.verify(token,secret);
}

module.exports={
    createToken,
    verifyToken
}