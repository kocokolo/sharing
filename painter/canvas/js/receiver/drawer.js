(function () {
    var Drawer;
    Drawer = {};
    Drawer.init = function () {

        Drawer.canvas = document.getElementById('smartdrawer-canvas');
        Drawer.canvas.height = window.innerHeight;
        Drawer.canvas.width = window.innerWidth;

        // init cavas
        Drawer.ctx = Drawer.canvas.getContext("2d");
        Drawer.ctx.fillStyle = "solid";

        Drawer.ctx.strokeStyle = "blue";

        Drawer.ctx.lineWidth = 10;
        Drawer.ctx.lineCap = "round";
        Drawer.socket = window.mysocket;

        // listen usermove
        $(window).on('pen', function (e, data) {
            var x = data.x, y = data.y, type = data.type;
            if (type === "touchstart") {
                Drawer.ctx.beginPath();
                Drawer.ctx.moveTo(x, y);
            } else if (type === "touchmove") {
                Drawer.ctx.lineTo(x, y);
                Drawer.ctx.stroke();
            } else {
                Drawer.ctx.closePath();
            }
        });

        console.info("init canvas ready!");
    };

    $(window).on("socket_ready", function () {
        Drawer.init();
    });

    // 发送
    window.aaa=function () {
        var image = Drawer.canvas.toDataURL();
        mysocket.emit("image", {
            image: image,
            userName: "崔鹏"
        });
    };

}).call(this);