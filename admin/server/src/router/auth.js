const Router = require('koa-router');
const User = require('../../src/models/user');
const auth = require('../../src/controller/auth');

const router = new Router({prefix: '/api'});
router.post('/login', async(ctx, next) => {
    const {userName, passwd} = ctx.request.body;
    
    try{
        const user = await User.findByName(userName);
        const isMatch = user ? user.comparePassword(passwd) : false;
        if(!isMatch){
            ctx.body = {
                code: 423,
                message: '用户名或密码错误！!'
            }
            return;
        }
        const token = auth.signToke(user.id, user.appSecret);
        
        ctx.body = {
            code: 200,
            message: '登录成功!',
            token: token
        }
    }catch(e){
        ctx.throw(e)
    }
});

router.post('/register', async(ctx, next) => {
    const {userName, passwd} = ctx.request.body;
    
    let user = new User({
        username: userName,
        password: passwd
    });

    let result = await user.save();

    ctx.body = {
        code: 200,
        message: '注册成功！'
    };
});

router.post('/userinfo', async(ctx, next) => {
    const user = await auth.checkToken(ctx.state.user);

    ctx.body = {
        code: 200,
        message: '注册成功！',
        data: user
    };
});

module.exports = {routes: router.routes()};