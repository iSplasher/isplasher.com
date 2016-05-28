$(document).ready(function () {

	$(".progress span").each(function () {
		$(this)
			.data("progwidth", $(this).width())
			.width(0)
			.animate({
				width: $(this).data("progwidth")
			}, 1200);
	});

	function goToByScroll(id) {
        id = "#" + id.replace("scroll", "");
		// Scroll
        $(".content").animate({
            scrollTop: $(id).offset().top - 15
		},
            'slow');
    }

    $("button[id*='scroll']").click(function (e) {
		// Prevent a page reload when a link is pressed
        e.preventDefault();
		// Call the scroll function
        goToByScroll($(this).attr("id"));
    });

});