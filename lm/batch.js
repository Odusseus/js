var express = require('express');
var app = express();
var urlModule = require('./module/url');


app.get('/go/:url*?', function(request, response){

    response.writeHead(200, {'Content-Type':'text/html'});
    response.write("Hello World! ");
    var url = request.params.url;
    if(url){
        response.write(url);
    }
    var list = urlModule(url);
    if(list && list.count > 0){
        response.write(list[0].url);
    }
    response.end();

});

app.listen(8081);

exports = module.exports = app;


