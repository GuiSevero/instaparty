var request = require('request');
var config = require('../config');


exports.get_subscriptions = function(fn) {

    var url = config.instagram.api.subscriptions + '?client_id=' + config.instagram.client_id + '&client_secret=' + config.instagram.client_secret;

    request.get({
        url: config.instagram.api.subscriptions,
        json: true,
        qs: {
            client_secret: config.instagram.client_secret,
            client_id: config.instagram.client_id
        }
    }, function(error, response, response_body) {
        return fn(error, response, response_body);
    });
}

exports.post_subscription = function(params, fn) {

    params.client_id = config.instagram.client_id;
    params.client_secret = config.instagram.client_secret;
    params.aspect = "media";
    params.callback_url = params.callback_url || config.instagram.api.callback_url;


    request.post({
        url: config.instagram.api.subscriptions,
        form: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Huia-Labs'
        }
    }, function(error, response, response_body) {
        return fn(error, response, response_body);
    });
}

exports.delete_subscription = function(subscription_id, fn) {

    var url = [
        config.instagram.api.subscriptions,
        '?client_id=',
        config.instagram.client_id,
        '&client_secret=',
        config.instagram.client_secret,
        '&id=',
        subscription_id
    ].join('');

    request.del(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Huia-Labs'
        }
    }, function(error, response, response_body) {
        return fn(error, response, response_body);
    });
}
