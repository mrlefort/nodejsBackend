/**
 * Created by kaspe on 27-02-2017.
 */

var express = require('express');
var router = express.Router();
var fs = require("fs");


router.get("/certificate/load", function (req, res, next) {

    // res.send("john");
    var options =
        {
            root: __dirname + '/cert/'
        }

    console.log("i api");
    res.sendFile("CERT.cer", options, function (err) {
        if(err)
        {
            console.log("unable to send certificate!");
        }
        else
        {
            console.log("sent certificate!");
        }

    });


});

module.exports = router;