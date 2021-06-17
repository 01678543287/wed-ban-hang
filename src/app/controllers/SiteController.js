const Product = require('../models/Product');
const {mutipleMongooseToObject} = require('../../util/mongoose');


class SiteController {
    //[GET] /
    index(req, res, next) {
        Product.find({})
            .then(products => {
                res.render('home',{
                    products: mutipleMongooseToObject(products)
                });
            })
            .catch(next);
    }
    //[GET] /shop-system
    shopsystem(req, res, next) {
       res.render('shop-system');
    }
    //[GET] /news
    new(req, res, next) {
        res.render('news');
    }
     //[GET] /cart
    cart(req, res, next) {
        res.render('cart');
    }
     //[GET] /search
    search(req, res, next) {
        res.render('search');
    }

}
module.exports = new SiteController();
