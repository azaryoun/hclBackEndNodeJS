var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ToDoStatusType = new Schema({
    id: Number,
    title: String,
});

var ToDoStatusType = mongoose.model('todosatustype', ToDoStatusType);

module.exports = ToDoStatusType;
