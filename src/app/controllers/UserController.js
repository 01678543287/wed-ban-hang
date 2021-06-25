const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const passport = require('passport');
var nodemailer = require('nodemailer');
var verification;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'samab1541@gmail.com',
    pass: '1234567qety'
  }
});


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
        var messages = req.flash('error');
        res.render('user/sign-in', {
            messages: messages,
            hasErrors: messages.length > 0,
        })
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
    //[DELETE] user/:id/force
    forceDelete(req, res, next) {
        User.deleteOne({_id: req.params.id},)
            .then(() => res.redirect('/me/blacklist/user'))
            .catch(next);
    }
    //[PATCH] user/:id/restore
    restore(req, res, next) {
        User.restore({_id: req.params.id},)
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // [GET] user/forgot-password
    forgotPassword(req, res, next){
        res.render('user/forgot-password',{
            hasUsername:false
        });
    }
    // [POST] user/forgot-password
    validPassword(req, res, next){
        if(req.query.hasUsername == 'true' && req.query.hasUser == 'false'){
            User.findOne({username : req.body.username}, function(err, user){
                if(user != null){
                    verification = randomString(6);
                    sendEmail(user.email, verification);
                    user.verification = user.encryptVerification(verification)
                    res.render('user/forgot-password',{
                        hasUser : true,
                        hasUsername: true,
                        username : req.body.username,
                        email : user.email,
                    })
                }
                if(user == null){
                    res.render('user/forgot-password',{
                        hasUser : false,
                        hasUsername : true,
                        username : req.body.username,
                    })
                }
                
            })
        }
        if(req.query.hasUsername == 'true' && req.query.hasUser == 'true'){
            User.findOne({username : req.qurey.username}, function(err, user){
                if(user.validVerification(req.body.verification)){
                    res.render('user/forgot-password',{
                        hasUser :true,
                        hasUsername : true,
                        isValid : true,
                        username : req.query.username,
                    })
                }
                if(!user.validVerification(req.body.verification)){
                    res.render('user/forgot-password',{
                        hasUser :true,
                        hasUsername : true,
                        isValid : false,
                        username : req.query.username,
                    })
                }
            })
        }
        if(req.query.isValid == 'true'){
            user.password = user.encryptPassword(req.params.password);
        }
    }
    //[DELETE] user/:id
    delete(req, res, next) {
        User.delete({_id: req.params.id},)
            .then(() => res.redirect('/me/stored/user'))
            .catch(next);
    }
}

module.exports = new UserController();

function randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function sendEmail(userEmail, verification){
    var mailOptions = {
        from: 'samab1541@gmail.com',
        to: userEmail,
        subject: 'Lấy lại mật khẩu',
        text: 'Mã xác nhận của bạn là: ' + verification + ': '  ,
    };
    if(user != null)
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' );
        }
    });
}