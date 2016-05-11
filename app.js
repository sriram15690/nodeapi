var express = require('express');
var app = express();
var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs')
var binPath = phantomjs.path
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname+'/assets/'));


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

app.listen(app.get('port'), function() {
  console.log('Example app listening on port '+app.get('port'));
});