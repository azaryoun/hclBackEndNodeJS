var express = require('express');

var router = express.Router();
var ToDoStatusType = require('./../models/to-do-statue-type');


router.get('/getLookUps', function (request, response) {

    var oDatum = null

    ToDoStatusType.find({}, function (error, toDoStatusTypes) {

        if (error) {

            console.log(error);
            console.log('db error');

            oMessage.message = error;
            response.status(500).send(oMessage);
            return;
        }
        console.log(toDoStatusTypes);
        oDatum = toDoStatusTypes
    }).sort({ "id": 1 });


    var strServerMessage = "";
    var blnIsDone = true;


    response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });

});


module.exports = router;