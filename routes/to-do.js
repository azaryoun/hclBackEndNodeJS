var express = require('express');

var ToDoList = require('./../models/to-do');
var router = express.Router();
var Assignee = require('./../models/assignee');
var ToDoStatusType = require('./../models/to-do-statue-type');

router.get('/getManagementEntities', function (request, response) {

    var oDatum = null

    ToDoList.find({}, function (error, ToDos) {

        if (error) {
            response.status(500).send('db error');
            return;
        }

        oDatum = ToDos
        var strServerMessage = "";
        var blnIsDone = true;
        response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });

    });



});

router.get('/getEntity/:id', function (request, response) {

    var oDatum = null
    var intId = request.params.id;

    console.log(intId);

    ToDoList.findOne({ id: intId }, function (error, ToDo) {

        if (error) {

            response.status(500).send('db error');
            return;
        }
        ToDo.dueDate = ToDo.dueDateTitle;

        ToDoStatusType.findOne({ title: ToDo.statusTitle }, function (error, status) {

            ToDo.statusId = status.id;

            Assignee.findOne({ title: ToDo.assigneeTitle }, function (error, assignee) {

                ToDo.assigneeId = assignee.id;

                oDatum = ToDo

                var strServerMessage = "";
                var blnIsDone = true;
                response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });

            });




        });
    });



});

router.post('/insertEntity', function (request, response) {

    var oDatum = null

    var oToDo = new ToDoList()

    oToDo.task = request.body.task; //data can be sent using form elements or JSON
    oToDo.priority = request.body.priority;
    oToDo.dueDateTitle = request.body.dueDate;
    oToDo.notes = request.body.notes;
    Assignee.findOne({ id: request.body.assigneeId }, function (error, assignee) {

        oToDo.assigneeTitle = assignee.title;


        ToDoStatusType.findOne({ id: request.body.statusId }, function (error, status) {

            oToDo.statusTitle = status.title;

            ToDoList.findOne({}).sort({ id: -1 }).exec(function (error, lastTodo) {
                let intId = 1;
                if (lastTodo != null && lastTodo.id != undefined && lastTodo.id != null)
                    intId = lastTodo.id + 1;
                oToDo.id = intId;

                oToDo.save(function (error) { // Asynch Save Operation
                    if (error) {
                        response.status(500).send('db error');
                        return;
                    }
                    var strServerMessage = "";
                    var blnIsDone = true;

                    response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });



                });

            }
            );





        });




    });





});

router.put('/updateEntity/:id', function (request, response) {

    // todo: to be impletemented in next release; 
    var intId = request.params.id;

    var strServerMessage = "";
    var blnIsDone = true;
    var oDatum = null

    response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });


    //});


});

router.delete('/deleteEntity/:id', function (request, response) {


    var intId = request.params.id;


    ToDoList.remove({ id: intId }, function (error, res) { // Asynch remove Operation
        if (error) {
            response.status(500).send('db error');
            return;
        }
        var strServerMessage = "";
        var blnIsDone = true;
        var oDatum = null
        response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });


    });


});



module.exports = router;