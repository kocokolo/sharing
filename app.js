(function () {
    var
        port = 4004,
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

    sio.of('/drawer').on('connection', function (socket) {
        var cid = ++clientUId;
        console.log(cid + " connected.");
        socket.on('pen', function (data) {
            var emitdata = {
                x: data.x,
                y: data.y,
                type: data.type
            };
            socket.broadcast.emit('pen', data);
            console.log(cid + " emit pen." + JSON.stringify(data));
        });

        socket.on('cleandraw', function (data) {
            socket.broadcast.emit('cleandraw');
            console.log(cid + " emit cleandraw.");
        });

        socket.on('disconnect', function () {
            console.log(cid + " leaved.");
        });

    });

    sio.of('/image').on('connection', function (client) {
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

}).call(this);