(function () {
	window.addEventListener('load', function() {
    FastClick.attach(document.body);
	}, false);
	var socket = io.connect('http://' + window.location.host);
	var preview_path = "images/"
	Zepto(function($){
		$(".tweet").on('click',function(){
			socket.emit('tweet', { tweet: $(".message").val() });	
		});
		$(".shoot").on('click', function(){
			socket.emit('shoot');	
		})
		socket.on('preview', function (data) {
			console.log(data.name);
			var preview = document.getElementsByClassName("preview")[0].src=preview_path+data.name;
		});
	})
})();