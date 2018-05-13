var http = require('http');
var common = require('./module/common');


http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write("Hello World! "+ common.myDateTime());
    res.end();
}).listen(8080);