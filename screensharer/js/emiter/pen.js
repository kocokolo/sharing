(function ($) {
    $(window).on("socket_ready", function () {
        var supportTouch = /(android)|(iphone)/i.test(navigator.userAgent);

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
                        break;
                }
                if (isplaying) {
                    e = (oe.touches && oe.touches[0]) || oe;
                    x = (e.clientX + window.pageXOffset) / window.document.documentElement.scrollWidth;
                    y = (e.clientY + window.pageYOffset) / window.document.documentElement.scrollHeight;
                    senddata = {
                        x: x,
                        y: y,
                        page: window.location.host,
                        type: type
                    }
                    mysocket.emit('pen', senddata);
                    // todo
                    //$(window).trigger('pen', senddata);
                }
                if (type == "end") {
                    isplaying = false;
                }
                oe.preventDefault();
            });
            mysocket.emit('i am client', window.location.hostname);
            console.info("init pen ready!");
        }, 100);
    });
})(jQuery);