const Product = require('../models/Product');
const {mutipleMongooseToObject} = require('../../util/mongoose');


class SiteController {
    //[GET] /me/storedproducts
    storedProducts(req, res, next) {
        Promise.all([Product.find({}), Product.countDocumentsDeleted()])
            .then(([products, deletedCount]) => 
                res.render('me/stored-products', {
                    deletedCount,
                    products: mutipleMongooseToObject(products)
                })
            )
            .catch(next);
    }
    //[GET] /me/trash/products
    trashProducts(req, res, next) {
        Product.findDeleted({})
            .then(products => res.render('me/trash-products', {
                products: mutipleMongooseToObject(products)
            }))
            .catch(next);
    }

}
module.exports = new SiteController();
