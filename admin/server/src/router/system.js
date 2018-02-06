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

router.post('/menu/list', async(ctx, next) => {
    let menuCtrl = new Menu();
    let listResult = await menuCtrl.getList();
    ctx.body = listResult;
});

router.get('/menu/:id', async(ctx, next) => {
    let menuCtrl = new Menu();
    let oneResult = await menuCtrl.getOne({name: ctx.params.id});
    ctx.body = oneResult;
});

router.post('/menu/one', async(ctx, next) => {
    let menuCtrl = new Menu();
    let oneResult = await menuCtrl.getOne();
    ctx.body = oneResult;
});

module.exports = {routes: router.routes()};