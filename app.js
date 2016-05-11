var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname+'/assets/'));
var childProcess = require('child_process');
var phantomjs = require('phantomjs')
var binPath = phantomjs.path

app.get('/', function (req, res) {
   res.sendFile(__dirname+'/assets/templates/index.html');
});

app.get('/dbsrate', function (req, res) {
	var childArgs = [path.join(__dirname, 'phantom_get_dbs_rate.js')];
	console.log(binPath);
 
	childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
		console.log("stdout");
		console.log(stdout);
	   res.send(stdout);
	});

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});