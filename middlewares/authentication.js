const { verifyToken } = require('../services/authentication');
function checkForAuthentication(cookieName) {
  return function(req, res, next) {
    const tokenValue=req.cookies[cookieName];
    if(!tokenValue) next();
    try{
        const userPayload=verifyToken(tokenValue);
        req.user=userPayload;
    }catch(e){
    }
    next();
  };
}
module.exports = checkForAuthentication;