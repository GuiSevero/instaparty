var resolve = require('path').resolve;

exports.public_dir = resolve(__dirname, '../../public');
exports.view_dir = resolve(__dirname, '../views');


exports.port = process.env.PORT;

exports.instagram = {
    client_id: process.env.INSTA_APP_ID,
    client_secret: process.env.INSTA_APP_SECRET,
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
    mongo_url: process.env.MONGOLAB_URI
};

exports.cloudinary = {
    url: process.env.CLOUDINARY_URL
}

exports.cookie = {
    secret: process.env.COOKIE_SECRET
}