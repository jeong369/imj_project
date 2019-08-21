var Client = require('mongodb').MongoClient;

Client.connect('mongodb://localhost:27017/schedule',{ useNewUrlParser: true , useUnifiedTopology: true}, function(error, database){
    if(error) {
        console.log('-------------------')
        console.log(error);
    } else {
        // 1. 입력할 document 생성
        var michael = {name:'Michael', age:15, gender:'M'};
        // 2. student 컬렉션의 insert( ) 함수에 입력
        console.log(michael)
        db = database.db('schedule')
        db.collection('todo').insert(michael);

        database.close();
    }
});