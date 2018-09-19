
var express = require('express'); //Part of mEan framework
var app = express(); //Luanch ExpressJS
var morgan = require('morgan'); //Logger
var bodyParser = require('body-parser'); //Used for working with Posted data (form elements)
var config = require('./user_modules/config');
var server = require('http').createServer(app); //Create Server


app.use(function (request, response, next) {

    //Website you wish to allow to connect

    response.setHeader('Access-Control-Allow-Origin', '*');

    //Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    //Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'Accept,content-type,Authorization');
    response.setHeader('Access-Control-Allow-Credentials', true);

    //  Pass to next layer of middleware
    next();

});

var mongoose = require('mongoose'); // MongoDB Entity Framewrok or ORM
try {
    mongoose.connect(config.CONNECTION_STRING);
} catch (err) {
    console.log('DB Service is Off')
    return;
}

// Middlewares
app.use(morgan('dev')); //Logger
app.use(bodyParser.json());


const PATH_PREFIX = '/api/'

//Authetication middleware

app.all('*', function (request, response, next) {

    if (request.originalUrl == '/api/administration/Account/login') {
        next();
        return;
    }
    var strAutorizarion = request.headers['authorization'];

    if (strAutorizarion == null) {
        response.status(401).write('Unauhorized');
        console.log('Unauhorized');
        return;

    }
    response.setHeader('Authorization', strAutorizarion)
    console.log('Authorization');

    next(); //goto next app.all (middleware)

});


// the routes

var accountRoute = require('./routes/account');
app.use(PATH_PREFIX + '/administration/Account', accountRoute);

var toDoRoute = require('./routes/to-do');
app.use(PATH_PREFIX + '/administration/ToDo', toDoRoute);

var toDoStatusTypeRoute = require('./routes/to-do-statue-type');
app.use(PATH_PREFIX + '/lookUp/ToDoStatusType', toDoStatusTypeRoute);

var assigneeRoute = require('./routes/assignee');
app.use(PATH_PREFIX + '/lookUp/Assignee', assigneeRoute);




//Luanching NodeJS  Web Server 

const SERVER_PORT = 22511;

server.listen(SERVER_PORT, function () {

    var port = server.address().port;
    var host = server.address().address;

    console.log('Application Listening: http://%s:%s', host, port);

});

console.log('End of app.js');
