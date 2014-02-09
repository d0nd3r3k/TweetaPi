
/**
 * Module dependecies
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
var twitter_update_with_media = require('./twitter_update_with_media.js');
 
var tuwm = new twitter_update_with_media({
  consumer_key: 'APP_COSUMER_KEY',
  consumer_secret: 'APP_CONSUMER_SECRET',
  token: 'APP_TOKEN',
  token_secret: 'APP_TOKEN_SECRET'
});

//Socket Events
io.sockets.on('connection', function (socket) {

  socket.on('shoot', function (data) {
    var timestamp = Number(new Date()); 	
  	child = exec("raspistill -o "+image_dir+timestamp+".jpg -w 640 -h 480", function (error, stdout, stderr) {
  		socket.emit('preview', { name: timestamp+'.jpg' });
      image_path = image_dir+timestamp+".jpg";
        socket.on('tweet', function(data){
          tuwm.post(data.tweet, image_path, function(err, response) {
          if (err) {
            console.log(err);
          }
          socket.emit('done');
          });  
        })
      
      });
  	});
  
  });

server.listen(app.get('port'), function(){
  console.log('Express and Socket.io server listening on port ' + app.get('port'));
});
