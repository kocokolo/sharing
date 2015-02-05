(function () {
    var
        _master = null,
        clientUId = 0;

    var
        io = require('socket.io');

    process.on("message", function (m, server) {
        var sio = io.listen(server);

        sio.of('/painter').on('connection', function (curclient) {
            var cid = ++clientUId;

            curclient.on('image', function (data) {
                if (_master) {
                    _master.emit("subimage", {
                        image: data.image,
                        userName: data.userName,
                        clientId: cid
                    });
                    console.log(data.userName + "sub image to master....");
                }
            });

            curclient.on('i am master', function (data) {
                _master = curclient;
                console.log(" welcome master.");
            });

            curclient.on('disconnect', function () {
                if (_master) {
                    _master.emit("clientleave", {
                        clientId: cid
                    });
                }
            });
        });

        console.log("start listen painter ..");
    });

}).call(this);