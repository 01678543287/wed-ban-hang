const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const Revenue = require('../models/Revenue');
const xl = require('excel4node');
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
        var day = date.getDate();
        
        var distanceDay = 0;
        var distanceMonth = 0;
        var distanceYear = 0;
        var date_output="";//xuat ngay cua  bang doanh thu
        if(req.query.type == 'year'){
            if(req.query.year != null) year = Number(req.query.year);
            month = 0;
            day = 0;
            distanceYear = 1;
            date_output="năm "+year;
        }
        else if(req.query.type == 'month' || Object.keys(req.query).length == 0){
            if(req.query.year != null) year = Number(req.query.year);
            if(req.query.month != null) month = Number(req.query.month) - 1;
            day = 0;
            distanceMonth = 1;
            date_output="tháng "+Number(month+1) + "/" +year ;
        }
        else if(req.query.type == 'day'){ 
            if(req.query.year != null) year = Number(req.query.year);
            if(req.query.month != null) month = Number(req.query.month) - 1;
            if(req.query.day != null) day = Number(req.query.day) ;
            distanceDay = 1;
            date_output="ngày " +day+ "/"+Number(month+1) + "/" +year ;
        }
       
        Order.find({updatedAt : {
            "$gte": new Date(year, month , day ),  // xet tu ngay hien tai den hom sau nhe 
            "$lt": new Date(Number(year) + Number(distanceYear), Number(month) + Number(distanceMonth), Number(day) + Number(distanceDay))// Kieu du lieu k phai so nen thanh ra noi chuoi
            }
        })
            .then(orders => res.render('me/statistics-revenue', {
                output: date_output,
                orders : mutipleMongooseToObject(orders),
                revenue : mutipleOrderToRevenue(orders)
            }))
            .catch(next);
    }
    // [GET] user/admin/create
    createdAdminAccount(req, res, next){
        res.render('me/created-admin-account')
    }
    // [POST] user/admin/create
    storedAdminAccount(req, res, next){
        User.findOneWithDeleted({ 'username': username }, function(err, user) {
            if (err) { return done(err); }
            if (user) {
                res.render('me/created-admin-account',{
                    message : 'Tên đăng nhập đã được sử dụng.'
                })
            }
            var newUser= new User();
            newUser.username = req.body.username;
            newUser.password = newUser.encryptPassword(req.body.password);
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.phonenumber = req.body.phonenumber;
            newUser.isAdmin = true;
            newUser.save(function(err, result){
            if(err){
                return done(err)
            }
            res.render('me/created-admin-account',{
                message : 'Tạo tài khoản admin thành công'
            })
           })
        })
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
    // [GET] /me/statistics/revenue/excel
    exportStatisticsRevenue(req, res, next){
        const date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        
        var distanceDay = 0;
        var distanceMonth = 0;
        var distanceYear = 0;
        if(req.query.type == 'year'){
            if(req.query.year != null) year = Number(req.query.year);
            month = 0;
            day = 0;
            distanceYear = 1;
        }
        else if(req.query.type == 'month' || Object.keys(req.query).length == 0){
            if(req.query.year != null) year = Number(req.query.year);
            if(req.query.month != null) month = Number(req.query.month) - 1;
            day = 0;
            distanceMonth = 1;
        }
        else if(req.query.type == 'day'){ 
            if(req.query.year != null) year = Number(req.query.year);
            if(req.query.month != null) month = Number(req.query.month) - 1;
            if(req.query.day != null) day = Number(req.query.day) ;
            distanceDay = 1;
        }
       
        Order.find({updatedAt : {
            "$gte": new Date(year, month , day ), 
            "$lt": new Date(year + distanceYear, month + distanceMonth, day + distanceDay)
            }
        },function(err, order){
            if(order == null) return;
            var wb = new xl.Workbook();
            var ws = wb.addWorksheet('Sheet 1');
            var style = wb.createStyle({
            font: {
                color: '#000000',
                size: 12,
            },
            });
            if(req.query.type != 'year'){
                ws.cell(1,1).string('STT').style(style);
                ws.cell(1,2).string('Tên khách hàng').style(style);
                ws.cell(1,3).string('Địa chỉ email').style(style);
                ws.cell(1,4).string('Số điện thoại').style(style);
                ws.cell(1,5).string('Ngày mua').style(style);
                ws.cell(1,6).string('Thành tiền').style(style);

                for(var i= 0; i<order.length; i++){
                    ws.cell(i+2, 1).number(i+1);
                    ws.cell(i+2, 2).string(order[i].nameKH).style(style);
                    ws.cell(i+2, 3).string(order[i].email).style(style);
                    ws.cell(i+2, 4).string(order[i].phone).style(style);
                    ws.cell(i+2, 5).string(order[i].createdAt.toString()).style(style);
                    ws.cell(i+2, 6).number(order[i].cart.totalPrice).style(style);
                }
            }
            wb.write('Excel.xlsx', res);
        })
    }
    // [GET] /me/total/revenue/excel
    exportTotalRevenue(req, res, next){
        const date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        
        var distanceDay = 0;
        var distanceMonth = 0;
        var distanceYear = 0;
        if(req.query.type == 'year'){
            if(req.query.year != null) year = Number(req.query.year);
            month = 0;
            day = 0;
            distanceYear = 1;
        }
        else if(req.query.type == 'month' || Object.keys(req.query).length == 0){
            if(req.query.year != null) year = Number(req.query.year);
            if(req.query.month != null) month = Number(req.query.month) - 1;
            day = 0;
            distanceMonth = 1;
        }
        else if(req.query.type == 'day'){ 
            if(req.query.year != null) year = Number(req.query.year);
            if(req.query.month != null) month = Number(req.query.month) - 1;
            if(req.query.day != null) day = Number(req.query.day) ;
            distanceDay = 1;
        }
       
        Revenue.find({date : {
            "$gte": new Date(year, month , day ), 
            "$lt": new Date(year + distanceYear, month + distanceMonth, day + distanceDay)
            },
            type: req.query.type
        },function(err, revenue){
            if(revenue == null) return;
            var wb = new xl.Workbook();
                
            var ws = wb.addWorksheet('Sheet 1');
        
            var style = wb.createStyle({
            font: {
                color: '#000000',
                size: 12,
            },
            });
            ws.cell(1,1).string('STT').style(style);
            ws.cell(1,2).string('Sản Phẩm').style(style);
            ws.cell(1,3).string('Số lượng').style(style);
            ws.cell(1,4).string("Tổng tiền").style(style);
            for(var i= 0; i<revenue[0].products.length; i++){
                ws.cell(i+2, 1).number(i+1);
                // var product;
                var index = i;
                (function(index){
                Product.findById(revenue[0].products[1], function(err, product){
                    ws.cell(index+2, 2).string(product.name).style(style);
                });
                })(index)
                ws.cell(i+2, 3).number(revenue[0].amounts[i]).style(style);
            }
            ws.cell(2,4).number(revenue[0].money)
            setTimeout(function(){
                wb.write('Excel.xlsx', res);
            }, 2000)
            
        })
    }
    //[GET] /me/warehouse
    warehouse(req,res,next)
    {
        Product.find({id: req.param._id})
        .then(products => res.render('me/warehouse', {
            products: mutipleMongooseToObject(products)
        }))
        .catch(next);
    }
}
module.exports = new MeController();

