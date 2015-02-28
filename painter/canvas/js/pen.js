$(document).ready(function () {
    var supportTouch = /(android)|(iphone)/i.test(navigator.userAgent);
    var $document = $(document),
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    var cc = document.getElementById("cbxMoveMode");
    var isplaying = false;

    window.setTimeout(function () {
        $("canvas").on(touchStartEvent + " " + touchMoveEvent + " " + touchStopEvent, function (event) {
            if (cc.checked) {
                return;
            }
            var type, x, y, e, oe, senddata;
            oe = event.originalEvent;
            type = oe.type;
            // emit relateive
            switch (type) {
                case touchStartEvent:
                    type = "start";
                    isplaying = true;
                    break;
                case touchMoveEvent:
                    type = "move";
                    break;
                case touchStopEvent:
                    type = "end";
                    break;
            }

            if (isplaying) {
                e = (oe.touches && oe.touches[0]) || oe;
                x = e.offsetX;
                y = e.offsetY;
                if (x >= 0 && y >= 0) {
                    senddata = {
                        x: x,
                        y: y,
                        type: type
                    }
                    $(window).trigger('pen', senddata);
                }
            }

            if (type == "end") {
                isplaying = false;
            }

            if (isplaying) {
                oe.preventDefault();
            }
        });

        $("canvas").on("mouseup mousemove", function (event) {

            if (!cc.checked) {
                return;
            }
            var type, x, y, e, oe, senddata;
            oe = event.originalEvent;
            type = oe.type;
            // emit relateive
            switch (type) {
                case "mouseup":
                    if (!isplaying) {
                        type = "start";
                        isplaying = true;
                    } else {
                        type = "end";
                    }
                    break;
                case "mousemove":
                    type = "move";
                    break;
            }
            if (isplaying) {
                e = (oe.touches && oe.touches[0]) || oe;
                x = e.offsetX;
                y = e.offsetY;
                if (x >= 0 && y >= 0) {
                    senddata = {
                        x: x,
                        y: y,
                        type: type
                    }
                    $(window).trigger('pen', senddata);
                }
            }

            if (type == "end") {
                isplaying = false;
            }

            if (isplaying) {
                oe.preventDefault();
            }
        });

        console.info("init pen ready!");
    }, 100);
});