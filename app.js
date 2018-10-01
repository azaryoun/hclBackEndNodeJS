
var express = require('express'); //Part of mEan framework
var app = express(); // Luanch ExpressJS
var morgan = require('morgan'); //Logger
var bodyParser = require('body-parser'); // Used for working with Posted data (form elements)
var server = require('http').createServer(app); //Create Server

require('dotenv').config(); // loading envinronmet variables from .env file (if exists)


app.use(function (request, response, next) {

    //Website you wish to allow to connect

    response.setHeader('Access-Control-Allow-Origin', '*');

    //Request methods you wish to allow

    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    //Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization,authorization');

    next();

});



var mongoose = require('mongoose'); // MongoDB Entity Framewrok or ORM
try {
  
    const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/local';

    mongoose.connect(CONNECTION_STRING);
} catch (err) {
    console.log('DB Service is Off')
    return;
}

// Middlewares
app.use(morgan('dev')); //Logger
app.use(bodyParser.json());


const PATH_PREFIX = '/api/'

//Authetication middleware

app.use(function (request, response, next) {
    if (request.originalUrl == '/api/administration/Account/login' || request.method == 'OPTIONS') {
        return next();
    }
    if (!request.headers.authorization) {
        return response.status(401).json({ error: 'No credentials sent!' });
    }
    var strAutorizarion = request.headers.authorization;
    response.setHeader('authorization', strAutorizarion)
    next();
});


// the routes

var accountRoute = require('./routes/account');
app.use(PATH_PREFIX + 'administration/Account', accountRoute);

var toDoRoute = require('./routes/to-do');
app.use(PATH_PREFIX + 'administration/ToDo', toDoRoute);

var toDoStatusTypeRoute = require('./routes/to-do-status-type');
app.use(PATH_PREFIX + 'lookUp/ToDoStatusType', toDoStatusTypeRoute);

var assigneeRoute = require('./routes/assignee');
app.use(PATH_PREFIX + 'lookUp/Assignee', assigneeRoute);


//Luanching NodeJS  Web Server 

const SERVER_PORT = process.env.port || 22511;

server.listen(SERVER_PORT, function () {

    var port = server.address().port;
    var host = server.address().address;

    console.log('Application Listening: http://%s:%s', host, port);

});

console.log('End of app.js');
