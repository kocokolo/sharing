function initPainter(sio) {
    var clientUId = 0;
    var _master = null;

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
            } else {
                curclient.emit("not found master");
                console.log(cid + "sub image , but not found master");
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

}

module.exports.init = initPainter;

