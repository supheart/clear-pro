import Router from 'koa-router';

export default () => {
    const routes = new Router({prefix: '/api'});

    routes.get('/menu', (ctx, next) => {
        ctx.body = {menu: 'ment text'};
    });

    return routes;
};