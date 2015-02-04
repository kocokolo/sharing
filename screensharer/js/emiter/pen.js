(function ($) {
    $(window).on("socket_ready", function () {
        var supportTouch = "ontouchend" in document;
        var $document = $(document),
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

        var isplaying = false;
        window.setTimeout(function () {
            $(window).on(touchStartEvent + " " + touchMoveEvent + " " + touchStopEvent, function (event) {
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
                        isplaying = false;
                        break;
                }
                if (isplaying) {
                    e = (oe.touches && oe.touches[0]) || oe;
                    x = (e.clientX + window.pageXOffset) / window.document.documentElement.scrollWidth;
                    y = (e.clientY + window.pageYOffset) / window.document.documentElement.scrollHeight;
                    senddata = {
                        x: x,
                        y: y,
                        type: type
                    }
                    mysocket.emit('pen', senddata);
                    $(window).trigger('pen', senddata);
                }
                oe.preventDefault();
            });
            console.info("init pen ready!");
        }, 100);
    });
})(jQuery);