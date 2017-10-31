var express = require('express');
var path = require('path');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

http.createServer(app).listen(process.env.PORT || 8001);
console.log(__dirname);
app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.get('/beer/:name', function(req, res){
	var resData;
	var url = 'http://api.brewerydb.com/v2/search?q='+req.params.name+'&type=beer&key=4664a9fdf84500cb936e914573258b6f';

	res.type('json');
	http.get(url, function(response){
		response.on('data', function(data){
			if(!resData){
				resData = data;
			}
			else{
				resData += data;
			}
		});
		response.on('end',function(){
			res.send(resData);
		});
	});
});