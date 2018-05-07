const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const Todo = require('./models/todo');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/todos', (req, res) => {
  Todo.find({}, function(err, todos) {
     res.send(JSON.stringify(todos));
  });
})

app.post('/todos', (req, res) => {
  var todo = req.body.todo;
  var data = new Todo(todo);
  data.save(function(err){
    if (!err) {
      res.send(data)
    } else {
      res.send(err)
    }
  });

})

app.put('/todos', (req, res) => {
  Todo.findByIdAndUpdate(
    req.body.todo.id,
    { $set: req.body.todo.attributes }, { new: true }, function(err, todo){
      if (!err) {
        res.send(todo)
      } else {
        res.send(err)
      }
  });
})

app.delete('/todos', (req, res) => {
  Todo.remove({ _id: req.body.id }, function(err) {
    if (!err) {
      res.send(req.body)
    } else {
      res.send(err)
    }
  });
})

app.listen(process.env.PORT || 8081)
