var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ToDoStatusType = new Schema({
    id: Number,
    title: 'string'
 });

var ToDoStatusType = mongoose.model('ToDoStatusType', ToDoStatusType);

module.exports = ToDoStatusType;
