const config = require('../../configs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//生成token
function signToke(id, secret){
    console.log(id, secret);
    const token = jwt.sign({
        id: id,
        secret: secret
    }, config.jwtSecret, {expiresIn: config.jwtExpires});
    return token;
}

//检查并更新token
async function checkToken(token){
    const user = await User.checkToken(token);
    if(user){
        return user;
    }else{
        ctx.throw(501, 'token信息异常');
    }
}

module.exports = {signToke: signToke, checkToken: checkToken};
