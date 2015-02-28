(function () {
    var Drawer;
    Drawer = {};
    var canvas = document.getElementById('smartdrawer-canvas');
    var ctx = canvas.getContext("2d");

    function init() {

        canvas.height = 500;
        canvas.width = 750;

        // init cavas
        ctx.fillStyle = "solid";
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 10;
        ctx.lineCap = "round";

        // listen usermove
        $(window).on('pen', function (e, data) {
            var x = data.x
                , y = data.y
                , type = data.type;
            var c = ctx;
            if (type === "start") {
                c.beginPath();
                c.moveTo(x, y);
            } else if (type === "move") {
                c.lineTo(x, y);
                c.stroke();
            } else {
                c.closePath();
            }
        });

        console.info("init canvas ready!");
    };

    $(window).on("socket_ready", function () {
        init();
        mysocket.on("not found master", function () {
            alert("master not exist ")
        });
    });


}).call(this);