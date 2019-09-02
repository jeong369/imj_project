var Client = require('mongodb').MongoClient;

Client.connect('mongodb://localhost:27017/schedule',{ useNewUrlParser: true , useUnifiedTopology: true}, function(error, database){
    if(error) {
        console.log('-------------------')
        console.log(error);
    } else {
        db = database.db('schedule')
        db.schedule.find()
//        이거 맞는지 db될 때 확인해보기
    }
});