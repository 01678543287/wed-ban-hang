const Account = require('../models/Account');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const csrf = require('csurf');
const csrfProtection = csrf();

class SiteController{
    // [Get] /user/register
    create(req, res, next) {
        res.render('user/create', {csrfToken : req.csrfToken});
    }

    // [Get] /user/register
    profile(req, res, next){
        res.render('/user/profile');
    }

    // [POST] /register
    // store(req, res, next) {
    //     if(Account.exists({email : req.body.email})){
    //         // alert("email bị trùng. Vui lòng đăng ký lại!");
    //         res.redirect('/user/sign-up');
    //     }
    //     console.log(req.body.email);
    //     if(Account.exists({username : req.body.username})){
    //         // alert("Tên đăng nhập bị trùng. Vui lòng đăng ký lại!");/
    //         res.redirect('/user/sign-up');
    //     }
    //     if(Account.exists({phoneNumber : req.body.phoneNumber})){
    //         // alert("Số điện thoại bị trùng. Vui lòng đăng ký lại!");
    //         res.redirect('/user/sign-up');
    //     }
    //     if(Account.exists({email : req.body.email})){
    //         // alert("email bị trùng. Vui lòng đăng ký lại!");
    //         res.redirect('/user/sign-up');
    //     }
    //     const account = new Account(req.body);
    //     console.log(req.body.email);
    //     Account
    //         .create(req.body)
    //         .then(() => res.redirect('/'))
    //         .catch((error) => {
    //             // alert("Đăng ký tài khoản không thành công. Vui lòng đăng ký lại!")
    //             res.redirect('/register')
    //         });
    // }

    //[POST] //register

}

module.exports = new SiteController();
