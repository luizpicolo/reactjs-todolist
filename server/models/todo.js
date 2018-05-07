var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/tododb');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  title: String,
  status: Boolean
});

var Todo = mongoose.model("Todos", TodoSchema);
module.exports = Todo;
