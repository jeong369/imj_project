var Client = require('mongodb').MongoClient;

Client.connect('mongodb://localhost:27017/schedule', function(error, db){
    if(error) {
        console.log(error);
    } else {
        console.log("connected:"+db);
        db.close();
    }
});