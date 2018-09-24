var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var assigneeSchema = new Schema({
    id: Number,
    title: String,
 
});

var Assignee = mongoose.model('assignee', assigneeSchema);

module.exports = Assignee;
