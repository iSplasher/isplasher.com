$( document ).ready(function(){

$(".progress span").each(function() {
	$(this)
		.data("progwidth", $(this).width())
		.width(0)
		.animate({
			width: $(this).data("progwidth")
		}, 1200);
});
});