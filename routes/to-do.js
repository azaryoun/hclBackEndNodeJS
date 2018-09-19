var express = require('express');

var ToDoList = require('./../models/to-do');
var router = express.Router();

router.get('/getManagementEntities', function (request, response) {

    var oDatum = null

    ToDoList.find({}, function (error, ToDos) {

        if (error) {

            console.log(error);
            console.log('db error');

            oMessage.message = error;
            response.status(500).send(oMessage);
            return;
        }

        oDatum = ToDos
    }).sort({ "id": -1 });


    var strServerMessage = "";
    var blnIsDone = true;

    response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });

});

router.get('/getEntitiy', function (request, response) {

    var oDatum = null
    var intId = request.query['id'];

    ToDoList.findOne({ id: intId }, function (error, ToDos) {

        if (error) {

            console.log(error);
            console.log('db error');

            oMessage.message = error;
            response.status(500).send(oMessage);
            return;
        }

        oDatum = ToDos
    });


    var strServerMessage = "";
    var blnIsDone = true;

    response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });

});
router.post('/insertEntity', function (request, response) {

    var oDatum = null

    var oToDo = new ToDoList()

    oToDo.task = request.body.task; //data can be sent using form elements or JSON
    oToDo.statusId = request.body.password;
    oToDo.priority = request.body.fullName;
    oToDo.dueDate = request.body.dueDate;
    oToDo.assigneeId = request.body.assigneeId;
    oToDo.notes = request.body.notes;

    oToDo.save(function (error) { // Asynch Save Operation
        if (error) {
            oMessage.message = error;
            response.status(500).send(oMessage);
            return;
        }
        oMessage.message = "Data for ToDo Inserted in MongoDB";
        response.json(oMessage);

    });

    var strServerMessage = "";
    var blnIsDone = true;

    response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });

});

router.put('/updateEntity', function (request, response) {

    var intId = request.query['id'];

    var oDatum = null

    var oToDo = new ToDoList()


    oToDo.task = request.body.task; //data can be sent using form elements or JSON
    oToDo.statusId = request.body.password;
    oToDo.priority = request.body.fullName;
    oToDo.dueDate = request.body.dueDate;
    oToDo.assigneeId = request.body.assigneeId;
    oToDo.notes = request.body.notes;

    oToDo.update({ id: intId }, function (error) { // Asynch Save Operation
        if (error) {
            oMessage.message = error;
            response.status(500).send(oMessage);
            return;
        }
        oMessage.message = "Data for ToDo Updated in MongoDB";
        response.json(oMessage);

    });

    var strServerMessage = "";
    var blnIsDone = true;

    response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });

});

router.delete('/deleteEntity', function (request, response) {

    var intId = request.query['id'];



    oToDo.deleteOne({ id: intId }, function (error) { // Asynch Save Operation
        if (error) {
            oMessage.message = error;
            response.status(500).send(oMessage);
            return;
        }
        oMessage.message = "Data for ToDo Deleted in MongoDB";
        response.json(oMessage);

    });

    var strServerMessage = "";
    var blnIsDone = true;

    response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });

});



module.exports = router;