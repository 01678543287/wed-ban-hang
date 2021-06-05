const siteRouter = require('./site');
const productsRouter = require('./products');
const meRouter = require('./me');

function route(app) {
    app.use('/products', productsRouter);
    app.use('/me', meRouter);

    app.use('/', siteRouter);
}




module.exports = route;