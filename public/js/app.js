(function () {
	//Eliminiate the 300ms delay on click events on mobile browsers (Android/iOS)
	window.addEventListener('load', function() {
    FastClick.attach(document.body);
	}, false);

	//Connection to socket.io
	var socket = io.connect('http://' + window.location.host);
	var preview_path = "images/"
	
	//Init when Zepto.js is loaded
	Zepto(function($){

		//Cache DOM elements for better performance 
		var loader = $(".loading");
		var message = $(".message");
		var preview = $("preview");

		//Event emitters
		$(".tweet").on('click',function(){
			loader.toggle();
			socket.emit('tweet', { tweet: message.val() });	
		});
		$(".shoot").on('click', function(){
			loader.toggle();
			socket.emit('shoot');
		})

		//Triggers
		socket.on('preview', function (data) {
			preview.attr("src",preview_path+data.name);
			loader.toggle();
		});
		socket.on('done', function(data){
			loader.toggle();
			alert("Tweet Sent!");
			preview.attr("src","");
			message.val("");
		})

	})
})();