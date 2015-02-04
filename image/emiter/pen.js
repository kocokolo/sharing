$(document).ready(function () {
    window.setTimeout(function () {
        $(document).on('touchstart touchmove touchend', function (event) {
            var type, x, y;
            var oe = event.originalEvent;
            var e = (oe.touches && oe.touches[0]) || oe;
            type = oe.type;
            x = e.clientX;
            y = e.clientY;
            // emit relateive
            var d = {
                x: x,
                y: y,
                type: type
            };
            $(window).trigger('pen', d);
            oe.preventDefault();
        });
        console.info("init pen ready!");
    }, 100);

});