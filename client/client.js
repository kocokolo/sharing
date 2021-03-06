(function () {
    function startSocket(ns_event) {
        var server_ip = window.api_ip || window.location.hostname
            , server_port = window.api_port || window.location.port
            , socketjs_url = "http://" + server_ip + ":" + server_port + "/socket.io/socket.io.js";

        loadScript(socketjs_url, function () {
            var t = 0;
            var t_func = function () {
                // detect the io
                if (typeof(io) !== "undefined") {
                    var ws='http://' + server_ip + ':' + server_port + "/" + ns_event;
                    //console.info(ws)
                    window.mysocket = io.connect(ws);
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
    }

    startSocket(/\/painter\//i.test(window.location.href) ? "painter" : "screensharer");
})();