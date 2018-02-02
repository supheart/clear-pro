const Router = require('koa-router');
const Menu = require('../controller/system/menu');

const router = new Router({prefix: '/api'});
router.get('/menu/add', async(ctx, next) => {
    let menuObj = {
        name: '系统功能2',
        link: '#',
        type: 1
    }
    let menuCtrl = new Menu();
    let addMenuResult = await menuCtrl.addMenu(menuObj);
    ctx.body = addMenuResult;
});

module.exports = {routes: router.routes()};