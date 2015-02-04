(function () {
    var
        port = 8010,
        io = require('socket.io'),
        express = require('express'),
        http = require('http'),
        app = express(),
        server = http.createServer(app),
        sio = io.listen(server),
        _master = null,
        clientUId = 0;


    app.get('/', function (req, res) {
        res.sendfile(__dirname + '/index.html');
    });

    app.get('/*', function (req, res, next) {
        var file = req.params[0];
        res.sendfile(__dirname + '/' + file);
    });

    // socket
    var sharerclients = {};
    var nowpaintingclient = {};
    sio.of('/screensharer').on('connection', function (socket) {
        var cid = ++clientUId
            , curclient = socket;

        curclient.on('i am client', function (page) {
            curclient.page = page;
            curclient.cid = cid;
            sharerclients[cid] = curclient;
            console.log(" hello client " + cid + " from " + page);
        });

        curclient.on('pen', function (data) {
            // 释放pen
            if (data.type == "end" && nowpaintingclient[data.page] == curclient) {
                delete nowpaintingclient[data.page];
                console.log(cid + " release the pen.");
            }

            // pen被占用
            if (nowpaintingclient[data.page] && nowpaintingclient[data.page] !== curclient) {
                return;
            }

            // 获得pen
            if (data.type == "start") {
                nowpaintingclient[data.page] = curclient;
                console.log(cid + " lock the pen.");
            }

            // 发送pen数据给page各个对应的client
            for (var _cid in sharerclients) {
                if (data.page === sharerclients[_cid].page) {
                    sharerclients[_cid].emit('pen', data);
                }
            }

            //socket.broadcast.emit('pen', data);
            //console.log(cid + " emit pen." + JSON.stringify(data));
        });

        // 连接关闭
        curclient.on('disconnect', function () {
            delete sharerclients[curclient.cid];
            delete nowpaintingclient[curclient.page];
            console.log(cid + " leaved.");
        });

    });

    sio.of('/painter').on('connection', function (client) {
        var cid = ++clientUId;

        client.on('image', function (data) {
            if (_master) {
                console.log(data.userName + "sub image to master....");
                _master.emit("subimage", {
                    image: data.image,
                    userName: data.userName,
                    clientId: cid
                });
            }
        });

        client.on('i am master', function (data) {
            _master = client;
            console.log(" welcome master.");
        });

        client.on('disconnect', function () {
            if (_master) {
                _master.emit("clientleave", {
                    clientId: cid
                });
            }
        });
    });

    server.listen(port);

    console.log("app started success and now listenning the request...");

}).call(this);