var local = require("./default");
var resolve = require('path').resolve;

exports.public_dir = resolve(__dirname, '../../public');
exports.view_dir = resolve(__dirname, '../views');


exports.port = process.env.PORT || local.port;

exports.instagram = {
    client_id: process.env.INSTA_APP_ID || local.instagram.client_id,
    client_secret: process.env.INSTA_APP_SECRET || local.instagram.client_secret,
    api: {
        url: "https://api.instagram.com/v1/",
        subscriptions: "https://api.instagram.com/v1/subscriptions",
        tags: "https://api.instagram.com/v1/tags",
        locations: "https://api.instagram.com/v1/locations",
        geographies: "https://api.instagram.com/v1/geographies",
        users: "https://api.instagram.com/v1/users",
        callback_url: "https://instagurizada.herokuapp.com/subscribe"
    }
};

exports.db = {
    mongo_url: process.env.MONGOHQ_URL || local.db.mongo_url
};

exports.cookie = {
    secret: process.env.COOKIE_SECRET || local.cookie.secret
}

exports.google = local.google;
