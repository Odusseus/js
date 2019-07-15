const request = require('request');
const getUrls = require('get-urls');
const lowdb = require('lowdb');
const fileSync = require('lowdb/adapters/FileSync');
const parseDomain = require('parse-domain');

const adapter = new fileSync('surfer.db.json');
const db = lowdb(adapter);

db.defaults({ urls: []}).write(); 
const dbUrls = 'urls';
let uri = "http://hotspirit.nl";

// "https://theweekinchess.com/"

request(uri,
  function(error, response, body){
    if(error){
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
    }
    else {
      console.log('statusCode:', response && response.statusCode);
      //console.log('body:', body);
      let urls = getUrls(body);
      var x;
      urls.forEach(function(url){
        console.log(url);
        let urlDomain = parseDomain(url);
        if(urlDomain.subdomain){
          var domain = `${urlDomain.subdomain}.${urlDomain.domain}.${urlDomain.tld}`;
        }
        else{
          var domain = `${urlDomain.domain}.${urlDomain.tld}`;
        }
        let isPgn = false;
        db.get(dbUrls).push({
          id: db.get(dbUrls).size() + 1,
          url: url,
          domain: domain,
          pgn: isPgn}).write();
      });

      }
    } 
);
