const JWT=require('jsonwebtoken');

const secret="Man@123"

function ceateToken(user){
    const payload={
        Iid:user._id,
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
    ceateToken,
    verifyToken
}