/*
                            // Board https://trello.com/b/euDRAmkS/tracking
                            Firebase Tracking Analysis Rest Interface
                            FTARI
*/ 
var fs    = require('fs')
var http  = require('http')
var https = require('https')
var express               = require("./node_modules/express");
var atob                  = require("atob")
var exec                  = require('child_process').exec;
var app                   = express();
var port                  = 80;
var base64Img             = require('base64-img');
var toBuffer              = require('blob-to-buffer')

const logUpdate      = require('log-update');
const serviceAccount = require("./config.json");
const express        = require("./node_modules/express");
const admin          = require("firebase-admin");
const app            = express();
const moment         = require("moment")

const restPort       = 3000;
const productName    = "Rest Server"
const productVers    = "0.2"

var key = fs.readFileSync('../../../home/serv.rip.key');
var cert = fs.readFileSync( './2bc7bcec526d17fb.crt' );
var ca = fs.readFileSync( './gd_bundle-g2-g1.crt' );
var serverStarted = false;

var options = {
  key: key,
  cert: cert,
  ca: ca
};


var https = require('https');
https.createServer(options, app).listen(443);

// arguments example
// http://localhost:3000/arguments?id=hello

app.get('/arguments', function (req, res) {
	console.log("-- Done --");
	res.send("returning posts makes for a happy browser");
});



function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

// http://localhost:3000/cmdline?img=test.jpeg
app.get('/cmdline', function (req, res) {
    if(req.query.img != undefined){
        req.read();
        
        var img = b64DecodeUnicode(req.query.img)
        // var buf = new Buffer(img).toString('base64')
        // console.log(buf);
        // console.log("---");
        // var bufferBase64 = new Buffer(img).toString('binary');
        // console.log(bufferBase64);
        // console.log("---");
        var img = img.split(",")

        require("fs").writeFile("out.jpeg", img[1],'base64', function(err) { 
            console.log("done converting img to jpeg");
                        var args = " -v -XPOST -H 'Authorization: Token 3009465c18f9a6b17743c73860d2b4b00ee1f0f9' -F 'image_base64=@out.jpeg;type=image/jpeg' -F 'task=e0234387-ef78-4db7-a4af-61410c33ea4a' https://api.vize.ai/v1/classify/"
            exec('curl' + args, function(error, stdout, stderr) {
                res.send(stdout || stderr);
                console.log(stdout || stderr);
            });     
        });


        // require("fs").writeFile("out.jpeg", img, function(err) { 

             
        // });
         
    }else{
        res.send('got img: '+req.query.img +'   Expected an actual image');        
    }

});
