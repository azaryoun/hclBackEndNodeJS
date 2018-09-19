var express = require('express');

var router = express.Router();

var Assignee = require('./../models/assignee');


router.get('/getLookUps', function (request, response) {

    var oDatum = null

    Assignee.find({}, function (error, assignees) {

        if (error) {

            console.log(error);
            console.log('db error');

            oMessage.message = error;
            response.status(500).send(oMessage);
            return;
        }
        oDatum = assignees
    }).sort({ "title": 1 });


    var strServerMessage = "";
    var blnIsDone = true;


    response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });

});



module.exports = router;