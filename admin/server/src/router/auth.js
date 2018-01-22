const Router = require('koa-router');
const User = require('../../src/models/user');
const auth = require('../../src/controller/auth');
const bmp = require('../utils/bmp');

const router = new Router();

router.get('/sys/code', async(ctx, next) => {
    let img = bmp.makeCapcha();
    ctx.type = 'image/bmp';
    logger.info(ctx.session, ctx.session.code, 'session');
    ctx.session.code = img.code;
    ctx.body = img.img.getFileData();
});

router.get('/login', async (ctx, next) => {
    await ctx.render('login', {name: '', salt: 'pwdsalt'});
});

router.post('/login', async (ctx, next) => {
    let params = ctx.request.body;
    
    await ctx.render('index', {name: 'Hello milo! views'});
});

router.post('/api/login', async(ctx, next) => {
    const {username, password, vcode} = ctx.request.body;
    
    if(!ctx.session.code || ctx.session.code.toLocaleLowerCase() !== vcode.toLocaleLowerCase()) {
        ctx.body = {
            code: 423,
            message: '验证码错误'
        }
        return;
    }
    const user = await User.findByName(username);
    const isMatch = user ? user.comparePassword(password) : false;
    if(!isMatch){
        ctx.body = {
            code: 423,
            message: '用户名或密码错误！!'
        }
        return;
    }
    const token = auth.signToke(user.id, user.appSecret);
    ctx.session.code = '';
    ctx.body = {
        code: 200,
        message: '登录成功!',
        token: token
    }
});

router.get('/api/verifyUser', async(ctx, next) => {
    const {username} = ctx.request.body;

    let user = await User.findByName(username);
    if(user) {
        ctx.body = {
            code: 201,
            message: '用户已存在'
        };
    }else {
        ctx.body = {
            code: 200,
            message: '用户名正确'
        };
    }
});

router.get('/register', async(ctx, next) => {
    await ctx.render('register', {name: '', salt: 'pwdsalt'});
});

router.post('/api/register', async(ctx, next) => {
    const {username, password} = ctx.request.body;

    let user = await User.findByName(username);
    if(user) {
        ctx.body = {
            code: 201,
            message: '用户已存在'
        };
        return;
    }

    user = new User({
        username: username,
        password: password
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