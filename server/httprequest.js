function initWebserver(app,root) {

    app.get('/', function (req, res) {
        res.sendfile(root + '/index.html');
    });

    app.get('/*', function (req, res, next) {
        var file = req.params[0];
        res.sendfile(root + '/' + file);
    });

}

module.exports.init = initWebserver;