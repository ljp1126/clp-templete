$(function() {
	// 锚点定位
	var winW = $(window).width();
	if (winW <= 1024) {
		$(".catalog-content .catalog-item a").on('tap', function(event) {
			event.preventDefault();
			var date = $(this).attr("date");
			var headerH = $('.header').height();
			var top = $(".clause-info[date='" + date + "']").offset().top - headerH - 444;
			$(this).parents(".catalog-content").stop().slideToggle();
			$(this).parents(".catalog-box").find('.catalog-arrow').removeClass("catalog-arrow-up");
			$("html,body").animate({
				scrollTop: top
			}, 400);
			$(".catalog-body").css({
				marginTop: "84px"
			});
		});

		// site-map 定位
		$(".site-top-list .site-list-items a").on("tap", function (event) {
			event.preventDefault();
			var date = $(this).attr("date");
			var top = $(".site-section[date='" + date + "']").offset().top - 80;
			$("html,body").animate({
				scrollTop: top
			}, 400);
		});

		// 折叠
		$(".event-toggle-catalog").on("tap", function(event) {
			event.preventDefault();
			if ($(this).next('.catalog-content').is(':hidden')) {
				$(this).children('.catalog-arrow').addClass("catalog-arrow-up");
				$(this).next('.catalog-content').stop().slideDown();
				$(".catalog-box").removeAttr("style");
				$(".catalog-body").css({
					marginTop: "454px"
				});
			} else {
				$(this).next(".catalog-content").stop().slideUp();
				$(this).children('.catalog-arrow').removeClass("catalog-arrow-up");
				$(".catalog-box").css({
					position: "fixed",
					left: "20px",
					top: "60px",
					width: "100%"
				});
				$(".catalog-body").css({
					marginTop: "84px"
				});
			}
		});
	} else {
		return false;
	}

});
