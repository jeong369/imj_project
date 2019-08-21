# Node.js로 브라우저 생성

1. node cmd에서 실행해야 함!

2. npm 실행

   `C:/~~~/Desktop/imj-projectr 경로에서 npm init`

3. express-generator 설치

   `npm install -g express-generator`

   -g : global 전역에서 사용할 수 있게 설치한다.

4. express 스켈레톤 폴더 생성(기본은 pug(구jade)이지만 ejs 유형으로)

   > ejs : <%title%> 형태처럼 html 사용 가능
   >
   > pug : 띄어쓰기로 html 구분
   >
   > 우리가 쓰던 형태랑 가까운게 ejs라서 그걸로 설치함

   `express ScheduleManager --view=ejs`

5. ScheduleManager 폴더에서 npm 설치

   `cd ScheduleManager`

   `npm install`

   > npm 을 설치해줘야 그 전에 설정했던 express가 동작함!

6. 서버 실행

   `npm start`

   서버 주소 : localhost:3000



# MongoDB 설치

1. MongoDB 다운받기

   - 설치 경로 : C:/Program Files/MongoDB/Server/4.2/bin

2. C:/data/db, C:/mongodb/log 폴더 생성

3. 환경변수 설정

   `path`

   `C:/Program Files/MongoDB/Server/4.2/bin` 주소 넣기

4. C:/Program Files/MongoDB/Server/4.2 경로에 mongod.cfg 생성

   ```cfg
   # 데이터베이스 폴더
   dbpath = C:/data/db
   # mongdb 포트
   port = 27017
   # 로그 파일
   logpath = C:\mongodb\data\log\mongo.log
   # 웹 관리 사용
   rest = true
   ```

5. mongodb server 실행

   - cmd - 관리자 모드로 실행해야 한다.

   ```cmd
   C:/Program Files/MongoDB/Server/4.2/bin/mongod.exe --dbpath C:/data/db
   ```

   - C:/data/db 에 db파일들이 자동 생성된다.
   - 그리고 서버가 실행된다.

6. mongoDB 시작

   `net start mongodb`

   127.0.0.1:27017로 접속하면 현재 드라이버 포트에 접근중이라는 문구가 뜬다. (접속 성공)



### MongoDB와 Express 연동

> 연동이라길래 해봤는데 꼭 필요한지는 모르겠다.

1. 모듈 설치

   `npm install --save mongoose body-parser`

2. app.js 수정

   > 내 코드에 맞게 수정하여 추가함

   ```js
   const express = require('express');
   const mongoose = require('mongoose');
   const bodyParser = require('body-parser');
   mongoose.Promise = global.Promise; // mongoDB 버전 4.11 이상부터 해주어야 에러 안남
   
   const mongoDB = 'mongodb://127.0.0.1:27017/test // 호스트:포트/DB명
   const promise = mongoose.connect(mongoDB, {
     useMongoClient: true //mongoDB 버전 4.11 이상부터 해주어야 에러 안남
   });
   ```


# MongoDB와 Node.js 연동

## 1. mongoose 사용

> 실제로 사용하지 않음

- C:/Program Files/MongoDB/Server/4.2 경로에 server_mongo/server.js 생성한다.

  ```js
  // 1. mongoose 모듈 가져오기
  var mongoose = require('mongoose');
  // 2. testDB 세팅
  mongoose.connect('mongodb://localhost:27017/testDB');
  // 3. 연결된 testDB 사용
  var db = mongoose.connection;
  // 4. 연결 실패
  db.on('error', function(){
      console.log('Connection Failed!');
  });
  // 5. 연결 성공
  db.once('open', function() {
      console.log('Connected!');
  });
  
  // 6. Schema 생성. (혹시 스키마에 대한 개념이 없다면, 입력될 데이터의 타입이 정의된 DB 설계도 라고 생각하면 됩니다.)
  var student = mongoose.Schema({
      name : 'string',
      address : 'string',
      age : 'number'
  });
  
  // 7. 정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일
  var Student = mongoose.model('Schema', student);
  
  // 8. Student 객체를 new 로 생성해서 값을 입력
  var newStudent = new Student({name:'Hong Gil Dong', address:'서울시 강남구 논현동', age:'22'});
  
  // 9. 데이터 저장
  newStudent.save(function(error, data){
      if(error){
          console.log(error);
      }else{
          console.log('Saved!')
      }
  });
  
  // 10. Student 레퍼런스 전체 데이터 가져오기
  Student.find(function(error, students){
      console.log('--- Read all ---');
      if(error){
          console.log(error);
      }else{
          console.log(students);
      }
  })
  
  // 11. 특정 아이디값 가져오기
  Student.findOne({_id:'585b777f7e2315063457e4ac'}, function(error,student){
      console.log('--- Read one ---');
      if(error){
          console.log(error);
      }else{
          console.log(student);
      }
  });
  
  // 12. 특정아이디 수정하기
  Student.findById({_id:'585b777f7e2315063457e4ac'}, function(error,student){
      console.log('--- Update(PUT) ---');
      if(error){
          console.log(error);
      }else{
          student.name = '--modified--';
          student.save(function(error,modified_student){
              if(error){
                  console.log(error);
              }else{
                  console.log(modified_student);
              }
          });
      }
  });
  
  // 13. 삭제
  Student.remove({_id:'585b7c4371110029b0f584a2'}, function(error,output){
      console.log('--- Delete ---');
      if(error){
          console.log(error);
      }
  
      /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
          어떤 과정을 반복적으로 수행 하여도 결과가 동일하다. 삭제한 데이터를 다시 삭제하더라도, 존재하지 않는 데이터를 제거요청 하더라도 오류가 아니기 때문에
          이부분에 대한 처리는 필요없다. 그냥 삭제 된것으로 처리
          */
      console.log('--- deleted ---');
  });
  ```



## mongodb 라는 드라이버 모듈 사용

> 이걸 사용했다.

1. 드라이버 모듈 설치

   `npm install mongodb`

2. db 실행

   `C:/Program Files/MongoDB/Server/4.2/bin/mongod.exe --dbpath C:/data/db`

3. 여러 js파일들을 이용하여 연결 확인

   `dbcon.js`

   ```js
   var Client = require('mongodb').MongoClient;
   
   Client.connect('mongodb://localhost:27017/schedule', function(error, db){
       if(error) {
           console.log(error);
       } else {
           console.log("connected:"+db);
           db.close();
       }
   });
   ```

   `dbinsert.js`

   > 단일 데이터 삽입하는 코드

   ```js
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
   ```

   `dbinsertMany.js`

   ```js
   var Client = require('mongodb').MongoClient;
   
   Client.connect('mongodb://localhost:27017/schedule', { useNewUrlParser: true , useUnifiedTopology: true}, function(error, database){
       if(error) {
           console.log(error);
       } else {
           // 1. 입력할 documents 를 미리 생성
           var jordan = {name:'Jordan', age:16, gender:'M'};
           var amanda = {name:'Amanda', age:17, gender:'F'};
           var jessica = {name:'Jessica', age:15, gender:'F'};
           var james = {name:'James', age:19, gender:'M'};
           var catherine = {name:'Catherine', age:18, gender:'F'}
   
           // 2. insertMany( ) 함수에 배열 형태로 입력
           const db = database.db('schedule')
           db.collection('todo').insertMany([jordan,amanda,jessica,james,catherine]);
           database.close();
       }
   });
   ```

4. 코드 돌려서 확인

   `node 파일명`

5. 실제 Robo 3T에서 데이터 확인 가능