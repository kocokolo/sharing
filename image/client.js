$(function () {
    var server_ip = window.location.hostname
        , server_port = window.location.port;
    loadScript("/socket.io/socket.io.js", function () {
        window.mysocket = io.connect('http://' + server_ip + ':' + server_port + "/image");
        window.setTimeout(function () {
            $(window).trigger("socket_ready", mysocket);
            console.info("mysocket ready!");
        }, 200);
    });
});

