import Koa from 'koa';
import {runRouter} from './router/routes';
const render = require('koa-ejs');
const path = require('path');

const app = new Koa();
render(app, {
    root: path.join(__dirname, 'views'),
    layout: '',
    viewExt: 'html',
    cache: false,
    debug: true
});
runRouter(app);

console.log('start server, port: 8015');
app.listen(8015);