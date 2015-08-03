var mongoose = require("mongoose");

module.exports = mongoose.model('Subscription', {
    subscription_id: "string",
    object: "string",
    object_id: "string",
    aspect: "string",
    type: "string",
    callback_url: "string",
    created_at: Date
});