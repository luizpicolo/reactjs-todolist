var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/tododb');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  title: String
});

var Todo = mongoose.model("Post", TodoSchema);
module.exports = Todo;
