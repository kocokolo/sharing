(function () {
    var Drawer;
    Drawer = {};
    var apihost = window.api_host || "http://" + window.location.host;
    loadStyle(apihost + "/screensharer/style/drawer.css");
    var $ = jQuery;
    Drawer.init = function () {
        // create cavas
        var canvasheight = window.document.documentElement.scrollHeight,
            canvaswidth = window.document.documentElement.scrollWidth;

        Drawer.canvas = document.createElement('canvas');
        Drawer.canvas.id = "smartdrawer-canvas";
        Drawer.canvas.height = canvasheight;
        Drawer.canvas.width = canvaswidth;
        document.getElementsByTagName('body')[0].appendChild(Drawer.canvas);

        // init cavas
        Drawer.ctx = Drawer.canvas.getContext("2d");
        Drawer.ctx.fillStyle = "solid";
        Drawer.ctx.strokeStyle = "blue";
        Drawer.ctx.lineWidth = 7;
        Drawer.ctx.lineCap = "round";
        Drawer.socket = window.mysocket;

        // listen
        Drawer.socket.on('pen', function (data) {
            Drawer.draw(data.x, data.y, data.type);
        });

        $(window).on('pen', function (e, data) {
            Drawer.draw(data.x, data.y, data.type);
        });

        Drawer.draw = function (x, y, type) {
            x = x * canvaswidth;
            y = y * canvasheight;
            console.log("draw", x + " " + y);
            if (type === "start") {
                Drawer.ctx.beginPath();
                return Drawer.ctx.moveTo(x, y);
            } else if (type === "move") {
                Drawer.ctx.lineTo(x, y);
                Drawer.ctx.stroke();
            } else {
                Drawer.ctx.closePath();
            }
        }

        console.info("init canvas ready!");
    };
    $(window).on("socket_ready", function () {
        Drawer.init();
    });

}).call(this);