(function () {
    var
        clientUId = 0;

    var
        io = require('socket.io');

    process.on("message", function (m, server) {
        var sio = io.listen(server);
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

        console.log("start listen screensharer ..");
    });

}).call(this);