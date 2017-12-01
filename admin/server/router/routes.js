import Router from 'koa-router';
import SystemRouter from './system';



export function runRouter(app) {
    const router = new Router();
    
    router.get('/', (ctx, next) => {
        ctx.session.aa = '123';
        ctx.session.bb = 223;
        logger.info(ctx.cookie);
        ctx.cookie.set('dd',21312);
        ctx.body = 'Hello world, page /, Milo';
    });
    
    router.get('/index', async (ctx, next) => {
        delete ctx.session.bb;
        await ctx.render('index', {name: 'Hello milo!'});
    });
    
    router.get('*', (ctx, next) => {
        logger.info(ctx, ctx.session, ctx.session.bb);
        ctx.body = 'Hello world, page *, Milo';
    });

    const systemRouter = new SystemRouter();
    app.use(systemRouter.routes());
    app.use(router.routes());
    app.use(router.allowedMethods()); // 允许一个接口有不同的method进行请求，如get，post
};