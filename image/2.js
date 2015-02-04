$(window).on("socket_ready", function () {
    mysocket.emit("i am master");
    window.client = {};
    mysocket.on('subimage', function (data) {
        client[data.clientId] = data.image;
        $("#img").attr("src", data.image);
    });
});