function loadStyle(url) {
    var node = document.createElement('link');
    node.setAttribute("rel", "stylesheet");
    node.setAttribute("type", "text/css");
    node.setAttribute("href", url);
    (document.head || document.documentElement).appendChild(node);
}

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