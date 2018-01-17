/*
*       Rest Frame Work 

		!! Do not forget to restart after changes !!
*
*		portscanner  -- optional to check for open ports
*		express		 -- required core webservice
*		exec		 -- optional (non module) to execute command line arguments
*
*/


// var portscanner           = require('./node_modules/portscanner')
var express               = require("./node_modules/express");
var atob                  = require("atob")
var exec                  = require('child_process').exec;
var app                   = express();
var port                  = 80;
var base64Img             = require('base64-img');
var blobUtil              = require('blob-util')
var fs = require('fs')
var key = fs.readFileSync('../../../home/serv.rip.key');
var cert = fs.readFileSync( './2bc7bcec526d17fb.crt' );
var ca = fs.readFileSync( './gd_bundle-g2-g1.crt' );

var options = {
    key: key,
    cert: cert,
    ca: ca
  };
var https = require('https');
https.createServer(options, app).listen(443);

// Add headers
app.use(function (req, res, next) {
    // client[IP] you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Starts the rest service and listens on port 3000
app.listen(port, function () {
  // init 
  console.log('Restfull Service is listening on localhost: '+port+"!");
  console.log('-------------------------------------------------');

});

// arguments example
// http://localhost:3000/arguments?id=hello
app.get('/arguments', function (req, res) {
	console.log("got: ");
	console.log(req.query.id);
	res.send("returning posts makes for a happy browser");
});

function b64DecodeUnicode(str) {
    blobUtil.blobToBase64String(str).then(function (base64String) {
        // success
        return Buffer.from(base64String, 'base64').toString()        
    }).catch(function (err) {
        // error
    });
}
// function b64DecodeUnicode(str) {
//     // Going backwards: from bytestream, to percent-encoding, to original string.
//     return decodeURIComponent(atob(str).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
// }
// exec example
// http://localhost:3000/cmdline?img=test.jpeg
app.get('/cmdline', function (req, res) {
    if(req.query.img != undefined){
        var img = b64DecodeUnicode(req.query.img)
        var imageBuffer = new Buffer(img, 'base64');

        require("fs").writeFile("out.jpeg", imageBuffer, function(err) { 
            var args = " -v -XPOST -H  'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjM0MzgsImlhdCI6MTUxMTQ1NDM0NywiZXhwIjoxNTE5MjMwMzQ3fQ.k9kJEEK9BRjsmwJJJSkzSphcmndlkN3EYo6pzJwxvEo' -F 'image=@out.jpeg;type=image/jpeg' http://cl-api.vize.ai/3657";    
            exec('curl' + args, function(error, stdout, stderr) {
                res.send(stdout || stderr);
                console.log(stdout || stderr);
            });          
        });
         
    }else{
        res.send('got img: '+req.query.img +'   Expected an actual image');        
    }

});





