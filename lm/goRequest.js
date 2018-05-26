var request = require("request");
const cheerio = require('cheerio');

request("http://www.hotspirit.nl", function(error, response, body){
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
            console.log(title + ' ' + href);
        });
});
