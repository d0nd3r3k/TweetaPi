(function () {
	window.addEventListener('load', function() {
    FastClick.attach(document.body);
	}, false);
	var socket = io.connect('http://' + window.location.host);
	var preview_path = "images/"
	Zepto(function($){
		$(".tweet").on('click',function(){
			$(".loading").toggle();
			socket.emit('tweet', { tweet: $(".message").val() });	
		});
		$(".shoot").on('click', function(){
			$(".loading").toggle();
			socket.emit('shoot');
		})
		socket.on('preview', function (data) {
			var preview = document.getElementsByClassName("preview")[0].src=preview_path+data.name;
			$(".loading").toggle();
		});
		socket.on('done', function(data){
			$(".loading").toggle();
			alert("Tweet Sent!");
			var preview = document.getElementsByClassName("preview")[0].src="";
			$(".message").val("");
		})
	})
})();