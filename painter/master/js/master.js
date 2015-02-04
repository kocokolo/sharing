(function () {
    $(window).on("socket_ready", function () {
        mysocket.emit("i am master");
        window.client = {};
        mysocket.on('subimage', function (data) {
            window.appendNewPic(data.image);
        });
    });
})();