var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var toDoSchema = new Schema({
    id: Number,
    task: String,
    statusTitle: String,
    priority: String,
    dueDateTitle: String,
    assigneeTitle: String,
    notes: String,

});

var ToDo = mongoose.model('todo', toDoSchema);

module.exports = ToDo;
