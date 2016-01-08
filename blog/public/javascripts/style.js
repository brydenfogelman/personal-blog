$(document).on('ready', function(){
	$( ".comment-form" ).hide();

	$( ".show-comment" ).click(function() {
        $( ".comment-form" ).toggle();
    });
});