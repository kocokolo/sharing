/**
 * Created by cuipeng02 on 2015/1/27.
 */
(function () {
    var io;
    io = require('socket.io').listen(4000);

    io.sockets.on('connection', function (socket) {

        socket.on('disconnect', function () {

        });

    });
}).call(this);
