var path = require('path');
var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var NCMB = require("ncmb"),
    ncmb = new NCMB("655099e79b56b4ca5a1429d184acd69f480738197c9ad755b5658a6f8db0571a","071d9fc038d795a9895b96545df65f43fe4b32781181d45649b1f6d39c717555");

var app = express();

var upload = multer({ dest: 'uploads/' });
app.use(express.static(path.join(__dirname, 'public_html')));

app.get('/hoge', function (req, res) {
    
    var Coupon = ncmb.DataStore("coupon");
    Coupon.fetchAll()
        .then(function(results){
	    console.dir(results);
	    
	    for (var i = 0; i < results.length; i++) {
		var object = results[i];
		console.log(object.score + " - " + object.get("playerName"));
	    }
	    
	    res.send('Hello World!');
	})
        .catch(function(err){
	    console.log(err);
	});
    
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
