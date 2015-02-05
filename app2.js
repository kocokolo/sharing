(function () {
    var
        port = 8010,
        http = require('http');

    var
        server = http.createServer(),
        fork = require('child_process').fork;

    server.listen(port, function () {
        var painter = fork('./server/painter.js');
        var screensharer = fork('./server/screensharer.js');
        var http = fork('./server/http.js');
        painter.send("server", server);
        screensharer.send("server", server);
        http.send("server", server);
        server.close();
    });

    console.log("app started success at " + port);

}).call(this);