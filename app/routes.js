var express = require('express')
var router = express.Router()
var controllers = require('./controllers')
var passport = require('passport')
var huia_auth = require('./services/huia_auth')
var LocalStrategy = require('passport-local').Strategy


passport.use(new LocalStrategy(
    function(username, password, done) {
        var user = huia_auth.auth(username, password, function(err, user) {
            return done(null, user)
        })
    }
))

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.get('/login', controllers.login.get_login)
router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/'
    }),
    function(req, res) {
        res.redirect('/')
    })


//Home
router.get('/', controllers.instagram.get_index)

//Photos
router.get('/photos', authorize, controllers.photos.get_index)
router.post('/photos', authorize, controllers.photos.post_index)

//Instagram
router.get('/instagram/', controllers.instagram.get_index)
router.get('/instagram/subscribe', controllers.instagram.get_subscribe)
router.post('/instagram/subscribe', controllers.instagram.post_subscribe)
router.get('/instagram/photos', controllers.instagram.get_photos)
router.get('/instagram/maps', authorize, controllers.instagram.get_maps)
router.post('/instagram/maps', authorize, controllers.instagram.post_maps)
router.get('/instagram/subscriptions', authorize, controllers.instagram.get_subscriptions)
router.post('/instagram/subscriptions', authorize, controllers.instagram.post_subscriptions)
//router.put('/instagram/subscriptions', authorize, controllers.instagram.put_subscriptions)
//router.delete('/instagram/subscriptions', authorize, controllers.instagram.delete_subscriptions)

module.exports = router


function authorize(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
