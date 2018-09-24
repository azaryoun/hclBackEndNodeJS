var express = require('express');

var router = express.Router();

var Assignee = require('./../models/assignee');


router.get('/getLookUps', function (request, response) {

    var oDatum = [];


    Assignee.find({}, { id: 1, title: 1, _id: 0 }, function (error, assignees) {

        if (error) {

            response.status(500).send('db error');
            return;
        }

        oDatum = assignees;
        var strServerMessage = "";
        var blnIsDone = true;
        response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });

    });


});



module.exports = router;