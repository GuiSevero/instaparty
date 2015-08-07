var http = require('http'),
    https = require("https"),
    request = require("request"),
    mongoose = require("mongoose"),
    querystring = require('querystring'),
    _ = require('underscore'),
    Photo = require('../models/photo'),
    Log = require('../models/log'),
    config = require('../config'),
    io = require('socket.io'),
    pluralize = require('pluralize'),
    instagram_api = require('../services/instagram_api');

mongoose.connect(config.db.mongo_url);


exports.get_maps = function(req, res) {
    if(req.query['hub.challenge'])
        return res.send(req.query['hub.challenge']);
    res.render('instagram/maps');
}


exports.post_maps = function(req, res) {

    // request.body is a JSON already parsed
    req.body.forEach(function(notificationOjb) {


        https.get({
            host: 'api.instagram.com',
            path: '/v1/' + pluralize(notificationOjb.object) + '/' + notificationOjb.object_id + '/media/recent' +
                '?' + querystring.stringify({
                    client_id: config.instagram.client_id,
                    count: 1
                }),
        }, function(res) {

            var raw = "";

            res.on('data', function(chunk) {
                raw += chunk;
            });

            res.on('end', function() {

                var response = JSON.parse(raw);
                if (response['data'].length > 0) {

                    for (i in response.data) {
                        var instagram_notif = new Photo({
                            src: response.data[i].images.standard_resolution.url,
                            url: response.data[i].images.standard_resolution.url,
                            width: 640,
                            height: 480,
                            type: "instagram",
                            media: {
                              notification: notificationOjb,
                              data: response.data[i]
                            }
                        });
                        global.io.sockets.emit('photo_map', instagram_notif);

                    } //endfor
                }
            });

        });
    });
    res.send(200);
}


exports.get_subscriptions = function(req, res) {

    instagram_api.get_subscriptions(function(err, httpResp, body) {
        res.render('instagram/subscriptions', {
            status: {
                code: httpResp.statusCode,
                message: httpResp.statusMessage,
            },
            meta: body.meta,
            subscriptions: httpResp.statusCode == 200 ? body.data : []
        });
    });
}

exports.post_subscriptions = function(req, res) {

    instagram_api.post_subscription(req.body, function(error) {

        if (error)
            return res.send(500, error);

        instagram_api.get_subscriptions(function(err, httpResp, body) {
            res.render('instagram/subscriptions', {
                status: {
                    code: httpResp.statusCode,
                    message: httpResp.statusMessage,
                },
                meta: body.meta,
                subscriptions: httpResp.statusCode == 200 ? body.data : []
            });
        });
    });
}

exports.get_subscribe = function(req, res) {
    global.io.sockets.emit('test', "test");
    res.send(req.query['hub.challenge']);
};


exports.post_subscribe = function(request, response) {
  if(!request.body){
    console.log("Error 400 - Body not ok");
    return send(400, body);
  }

  var canBroadCast = false;

    var log = new Log({
        data: request.body
    })
    log.save(function(err) {
        if (err) console.log(err);
    })

    // request.body is a JSON already parsed
    request.body.forEach(function(notificationOjb) {
        // Every notification object contains the id of the geography
        // that has been updated, and the photo can be obtained from
        // that geography
        var url_path = '/v1/' + pluralize(notificationOjb.object) + '/' + notificationOjb.object_id + '/media/recent' +
            '?' + querystring.stringify({
                client_id: config.instagram.client_id,
                count: 3
            });
      console.log(url_path);
        https.get({
            host: 'api.instagram.com',
            path: url_path,
        }, function(res) {

            var raw = "";

            res.on('data', function(chunk) {
                raw += chunk;
            });

            // When the whole body has arrived, it has to be a valid JSON, with data,
            // and the first photo of the date must to have a location attribute.
            // If so, the photo is emitted through the websocket
            res.on('end', function() {

                var response = JSON.parse(raw);
                if (response['data'].length > 0) {

                    for (i in response.data) {

                        var instagram_notif = new Photo({
                            src: response.data[i].images.standard_resolution.url,
                            url: response.data[i].images.standard_resolution.url,
                            width: response.data[i].images.standard_resolution.width,
                            height: response.data[i].images.standard_resolution.height,
                            type: "instagram",
                            media: {
                              notification: notificationOjb,
                              data: response.data[i]
                            }
                        });

                        //Previne duplicatas
                        Photo.find({
                            url: response.data[i].images.standard_resolution.url
                        }, function(err, documents) {
                            if (err) res.send(500);
                            if (documents.length == 0) {
                                instagram_notif.save(function(err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        canBroadCast = true;
                                        console.log(instagram_notif);
                                    }
                                });

                            }
                        });

                    } //endfor

                    //Notifica que há novas fotos
                    if(canBroadCast)
                      global.io.sockets.emit('photo', instagram_notif);
                }
            });

        });
    });
    response.send(200);
};

exports.get_index = function(req, res) {
    Photo.find({}, function(err, documents) {
        if (err) res.send(500);
        res.render('instagram/index', {
            photos: documents
            , layout: false
        });
    });
};

exports.get_photos = function(req, res) {
    Photo.find({}, function(err, documents) {
        if (err) res.send(500);

        res.send(documents);
    });
};
