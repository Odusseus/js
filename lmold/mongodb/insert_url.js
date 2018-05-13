var MongoClient = require('mongodb').MongoClient;
var mongodbUrl = "mongodb://localhost:27017/";

MongoClient.connect(mongodbUrl, {useNewUrlParser: true},function(err, db){
    if(err) throw err;
    var dbo = db.db("lmdb");
    var urlObj = {value: "www.hotspirit.nl", state: "New"};
    dbo.collection("url").insertOne(urlObj, function(err, res) {
        if(err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});