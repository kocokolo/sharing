function loadScript(url, callback) {
    var node = document.createElement('script');
    node.onload = node.onreadystatechange = function () {
        var rs = node.readyState;
        if ('undefined' === typeof rs || 'loaded' === rs || 'complete' === rs) {
            try {
                callback && callback();
            } finally {
                node.onload = node.onreadystatechange = null;
                node = null;
            }
        }
    };
    node.async = true;
    node.charset = 'utf-8';
    node.src = url;
    (document.head || document.documentElement).appendChild(node);
}

(function () {
    var t = (new Date).getTime();
    var api_host = window.api_host;
    var libsrc = api_host + '/_module/jquery-1.11.1.min.js?t=_' + t;
    var utilsrc = api_host + '/_module/utils.js?t=_' + t;
    var socketsrc = api_host + '/client/client.js?t=_' + t;
    var pensrc = api_host + '/screensharer/js/emiter/pen.js?t=_' + t;
    var drawersrc = api_host + '/screensharer/js/receiver/drawer.js?t=_' + t;
    loadScript(libsrc, function () {
        loadScript(utilsrc, function () {
            loadScript(drawersrc, function () {
                $("body").addClass("shake");
            });
            loadScript(pensrc);
            loadScript(socketsrc);
        });
    });
})();