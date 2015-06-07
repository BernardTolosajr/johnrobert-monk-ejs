var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    db = require('monk')('localhost/fenix-todo');

var todos = db.get('todos');

app.use(bodyParser.urlencoded({
  extended: true
}));

//setup ejs
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/todos', function(req, res) {
  var todo = req.body.todo;
  todos.insert({ content: todo}, function(err, doc) {
    todos.find({},function (err, todos) {
      res.render('todo', {todos: todos});
    });
  });
});

app.get('/todos', function(req, res) {
  todos.find({},function (err, todos) {
    res.render('todo', {todos: todos});
  });
});

app.listen(8080);
console.log('8080 is the magic port');
