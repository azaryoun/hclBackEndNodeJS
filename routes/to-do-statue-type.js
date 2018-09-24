var express = require('express');

var router = express.Router();
var ToDoStatusType = require('./../models/to-do-statue-type');


router.get('/getLookUps', function (request, response) {

    var oDatum = null

    ToDoStatusType.find({}, { id: 1, title: 1, _id: 0 }, function (error, toDoStatusTypes) {

        if (error) {

            response.status(500).send('db error');
            return;
        }

        oDatum = toDoStatusTypes;
        var strServerMessage = "";
        var blnIsDone = true;
        response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });

    });

  
});


module.exports = router;