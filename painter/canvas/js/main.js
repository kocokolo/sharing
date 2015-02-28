$(window).on("socket_ready", function () {

    // upload file

    // 发送
    var canvas = document.getElementById('smartdrawer-canvas');
    var ctx = canvas.getContext("2d");

    $("#btnsave").click(function () {
        var image = canvas.toDataURL();
        mysocket.emit("image", {
            image: image,
            userName: "崔鹏"
        });
    });

    $(".tools .button").click(function () {
        ctx.strokeStyle = $(this).data("color");
    });
});