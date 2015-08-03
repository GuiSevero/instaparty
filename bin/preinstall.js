var fs = require('fs')
var resolve = require('path').resolve
var join = require('path').join
var cp = require('child_process')

// get library path
var app_dir = resolve(__dirname, '../app/')

if (fs.existsSync(join(app_dir, 'package.json'))) {

    cp.exec("npm install", {
        cwd: app_dir
    }, function(err, std_out, std_err) {
    	console.log(std_err);
    	console.log(err);
    	console.log(std_out);
    });
    return;
}
