// var app = function(url){
//     var list = [
//         { url:"www.abc.com"},
//         { url:"www.def.com"},
//         { url:"www.ghj.com"}
//     ];
//     return list;
// };

var request = require("request");
var cheerio = require('cheerio');

var app = function(url){
    var list = [];
    if(!url.includes('http://')){
        url = 'http://' + url;
    }
    request(url, function(error, response, body){
 //console.log(body);
 const $ = cheerio.load(body);
        
        $('a').each(function(index, element){
            var href = element.attribs.href;
            var title = "";
            if(element.attribs.title != undefined){
                title = element.attribs.title.trim();
            }
            else {
                if(element.childNodes.length >= 0 && element.childNodes[0] != undefined){
                    if(element.childNodes[0].attribs != undefined && element.childNodes[0].attribs.title != undefined){
                        title = element.childNodes[0].attribs.title.trim();
                    } 
                    else {
                        if(element.childNodes[0].data != undefined){
                            title = element.childNodes[0].data.trim();
                        } 
                    }
                }
            }
            list.push({url : href, title : title});
            console.log(title + ' ' + href);
        });
});
    
    return list;
};

exports = module.exports = app;