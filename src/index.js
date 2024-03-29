const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser');
const { dirname } = require('path');
const app = express();
const port = 80;
require('./config/passport');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cron = require('node-cron');
const moment = require('moment');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const UpdateController = require('./app/controllers/UpdateController');
app.use(session({
    secret: 'adsa897adsa98bs',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 },
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next){
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.success_messages = req.flash('success');
    res.locals.error_messages = req.flash('error');
    next();
});
const route = require('./routes');


//Connect to DB
const db = require('./config/db');
db.connect();
//use 
app.use(methodOverride('_method'));
//logo img
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//update every day when 00:00
cron.schedule('0 0 1 * *', UpdateController.updateDatabase);

//HTTP logger
//app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            notEqual :function(arg1, arg2, options) {
                 return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
                } ,
            equal :function(arg1, arg2, options) {
                 return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
                } ,
            
            sum: (a,b) => a + b,
            formatDate : (date) => moment(date).format("DD/MM/YYYY")
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
