const Product = require('../models/Product');
const {mutipleMongooseToObject} = require('../../util/mongoose');


class SiteController {
    index(req, res, next) {
        Product.find({})
            .then(products => {
                res.render('home',{
                    products: mutipleMongooseToObject(products)
                });
            })
            .catch(next);
    }
    shopsystem(req, res, next) {
       res.render('shop-system');
    }
    new(req, res, next) {
        res.render('news');
     }
     cart(req, res, next) {
        res.render('cart');
     }
    

}
module.exports = new SiteController();
