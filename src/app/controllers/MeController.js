const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const {mutipleMongooseToObject} = require('../../util/mongoose');
const {mutipleOrderToRevenue} = require('../../util/mongoose');


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
    // [GET] /me/statistics/reverues
    statisticsRevenue(req, res, next){
        const date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        if(Object.keys(req.query).length !== 0){
            year = req.query.year;
            month = req.query.month - 1;
        }
        Order.find({updatedAt : {
            "$gte": new Date(year, month , 0, ), 
            "$lt": new Date(year, month + 1, 0)
            }
        })
            .then(orders => res.render('me/statistics-revenue', {
                month: month,
                orders : mutipleMongooseToObject(orders),
                revenue : mutipleOrderToRevenue(orders)
            }))
            .catch(next);
    }
    //[GET] /me/stored/users
    storedUsers(req, res, next) {
        Promise.all([User.find({}), User.countDocumentsDeleted()])
            .then(([user, deletedCount]) => 
                res.render('me/stored-users', {
                    deletedCount,
                    user: mutipleMongooseToObject(user)
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
    //[GET] /me/blacklist/users
    blacklistUser(req, res, next) {
        User.findDeleted({})
            .then(user => res.render('me/blacklist-users', {
                user: mutipleMongooseToObject(user)
            }))
            .catch(next);
    }
    // [GET] /me
    home(req, res, next){
        res.render('me');
    }

}
module.exports = new SiteController();
