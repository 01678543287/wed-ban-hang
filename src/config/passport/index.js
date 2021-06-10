// config/passport.js
// load các module
var passport = require('passport');
// load  user model
var User = require('../../app/models/User');
var LocalStrategy = require('passport-local').Strategy;

// passport session setup

// used to serialize the user for the session
passport.serializeUser(function(user, done){
    done(null, user.id);
})
 // used to deserialize the user
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    })
})
// local sign-up
passport.use('local.signup',new LocalStrategy({
    usernameField:'username',
    passwordField:'password',
    // emailField: 'email',
    // phonenumberField: 'phonenumber',
    passReqToCallback:true
},function(req, username, password, done) {
 User.findOne({ 'username': username }, function(err, user) {
        if (err) { return done(err); }
        if (user) {
          return done(null, false, { message : 'Tên đăng nhập đã được sử dụng.'})
        }
       var newUser= new User();
       newUser.username = username;
       newUser.password = newUser.encryptPassword(password);
       newUser.name = req.body.name;
       newUser.email = req.body.email;
       newUser.phonenumber = req.body.phonenumber;
      //  newUser.name = name;
      //  newUser.email = email;
      //  newUser.phonenumber = phonenumber;
       newUser.save(function(err, result){
         if(err){
           return done(err)
         }
         return done(null, newUser);
       })
      });
    }
  ));
// local sign-in
  passport.use('local.signin',new LocalStrategy({
   usernameField:'username',
   passwordField:'password',
   passReqToCallback:true
},function(req, username, password,done) {
  
User.findOneWithDeleted({ 'username': username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message : 'Sai tên đăng nhập hoặc mật khẩu'})
      }
      if(!user.validPassword(password)){
          return done(null,false,{message:'Sai tên đăng nhập hoặc mật khẩu'})
      }
      if(user.deletedAt != null){
        return done(null, false, {message : 'Tài khoản hiện đã bị khóa. Vui lòng liên hệ shop'})
      }
      return done(null, user);
     });
   }
 ));    
 // local change-password
 passport.use('local.changePassword', new LocalStrategy({
   usernameField : 'newPassword',
   passwordField: 'password',
   passReqToCallback : true
 }, function(req, username, password, done){
   User.findById(req.session.passport.user, function(err, user){
     if(err) {
       return done(err);
      }
     if (!user.validPassword(password)){
       return done(null, false, {message: 'Sai mật khẩu'})
       
     }
     const newUser = user;
     newUser.password = newUser.encryptPassword(username);
     User.findByIdAndUpdate(user._id, newUser)
     newUser.save();
     return done(null, user);
   })
 }))