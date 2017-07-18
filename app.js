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
 
mongoose.connect('mongodb://localhost/Todo');
var assert = require('assert');

var Todo = mongoose.model('Todo', mongoose.Schema({
  number:{type:Number},
  task:String
}));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ 
  extended: true
}));
app.get('/gettodo', function (req, res) {
    console.log('I received a GET request');
    Todo.find(function(err, todo){
      console.log(todo);
    if(err)
      res.send(err);
    res.json(todo);
  });
});
app.post('/posttodo', function(req, res) {
 Todo.create( req.body, function(err, todo){
    if(err)
      res.send(err);
    res.json(todo);
  });
});
app.delete('/deletetodo/:id', function(req, res){
  Todo.findOneAndRemove({_id:req.params.id},function(err,todo){
    if(err)
      res.send(err);
    res.json(todo);
  });
});
app.put('/updatetodo/:id', function(req, res){
  var query = {
    number:req.body.number,
    task:req.body.task
  };
  console.log(req.body.number);
  console.log(req.params.id);
  console.log(req.body.task);
  Todo.findOneAndUpdate({_id:req.params.id}, query, function(err, todo){
    if(err)
      res.send(err);
    res.json(todo);
  });
});
app.listen(3000,function(err,data){
  if(err) throw err;
  else{
    console.log("server running on 3000");
  }
});