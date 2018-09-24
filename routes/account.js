var express = require('express');
var bcrypt = require('bcrypt-nodejs');

var router = express.Router();


router.post('/login', function (request, response) {

    // Check username and password in database!
    var strMobileNo = request.body.mobileNo;
    var strPassword = request.body.password;

    var strServerMessage = "";
    var oDatum = null;
    var blnIsDone = true;

    if (strMobileNo == '09122764983' && strPassword == '1') {
        var oPayload = {
            userId: 1,
        };

        var strPayload = JSON.stringify(oPayload);

        var strPayloadHashed = bcrypt.hashSync(strPayload);

        var oJasonWebToke={
            payLoad:strPayloadHashed
        }
        oDatum = oJasonWebToke;
    }
    else {
        strServerMessage = 'Invalid username or password';
        blnIsDone = false;
    }

    response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });
    return;
});



router.get('/getUserProfile', function (request, response) {


    var strServerMessage = "";
    var oDatum = {
        firstName: 'keiwan',
        lastName: 'azaryoun',
        mobileNo: '09122764983',
        email: 'k.azaryoun@gmail.com',
    };
    var blnIsDone = true;


    response.json({ isDone: blnIsDone, serverMessage: strServerMessage, datum: oDatum });

});



module.exports = router;