var express = require('express'),
    querystring = require('querystring'),
    config = require('./config'),
    cookieParser = require('cookie-parser'),
    expressLayouts = require('express-ejs-layouts'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    expressSession = require('express-session'),
    passport = require('passport'),
    MongoStore = require('connect-mongo')(expressSession),
    bodyParser = require('body-parser');

//mongoose.connect(process.env.MONGOHQ_URL || config.db.mongo_url);

var app = express();

app.set('port', config.port);
app.set('views', config.view_dir);
app.set('view engine', 'ejs');
app.set('layout', 'layouts/index'); // defaults to 'layout'
app.set("layout extractScripts", true);

app.use(expressLayouts);
app.use(express.static(config.public_dir));
app.use(expressSession({
    secret: config.cookie.secret,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser(config.cookie.secret));



//Colocar por ultimo
app.use(require('./routes.js'));
module.exports = app;
