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
	
	
	// charts
	
var ctx = document.getElementById("radarskills");
        Chart.defaults.global.maintainAspectRatio = false;
        Chart.defaults.global.title.display = false;
        Chart.defaults.global.legend.display = false;
var radarskills = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ["Piano", "Drawing", "Programming", "3D Modeling"],
        datasets: [{
            label: 'Skills',
            data: [20, 35, 80, 5],
            backgroundColor: "rgba(0, 97, 167, 0.2)",
            borderColor: "rgba(0, 97, 167, 0.5)",
            pointBackgroundColor: "rgba(0, 97, 167, 0.5)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(rgba(0, 97, 167, 0.5))",
        }]
    },
    options: {
            scale: {
                gridLines: {
                    lineWidth: 1,
                    color: "rgba(0, 0, 0, 0.1)",
                    drawOnChartArea:false,
                    drawTicks: true,
                },
                ticks: {
                reverse: true,
                max: 100,
                maxTicksLimit: 20,
                showLabelBackdrop: false,
                beginAtZero: true,
                display: false,
            },
            scaleLabel: {
                display: true,
            },
            pointLabels: {
        fontFamily: "Quicksand",
        fontStyle: "normal",
        fontSize: 16,
        fontColor: "#666",
    },
            },
        }
});
	
	var ctx = document.getElementById("radarlang");
var radarskills = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ["HTML", "Javascript", "C++", "CSS", "Python", "Java"],
        datasets: [{
            label: 'Skills',
            data: [95, 25, 75, 90, 85, 10],
            backgroundColor: "rgba(0, 97, 167, 0.2)",
            borderColor: "rgba(0, 97, 167, 0.5)",
            pointBackgroundColor: "rgba(0, 97, 167, 0.5)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(rgba(0, 97, 167, 0.5))",
        }]
    },
    options: {
            scale: {
                gridLines: {
                    lineWidth: 1,
                    color: "rgba(0, 0, 0, 0.1)",
                    drawOnChartArea:false,
                    drawTicks: true,
                },
                ticks: {
                reverse: true,
                max: 100,
                maxTicksLimit: 20,
                showLabelBackdrop: false,
                beginAtZero: true,
                display: false,
            },
            scaleLabel: {
                display: true,
            },
            pointLabels: {
        fontFamily: "Quicksand",
        fontStyle: "normal",
        fontSize: 16,
        fontColor: "#666",
    },
            },
        }
});

});