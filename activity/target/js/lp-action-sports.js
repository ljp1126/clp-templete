$(function() {
	// swiper轮播
	var mySwiper1 = new Swiper('.swiper-container1', {
		slidesPerView : 1.5,
		spaceBetween : 20,
		centeredSlides: true,
	    prevButton:'.swiper-button-prev1',
	    nextButton:'.swiper-button-next1',
	    initialSlide: 1,
	    onSlideChangeStart: function(swiper){
	    	$('.action-sports-swiper .swiper-button-prev').show();
	    	$('.action-sports-swiper .swiper-button-next').show();
	    	if(swiper.isBeginning){
	    		$('.action-sports-swiper .swiper-button-prev').hide();
	    	}
	    	if(swiper.isEnd){
	    		$('.action-sports-swiper .swiper-button-next').hide();
	    	}
	    	$('.article-sports .action-sports-swiper2:eq('+swiper.activeIndex+')').addClass('action-sports-swiper-show').siblings().removeClass('action-sports-swiper-show');
	    }
	});

	/*var mySwiper2 = new Swiper('.swiper-container2', {
	    prevButton:'.swiper-button-prev1',
	    nextButton:'.swiper-button-next1',
	    initialSlide: 1,
	    speed: 5000,
	    effect : 'fade',
		fade: {
		  crossFade: true
		}
	}); */

	var mySwiper3 = new Swiper('.swiper-container3', {
		slidesPerView : 1.5,
		spaceBetween : 20,
		centeredSlides: true,
	    prevButton:'.swiper-button-prev3',
	    nextButton:'.swiper-button-next3',
	    initialSlide: 1,
	    breakpoints: {
	    	1024: {
	    		slidesPerView: 1,
	    		spaceBetween : 0
	    	}
	    }
	});
	// 内嵌轮播
	$.spice.kvScroll('.events-scroll-loop2', {
			type: 'scroll-loop', 
			autoPlay: true,
			btn: false,
			loop: true,
			time: 3000,
			dot: {
				style: 'dot'
			}
		});
	
	// 滚动弹出
	var win_h, scroll_t, art3_ot, art4_ot_desc, art5_ot_con, act6_ot, act7_ot, act9_ot_con;
	$(window).on('scroll', function() {
		art3_ot = $('.events-swiper1-eject').offset().top;
		art4_ot_desc = $('.action-sports-kv-describe').offset().top;
		art5_ot_con = $('.action-sports-content').offset().top;
		act6_ot = $('.action-sports-swiper3').offset().top;
		act7_ot = $('.action-sports-show2').offset().top;
		act9_ot_con = $('.action-sports-bottom-content').offset().top;

		win_h = $(window).height();
		scroll_t = $(window).scrollTop();
		var ht_scroll = win_h + scroll_t;

		if(ht_scroll >= art3_ot) {
			$('.events-swiper1-eject').css({ 'transform': 'none', 'opacity': 1 });
		}
		if(ht_scroll >= art4_ot_desc) {
			$('.action-sports-kv-describe').css({ 'transform': 'none', 'opacity': 1 });
			$('.action-sports-kv-iner').css({ 'opacity': 1 });
		}
		if(ht_scroll >= art5_ot_con) {
			$('.action-sports-content').css({ 'transform': 'none', 'opacity': 1 });
		}
		if(ht_scroll >= act6_ot) {
			$('.action-sports-swiper3').css({ 'transform': 'none', 'opacity': 1 });
		}
		if(ht_scroll >= act7_ot) {
			$('.action-sports-show2 .light1').css({ 'opacity': 1 });
			$('.action-sports-show2 .light2').css({ 'opacity': 1 });
			$('.action-sports-show2 .light3').css({ 'opacity': 1 });
			$('.action-sports-show2 .light4').css({ 'opacity': 1 });
			$('.action-sports-show2 .light5').css({ 'opacity': 1 });
			$('.action-sports-show2 .light6').css({ 'opacity': 1 });
		}
		if(ht_scroll >= act9_ot_con) {
			$('.action-sports-bottom-content').css({ 'opacity': 1 });
		}
	})

	// 放大
	// 
	$('.events-scale img').on('mouseenter', function() {
		$(this).css({ 'transition': 'transform 7.5s linear', 'transform': 'scale(1.3)' });
		$(this).parent().parent().find('i').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(180deg)' })
	})

	// 复原
	// 
	$('.events-scale img').on('mouseleave', function() {
		$(this).css({ 'transition': 'none', 'transform': 'none'});
		$(this).parent().parent().find('i').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(-180deg)'});
	})
	
	// 遮罩
	// 
	$('.action-sports-skate').on('mouseenter', function() {
		$(this).find('.dia-wh').css({ 'opacity': .3 });
	})

	$('.action-sports-skate').on('mouseleave', function() {
		$(this).find('.dia-wh').css({ 'opacity': 0 });
	})

	$('.action-sports-show1 li').on('mouseenter', function() {
		$(this).find('.dia-wh').css({ 'opacity': .3 });
		$(this).find('img').css({ 'transition': 'transform 7.5s linear', 'transform': 'scale(1.3)' });
	})

	$('.action-sports-show1 li').on('mouseleave', function() {
		$(this).find('.dia-wh').css({ 'opacity': 0 });
		$(this).find('img').css({ 'transition': 'none', 'transform': 'none'});
	})
})