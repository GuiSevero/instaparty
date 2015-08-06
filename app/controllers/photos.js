var mongoose = require("mongoose"),    
    Photo = require('../models/instagram'),
    Log = require('../models/log'),
    config = require('../config');

exports.get_index = function(req, res) {
    Photo.find({}, function(err, documents) {
        if (err) res.send(500);
        res.render('photos/index', {
            photos: documents
        });
    });
};

exports.post_index = function(req, res) {
        console.log(req.body);
        res.render('photos/index', {
            photos: "aba"
        });
};