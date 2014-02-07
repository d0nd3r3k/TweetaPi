
/*
 * GET home page.
 */
var sys = require('sys');
var exec = require('child_process').exec;
var child;

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
  child = exec("raspistill -o test.jpg", function (error, stdout, stderr) {
 	sys.print('stdout: ' + stdout);
  	sys.print('stderr: ' + stderr);
  	if (error !== null) {
   		console.log('exec error: ' + error);
  	}
});
};
