$(function () {
    var server_ip = window.api_ip || window.location.hostname
        , server_port =  window.api_port ||window.location.port;
    var socketjs_url = "http://"
        + server_ip + ":" + server_port
        + "/socket.io/socket.io.js";
    loadScript(socketjs_url, function () {
        var t = 0;
        var t_func = function () {
            // detect the io
            if (typeof(io) !== "undefined") {
                window.mysocket = io.connect('http://' + server_ip + ':' + server_port + "/drawer");
                window.setTimeout(function () {
                    $(window).trigger("socket_ready", mysocket);
                    console.info("mysocket ready!");
                }, 200);
            } else {
                t += 100;
                window.setTimeout(function () {
                    t_func();
                }, t);
            }
        }
        t_func();
    });
});

