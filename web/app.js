var crypto = require('crypto');
var path = require('path');
var fs = require('fs');
var express = require('express');
var multer  = require('multer');

var NCMB = require("ncmb"),
    ncmb = new NCMB("655099e79b56b4ca5a1429d184acd69f480738197c9ad755b5658a6f8db0571a","071d9fc038d795a9895b96545df65f43fe4b32781181d45649b1f6d39c717555");

var app = express();

app.use(express.static(path.join(__dirname, 'public_html')));

var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
	crypto.pseudoRandomBytes(16, function (err, raw) {
	    if (err) return cb(err);

	    cb(null, raw.toString('hex') + path.extname(file.originalname));
	});
    }
});
var upload = multer({ storage: storage });


app.post('/upload', upload.single('avatar'), function (req, res, next) {
    console.log(req.body.message);
    console.log(req.file.path);

    fs.unlink(req.file.path);

    res.send("aaa").end();
    return;

    ncmb.File.upload(req.file.filename, req.file.path)
        .then(function(data){

	    var Coupon = ncmb.DataStore("coupon");
	    var coupon = new Coupon();

	    coupon.set("message", req.body.message)
	        .set("imageName", req.file.filename)
	        .save()
	        .then(function(gameScore){
	    
		    fs.unlink(req.file.path);
		    res.send("success");
		})
	        .catch(function(err){
		    // エラー処理
		    res.send("failed.");
		});
	})
        .catch(function(err){
	    fs.unlink(req.file.path);
	    res.send("failed");
	});
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});



//app.use(express.static(path.join(__dirname, 'public_html')));

//console.dir(multer);

//app.use(multer({ dest: 'uploads/' }));
// var limits = { fileSize: 10 * 1024 * 1024 };
// var storage = multer.diskStorage({});
// var upload = multer({ limits: limits, storage: storage });

// app.get('/hoge', function (req, res) {
//     res.send('Hello World!');
// });


// app.post('/upload', upload.single('photo'), function(req, res){
//     console.log(req.body);
//     console.log(req.files);
    
//     res.status(204).end();
// });

// app.post('/upload',  [ multer({ dest: './uploads/'}), function(req, res){
//     console.log(req.body); // form fields
//     console.log(req.files); // form files
    
//     res.send("hoge");
//     res.status(204).end();
// }]);


// var server = app.listen(3000, function () {
//     var host = server.address().address;
//     var port = server.address().port;

//     console.log('Example app listening at http://%s:%s', host, port);
// });
