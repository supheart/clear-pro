const Koa = require('koa');
const path = require('path');
const config = require('./configs');                            // 配置文件
const initLogs = require('./src/init/log').initLogs;            // 日志配置
const jwt = require('./src/init/kwt-verify');                                 // 处理请求token中间件
const session = require('koa-session');                         // session处理
const runRouter = require('./src/router/routes').runRouter;     // 路由配置
const render = require('koa-ejs');                              // ejs静态模版配置
const koaStatic = require('koa-static');                        // 静态文件配置
const bodyparser = require('koa-bodyparser');                   // 解析参数报文配置
const kcors = require('kcors');                                 // 引入服务器支持跨域请求
const mongoose = require('mongoose');                           // 数据库配置

// 设置mongo db 配置内容
mongoose.Promise = Promise;
mongoose.connect(config.mongodb, {useMongoClient:true});

const app = new Koa();
app.use(async (ctx, next) => {
    try {
        //开始进入到下一个中间件
        await next();
    } catch (error) {
        // 这里捕捉所有流程抛出的错误
        if (typeof(error) === 'string') {
            throw(new Error(error));
        }
        throw(error);
    }
});
// 日志处理
initLogs(app);
// 自动解析请求报文
app.use(bodyparser({enableTypes: ['json', 'form', 'text']}));
// 允许跨域访问
// app.use(kcors());
// 解析jwt内容
app.use(jwt({secret: config.jwtSecret}).unless({path: config.unlessJwt}));
// 设置session
app.keys = [config.appKey];
const sessConfig = {key: config.sessionKey, maxAge: 86400000, overwrite: true, httpOnly: true, signed: true, rolling: false};
app.use(session(sessConfig, app));
// 设置静态文件
app.use(koaStatic(__dirname + '/public')); // 静态文件路径设置
// 静态模板处理
render(app, {root: path.join(__dirname, 'views'), layout: '', viewExt: 'html'});
// 路由处理
runRouter(app);

app.listen(config.port, () => {
    logger.info(`start server, port: ${config.port}`);
});