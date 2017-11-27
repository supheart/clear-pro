import Router from 'koa-router';

export default () => {
    const routes = new Router({prefix: '/api'});

    routes.get('/menu', (ctx, next) => {
        console.log('start page /api/menu');
        ctx.body = {menu: 'ment text'};
    });

    return routes;
};