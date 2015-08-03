var request = require('request');
var authenticate_url = "http://sites.phphomolog.ncgroup.com.br/huia/auth/v1/";



exports.auth = function(username, password, fn) {

    request.post({
        url: authenticate_url,
        form: {
            username: username,
            password: password
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Huia-Labs'
        }
    }, function(err, httpResponse, body) {
        if (err) {
            return fn(err, false);
        }
        if (body.error)
            fn(body.error, false)
        else
            fn(null, body);
    });

}
