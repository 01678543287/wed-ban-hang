const Product = require('../models/Product');
const {mutipleMongooseToObject} = require('../../util/mongoose');


class SiteController {
    // [GET] /me/stored/products
    storedCourses(req, res, next) {
        Product.find({})
            .then(products => {
                res.render('me/stored-products',{
                    products: mutipleMongooseToObject(products)
                });
            })
            .catch(next);
    }

}
module.exports = new SiteController();
