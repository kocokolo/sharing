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

    // http request
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
    sio.of('/screensharer').on('connection', function (curclient) {
        var cid = ++clientUId;
        curclient.on('i am client', function (page) {
            curclient.page = page;
            curclient.cid = cid;
            sharerclients[cid] = curclient;
            console.log("" + cid + " come  from " + page);
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
            console.log(cid + " leave.");
        });

    });

    sio.of('/painter').on('connection', function (curclient) {
        var cid = ++clientUId;

        // 客户端画图数据
        curclient.on('image', function (data) {
            if (_master) {
                // 数据传输给master客户端页面
                _master.emit("subimage", {
                    image: data.image,
                    userName: data.userName,
                    clientId: cid
                });
                console.log(data.userName + "sub image to master");
            }
        });

        // 发出i am master命令，设置当前的master
        curclient.on('i am master', function (data) {
            _master = curclient;
            console.log(" welcome master " + cid);
        });

        // 当master客户端获得足够多的图片数据后，发出i am full命令
        curclient.on('i am full', function (data) {
            if (_master == curclient) {
                _master = null;
                console.log(" master " + cid + " is full ");
            }
        });

        curclient.on('disconnect', function () {
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