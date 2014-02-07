
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var sys = require('sys');
var exec = require('child_process').exec;
var child;
var image_dir=path.join(__dirname, 'public/images/')

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
io.set('log level', 1);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Routing
app.get('/', function (req, res) {
  res.render('index', { title: 'PiCam' });
});

//Twitter API
var Twitter = require('node-twitter');

var twitterRestClient = new Twitter.RestClient(
    'kt5owDkV89MmMnnWYUegA',
    'UAYCYuHiQx6fKrNQ6ajgzsU6MOPdJa8HckKWRGEaE',
    '54840439-Nh8q4bNADyItt6wpbq6JnnBmS2Sb5D1ngh6Mf1hyN',
    'a6EBsjUjWpfWjZS3wxCEjgIBNGQEVJMgPYgOBZWhAyMhc'
);

//Socket Events
io.sockets.on('connection', function (socket) {
  socket.on('shoot', function (data) {
    var timestamp = Number(new Date()); 	
  	child = exec("raspistill -o "+image_dir+timestamp+".jpg -w 640 -h 480", function (error, stdout, stderr) {
  		socket.emit('preview', { name: timestamp+'.jpg' });
      twitterRestClient.statusesUpdateWithMedia({
            'status': 'Posting a tweet w/ attached media from RaspiCam @conversionpoint',
            'media[]': image_dir+timestamp+".jpg"
        },function(error, result) {});
      });
  	});
  });

server.listen(app.get('port'), function(){
  console.log('Express and Socket.io server listening on port ' + app.get('port'));
});
