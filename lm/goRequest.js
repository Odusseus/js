var request = require("request");

request("http://www.hotspirit.nl", function(error, response, body){
 console.log(body);
});
