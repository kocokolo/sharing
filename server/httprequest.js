/**
 * 基本的webserver功能，提供对静态资源文件的访问，如html,js,css,image
 * 提供本次展示的PPT和demo的访问
 */
function initWebserver(app,root) {

    // 根目录返回 index.html 文件
    app.get('/', function (req, res) {
        res.sendfile(root + '/index.html');
    });

    // 基于请求的文件地址，返回对应的服务器上的文件
    app.get('/*', function (req, res, next) {
        var file = req.params[0];
        res.sendfile(root + '/' + file);
    });

}

module.exports.init = initWebserver;