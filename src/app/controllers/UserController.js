const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const passport = require('passport');


class UserController {
    // [GET] /user/sign-up
    create(req, res, next){
        const messages = req.flash('error');

        res.render('user/sign-up', {
            messages:messages,
            hasErrors: messages.length > 0,
        })
    }
    // [POST] /user/sign-up
    store(req, res, next){
        var messages = req.flash('error');
        const result= validationResult(req);
        var errors=result.errors;
        if (!result.isEmpty()) {
            var messages = [];
            errors.forEach(function(error){
                messages.push(error.msg);
            });
            res.render('user/sign-up',{
                messages: messages,
                hasErrors: messages.length > 0,
            });
            }else{
                next();
            }
    }
    // [GET] /user/sign-in
    signIn(req, res, next){
        res.render('user/sign-in')
    }
    //[GET] /user/log-out
    logOut(req, res, next){
        req.logout();
        res.redirect('/');
    }
    // [GET] /user/profile
    profile(req, res, next){
        // console.log(req.session.passport.user);
        User.findById(req.session.passport.user)
        .then((User) =>
            res.render('user/profile', {
                User: mongooseToObject(User),
            }),
        )
        .catch(next);
        // res.render('user/profile')
    }
    // [GET] /user/change-password
    changePassword(req, res, next){
        res.render('user/change-password')
    }
    // [POST] /user/change-password
    changePasswordConfirm(req, res, next){
        User.findById(req.session.passport.user)
    }

}
module.exports = new UserController();
