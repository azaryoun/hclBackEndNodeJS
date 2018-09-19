var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var toDoSchema = new Schema({
    task: String,
    statusId: Number,
    priority: String,
    dueDate: Date,
    assigneeId: Number,
    notes: String,

});

var ToDo = mongoose.model('ToDo', toDoSchema);

module.exports = ToDo;
