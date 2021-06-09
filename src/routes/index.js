const siteRouter = require('./site');
const productsRouter = require('./products');
const meRouter = require('./me');
const cartRouter = require('./cart');
const userRouter = require('./user')
const checkoutRouter = require('./checkout');

function route(app) {
    // app.use('/', userRouter);
    app.use('cart', cartRouter);
    app.use('/checkout', checkoutRouter);
    app.use('/products', productsRouter);
    app.use('/me', meRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);
}




module.exports = route;