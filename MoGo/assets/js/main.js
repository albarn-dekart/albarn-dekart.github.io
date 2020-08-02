$(function () {

	var introH = $(".intro").innerHeight(),
		header = $(".header"),
		scrollOffset = $(window).scrollTop();

	// Fixed Header
	checkScroll(scrollOffset);

	$(window).on("scroll", function () {
		scrollOffset = $(this).scrollTop();

		checkScroll(scrollOffset);
	});

	function checkScroll(scrollOffset) {

		if (scrollOffset >= introH) {
			header.addClass("fixed");
		}
		else {
			header.removeClass("fixed");
		}
	}

	// Smooth Scroll
	$("[data-scroll]").on("click", function (event) {
		event.preventDefault();

		var $this = $(this),
			blockId = $(this).data("scroll"),
			blockOffset = $(blockId).offset().top;

		$(".nav a").removeClass("active");
		$this.addClass("active");

		$("html, body").animate({
			scrollTop: blockOffset
		}, 500);

		$(".nav").removeClass("active");
		$(".nav-button").removeClass("active");
	});

	// Burger
	$(".nav-button").on("click", function (event) {
		event.preventDefault();
		$(".nav").toggleClass("active");
		$(this).toggleClass("active");
	})

	// Accrdion
	$(".accordion-header").on("click", function (event) {
		event.preventDefault();
		$(this).parent(".accordion-item").children(".accordion-content").slideToggle();
		$(this).parent(".accordion-item").toggleClass("active");
	})
})