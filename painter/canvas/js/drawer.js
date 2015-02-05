(function () {
    var Drawer;
    Drawer = {};
    Drawer.init = function () {

        Drawer.canvas = document.getElementById('smartdrawer-canvas');
        Drawer.canvas.height = 500;
        Drawer.canvas.width = 750;

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
            if (type === "start") {
                Drawer.ctx.beginPath();
                Drawer.ctx.moveTo(x, y);
            } else if (type === "move") {
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

    $(".tools .button").click(function () {
        Drawer.ctx.strokeStyle = $(this).data("color");
    });

    // 发送
    $("#btnsave").click(function () {
        var image = Drawer.canvas.toDataURL();
        mysocket.emit("image", {
            image: image,
            userName: "崔鹏"
        });
    });

}).call(this);