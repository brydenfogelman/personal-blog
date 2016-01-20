$(document).on('ready', function(){
	$(document).keyup(function(e) {
		if (e.keyCode == 27) window.history.back();   // esc
	});
});