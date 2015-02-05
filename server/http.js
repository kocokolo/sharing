(function () {
    var app = require('express')()
        , path = require('path')
        , dirname;

    process.on("message", function (m, server) {
        app.listen(server);
        dirname = path.normalize(__dirname + "/..");

        app.get('/', function (req, res) {
            res.sendfile(dirname + '/index.html');
        });

        app.get('/*', function (req, res, next) {
            var file = req.params[0];
            res.sendfile(dirname + '/' + file);
        });

        console.log("listenning the http request...");
    });

}).call(this);