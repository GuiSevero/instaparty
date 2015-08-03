exports.get_login = function(req, res) {
    res.render('login/index', {
        user: req.user
    })
}
