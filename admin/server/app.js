import Koa from 'koa';
import {initLogs} from './init/log';
import {runRouter} from './router/routes';
const render = require('koa-ejs');
const path = require('path');

const app = new Koa();

// 日志处理
initLogs(app);

// 静态模板处理
render(app, {
    root: path.join(__dirname, 'views'),
    layout: '',
    viewExt: 'html'
});
runRouter(app); 

console.log('start server, port: 8015');
app.listen(8015);