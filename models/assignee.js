var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var assigneeSchema = new Schema({
    id: Number,
    title: 'string',
 
});

var Assignee = mongoose.model('Assignee', assigneeSchema);

module.exports = Assignee;
