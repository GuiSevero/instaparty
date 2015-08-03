var fs = require('fs')
var join = require('path').join
var cp = require('child_process')

// get library path
var dir = __dirname;

fs.readdirSync(dir)
    .forEach(function(controller) {

        if (controller != 'index.js') {
            var ctr_name = controller.replace('.js', '');
            exports[ctr_name] = require('./' + controller);
        }
    })
