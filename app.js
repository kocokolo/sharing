(function () {
    var port = 8010,
        http = require('http');

    var express = require('express'),
        app = express(),
        server = http.createServer(app);

    var io = require('socket.io'),
        sio = io.listen(server);

    require('./server/httprequest.js').init(app, __dirname);
    require('./server/painter.js').init(sio);
    require('./server/screensharer.js').init(sio);

    server.listen(port);

    console.log("app start success");

}).call(this);