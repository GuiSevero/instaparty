var mongoose = require("mongoose");

module.exports = mongoose.model('InstagramNotification', {
    subscription_id: "string",
    object: "string",
    object_id: "string",
    changed_aspect: "string",
    time: Date,
    url: "string",
    media: mongoose.Schema.Types.Mixed
});