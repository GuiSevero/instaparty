var mongoose = require("mongoose"),
    Photo = require('../models/photo'),
    Log = require('../models/log'),
    config = require('../config');

var cloudinary = require('cloudinary');


var _photos = [];

exports.get_index = function(req, res) {
    Photo.find({}, function(err, documents) {
        _photos = documents
        if (err) res.send(500);
        res.render('photos/index', {
            photos: documents
        });
    });
};

exports.post_index = function(req, res) {
  var err = null;
  req.files.forEach(function(file) {
      cloudinary.uploader.upload(
          file.path,
          function(result) {
              var photo = new Photo({
                  src: result.url,
                  url: result.url,
                  width: result.width,
                  height: result.height,
                  type: "upload",
                  media: result
              });

              _photos.push(photo);
              photo.save(function(e) { err = e });
          });
  });
  if(err != null) return send(500, err);
  res.render('photos/index', {
      photos: _photos
  });
};
