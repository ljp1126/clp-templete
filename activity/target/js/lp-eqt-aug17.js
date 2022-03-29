$(function() {
	// swiper8个轮播
	var arr = [];
	var mySwiper1 = new Swiper('.events-swiper1-eject', {
		loop: true,
		slidesPerView : 1,
		spaceBetween : 0,
		// 监视器，动态更新banner
		observer: true,
		observeParents: true,

		centeredSlides: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		onSlideChangeEnd: function(swiper){
			var realIndex = swiper.realIndex;
			$('.change-module > div').eq(realIndex).show().siblings().hide();
			var setSwiper = $('.change-module > div:visible .swiper-container2');
			if( !setSwiper.data('swiper') ){
				mySwiper2(setSwiper);
			}

			$('.swiper-container2').each( function(index, element){
				if( $(element).data('swiper') && $('.swiper-slide-active',element).data('swiper-slide-index') != 0 ){
	 				$(element).data('swiper').slideTo(1,0)
	 			}
			})
		}
	});
	// 8个轮播下面对于的3图轮播
	function mySwiper2(diss){
		var swiper2 = new Swiper(diss , {
			loop: true,
			slidesPerView : 1,
			// 监视器，动态更新banner
			observer: true,
			observeParents: true,
			pagination:'.swiper-pagination',
			paginationClickable:true,
			initialSlide: 0
		});
		diss.data('swiper',swiper2);
	}


	// 底部最后个轮播
	var mySwiper1 = new Swiper('.events-swiper2-eject', {
		loop: true,
		slidesPerView : 1,
		spaceBetween : 0,
		// 监视器，动态更新banner
		observer: true,
		observeParents: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev'
	});


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

	// 視頻播放
	$('.e-video-open').on('tap', function(e) {
		e.preventDefault();
        openVideo('CB33444B7A8902789C33DC5901307461','true');
    });
})