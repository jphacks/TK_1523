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

app.get('/test', function(req, res){
    ncmb.File.download("0e9033acd23ef5daa208b80db8ea332a.jpg")
        .then(function(fileData){
	    // ファイル取得後処理
	    console.log(fileData);
	    res.send("<img src='" + fileData + "'/>");
	})
        .catch(function(err){
	    // エラー処理
	    res.send(err);
	});
});


app.post('/upload', upload.single('avatar'), function (req, res, next) {
    
    var Coupon = ncmb.DataStore("coupon");
    var coupon = new Coupon();
    
    coupon.set("message", req.body.message)
	.set("imageName", req.file.filename)
	.save()
	.then(function(gameScore){
	    res.redirect('./mypage.html');
	    //res.send("success");
	})
	.catch(function(err){
	    // エラー処理
	    fs.unlink(req.file.path);
	    res.send("failed.");
	});
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
