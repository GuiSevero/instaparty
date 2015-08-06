var mongoose = require("mongoose");

module.exports = mongoose.model('Photo', {
    time: Date,
    url: "string",
    src: "string",
    type: "string",
    width: "number",
    height: "number",
    media: mongoose.Schema.Types.Mixed
});
