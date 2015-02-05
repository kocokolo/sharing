(function () {
    $(window).on("socket_ready", function () {
        mysocket.emit("i am master");
        mysocket.on('subimage', function (data) {
            window.appendNewPic(data);
        });
    });
})();