const Router = require('koa-router');
const auth = require('../controller/auth');
const jwt = require('jsonwebtoken');
const config = require('../../configs');

const router = new Router({prefix: '/api'});
router.get('/menu', async(ctx, next) => {
    const user = await auth.checkToken(ctx.state.user);
    ctx.body = {menu: 'ment text', code: 200, message: 'success', username: user.username};
});

module.exports = {routes: router.routes()};