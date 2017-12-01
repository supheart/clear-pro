import Koa from 'koa';
import config from './configs';
import {initLogs} from './init/log';
import session from 'koa-session2';
import Store from './init/store';
import {runRouter} from './router/routes';
import render from 'koa-ejs';
import koaStatic from 'koa-static';
// import koaCors from 'koa-cors'; // 引入服务器支持跨域请求
import path from 'path';

const app = new Koa();
initLogs(app); // 日志处理
app.use(session({
    key: "clear:admin",
    store: new Store()
}));
app.use(koaStatic(__dirname + '/public')); // 静态文件路径设置

// 静态模板处理
render(app, {
    root: path.join(__dirname, 'views'),
    layout: '',
    viewExt: 'html'
});
runRouter(app); 

app.listen(config.port, () => {
    logger.info(`start server, port: ${config.port}`);
});