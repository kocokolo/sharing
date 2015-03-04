(function () {
    var port = 8010,
        http = require('http'),
        express = require('express'),
        app = express(),
        server = http.createServer(app);

    var io = require('socket.io'),
        sio = io.listen(server);

    // 启动webserver静态资源访问
    require('./server/httprequest.js').init(app, __dirname);
    // 启动demo painter的通信请求支持
    require('./server/painter.js').init(sio);
    // 启动demo screensharer的通信请求支持
    require('./server/screensharer.js').init(sio);

    server.listen(port);

    console.log("app start success");
}).call(this);