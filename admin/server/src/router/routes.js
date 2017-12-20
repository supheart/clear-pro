const Router = require('koa-router');
const AuthRouter = require('./auth');
const SystemRouter = require('./system');



const runRouter = function(app) {
    const router = new Router();
    
    router.get('/', (ctx, next) => {
        ctx.body = 'Hello world, page /, Milo';
    });
    
    router.get('/index', async (ctx, next) => {
        // let n = ctx.session.views || 0;
        // ctx.session.views = ++n;
        // logger.info(ctx, ctx.session);
        // ctx.cookies.set('bb', 'cccc', {path: '/index'});
        await ctx.render('index', {name: 'Hello milo! views'});
    });
    
    router.get('*', (ctx, next) => {
        ctx.body = 'Hello world, page *, Milo'  ;
    });

    app.use(AuthRouter.routes);
    app.use(SystemRouter.routes);
    app.use(router.routes());
    app.use(router.allowedMethods()); // 允许一个接口有不同的method进行请求，如get，post
};

module.exports = {runRouter: runRouter};