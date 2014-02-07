(function () {
	var socket = io.connect('http://' + window.location.host);
	var preview_path = "images/"
	socket.emit('shoot', { tweet: 'Lorem Ipssum Dolor' });
	socket.on('preview', function (data) {
		console.log(data.name);
		var preview = document.getElementsByClassName("preview")[0].src=preview_path+data.name;
	});
})();