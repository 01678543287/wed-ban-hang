var express = require('express');
const passport = require('passport');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const UserController = require('../app/controllers/UserController');

router.delete('/:id', isAdmin, UserController.delete);
router.delete('/:id/force', isAdmin, UserController.forceDelete);
router.patch('/:id/restore', isAdmin, UserController.restore);
router.get('/sign-up', notLoggedIn, UserController.create);
router.get('/change-password', isLoggedIn, UserController.changePassword);
router.post('/change-password', isLoggedIn,
    passport.authenticate('local.changePassword', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/change-password',
        failureFlash: true
    })
)
router.post('/sign-up', [
    check('username','Tên đăng nhập phải có ít nhất 5 ký tự').isLength({min:5}),
    check('password', 'Mật khẩu phải có ít nhất 6 ký tự').isLength({min:6}),
    check('username','Tên đăng nhập không được quá 30 ký tự').isLength({max:30}),
    check('email', 'Địa chỉ email không hợp lệ').isEmail(),
    check('username')
        .custom(value => !/\s/.test(value))
        .withMessage('Tên đăng nhập không được chứa khoảng trắng'),
    // check('password', 'Mật khẩu hiện không đủ mạnh').isStrongPassword(),
    check('username','Tên đăng nhập chưa được điền').not().isEmpty({ignore_whitespace:true }),
    check('name', 'Họ và tên chưa được điền').not().isEmpty({ignore_whitespace:true} ).trim(),
], function(req, res, next){
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
},passport.authenticate('local.signup', { 
    successRedirect: '/',
    failureRedirect: '/user/sign-up',
    failureFlash: true }));

router.get('/sign-in', notLoggedIn, UserController.signIn);
router.post('/sign-in',
    passport.authenticate('local.signin', {successRedirect: '/user/profile',
        failureRedirect: '/user/sign-in',
        failureFlash: true
})
);
router.get('/logout', isLoggedIn,UserController.logOut);
router.get('/profile', isLoggedIn, UserController.profile);
router.get('/forgot-password', UserController.forgotPassword);
router.post('/forgot-password', UserController.validPassword);
router.use('/', notLoggedIn, function(req, res, next){
    res.redirect('/user/sign-in');
})



module.exports = router;

function notLoggedIn(req, res, next){
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/user/sign-in');
}

function isAdmin(req, res, next){
    if(req.isAuthenticated() && (req.user.isAdmin || (req.user.username === 'admin'))){
        return next();
    }
    res.redirect('/');
}