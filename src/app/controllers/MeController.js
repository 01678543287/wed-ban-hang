const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const Category = require('../models/Category');
const {mutipleMongooseToObject} = require('../../util/mongoose');
const {mutipleOrderToRevenue} = require('../../util/mongoose');


class MeController {
    //[GET] /me/stored/products
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
        var day = date.getDay();
        var distanceDay = 0;
        var distanceMonth = 0;
        var distanceYear = 0;
        if(req.query.type == 'year'){
            if(req.query.year != null) year = req.query.year;
            month = 0;
            day = 0;
            distanceYear = 1;
        }
        else if(req.query.type == 'month' || Object.keys(req.query).length == 0){
            if(req.query.year != null) year = req.query.year;
            if(req.query.month != null) month = req.query.month - 1;
            day = 0;
            distanceMonth = 1;
        }
        else if(req.query.type == 'day'){
            if(req.query.year != null) year = req.query.year;
            if(req.query.month != null) month = req.query.month - 1;
            if(req.query.day != null) day = req.query.day - 1; 
            distanceDay = 1;
        }
        Order.find({updatedAt : {
            "$gte": new Date(year, month , day, ), 
            "$lt": new Date(year + distanceYear, month + distanceMonth, day + distanceDay)
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
    //[GET] /me/stored/category
    storedCategory(req, res, next) {
        Promise.all([Category.find({}), Category.countDocumentsDeleted()])
            .then(([categorys, deletedCount]) => 
                res.render('me/stored-categorys', {
                    deletedCount,
                    categorys: mutipleMongooseToObject(categorys)
                })
            )
            .catch(next);
    }
    //[GET] /me/trash/categorys
    trashCategory(req, res, next) {
        Category.findDeleted({})
            .then(categorys => res.render('me/trash-categorys', {
                categorys: mutipleMongooseToObject(categorys)
            }))
            .catch(next);
    }
    // [GET] /me
    home(req, res, next){
        res.render('me');
    }

}
module.exports = new MeController();
