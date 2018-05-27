const http = require('http');
const cheerio = require('cheerio');

http.get("http://www.hotspirit.nl", (resp) => {
    let data = "";

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        console.log(data);

        const $ = cheerio.load(data);

        $('a').each(function(index, element){
            var x = '';
            if(element.childNodes.length >= 0 && element.childNodes[0] != undefined && element.childNodes[0].data != undefined){
                x = element.childNodes[0].data.trim();
            }
            var y = element.attribs.href;
            console.log(x + ' ' + y);
        });
    });

 }).on("error", (err) => {
     console.log("Error: " + err.message);
 });