var mongoose = require("mongoose");

module.exports = mongoose.model('Log', {
    data: mongoose.Schema.Types.Mixed
});
