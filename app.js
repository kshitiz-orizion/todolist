var cors = require('cors');
var express=require('express');
var router=express.Router();
var http=require('http');
var CircularJSON = require('circular-json');
var server=http.createServer();
var path=require('path');
var stringify = require('json-stringify-safe');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var methodOverride=require('method-override');
var app = express();
app.use(express.static('../todo'));
app.use(cors());
app.set('port',process.env.PORT||3000);
app.set('views',__dirname+'views');
app.set('view engine','jade');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ 
  extended: true
})); 
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/Todo';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

});
var TodoSchema=new mongoose.Schema({
  id:{type:Number, unique:true},
task:String
});

var todo=mongoose.model('todo',TodoSchema);
app.get('/gettodo', function (req, res) {
    console.log('I received a GET request');
    MongoClient.connect(url,function(err,db){
    db.collection('Todo').find({}).toArray(function(err,docs){
      res.json(docs);
    
    db.close();
    });
});
});
app.post('/posttodo', function(req, res) {
  var todo={
      id:req.body.id,
      task:req.body.task
  };
  MongoClient.connect(url,function(err,db){
    assert.equal(null,err);
    db.collection('Todo').update(todo,todo,{upsert:true},function(err,result){
      assert.equal(null,err);
      console.log("item inserted");
      db.close();
    });
  });
});
app.delete('/deletetodo/:id',function(req,res){
  console.log('I received a Delete request');
   MongoClient.connect(url,function(err,db){
    
    db.collection('Todo').findOneAndDelete({id:req.params.id},function(err,todo){
      if(err) throw err;
      console.log("item deleted");
      res.json(todo);
      db.close();
    });
  });

});
app.put('/updatetodo/:id',function(req,res){
    console.log("I recieved a update request");
    MongoClient.connect(url,function(err,db){
    
    db.collection('Todo').findOneAndUpdate({id:req.params.id},{
      $set:{task:req.body.task}
    },{
      new:true
    },function(err,updatedtodo){
      if(err) throw err;
      res.json(updatedtodo);
    }
    );
  });
});
app.listen(3000,function(err,data){
  if(err) throw err;
  else{
    console.log("server running on 3000");
  }
});