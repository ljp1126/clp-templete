$(function(){
	var swiperBanner = new Swiper('.swiper-container-banner', {
		slidesPerView: 'auto',
		centeredSlides: true,
		paginationClickable: true,
		autoplayDisableOnInteraction:false,
		initialSlide: 0,
		loop: true,
		prevButton:'.swiper-button-prev',
		nextButton:'.swiper-button-next'
	});

	var swiperKv = new Swiper('.swiper-container-kv', {
		slidesPerView: 'auto',
		centeredSlides: true,
		paginationClickable: true,
		autoplayDisableOnInteraction:false,
		initialSlide: 0,
		loop: true,
		prevButton:'.swiper-button-prev',
		nextButton:'.swiper-button-next'
	});



	var $window= $(window),
		$nav = $('.football-btn'),
		$header = $('.header-fixed');

	var arr = new Array();
	$(document).on('tap','.e-football-tap li',function(){
		var _index = $(this).index(),
			_activeIndex = $('.e-football-tap li.is-active').index();

		scrollTop();
		// 判断头部显示还是隐藏，给相应的top
		if(_index > _activeIndex){
			$("html, body").animate({
				scrollTop: arr[_index] - $nav.height()
			});
		}
		if(_index <= _activeIndex){
			$("html, body").animate({
				scrollTop: arr[_index] - $header.height() - $nav.height()
			});
		}
		$(this).addClass('is-active').siblings().removeClass('is-active');
		return false;
	})

	// 由于懒加载的原因，不断更新数组
	function scrollTop(){
		arr = [];
		$(".article-football").each(function () {
			var $height = $(this).height(),
				$position = $(this).position().top;
			arr.push($position);
		});
	}

	var windowTopHeaderCLPT = 0;
	$(window).bind("scroll", function (e) {
		var $scrollTop = $(this).scrollTop(),
			$positionTop = $('.football-btn').offset().top;

		$nav[$scrollTop > $positionTop  ? 'addClass' : 'removeClass']('football-fixed');

		scrollTop();

		var $scrollTopHeight = $scrollTop + $nav.height()+1;
		// 判断滚动方向
		if ($scrollTop >= windowTopHeaderCLPT) {
			windowTopHeaderCLPT = $scrollTop;
			$nav.find('.football-finx').css({
				top: ''
			})
			//console.log('1')
		} else {
			windowTopHeaderCLPT = $scrollTop;
			$nav[$scrollTop + $header.height() > $positionTop  ? 'addClass' : 'removeClass']('football-fixed');
			if($scrollTop + $header.height() > $positionTop){
				$nav.find('.football-finx').css({
					top: $header.height()+'px'
				})
			}else{
				$nav.find('.football-finx').css({
					top: ''
				})
			}
			$scrollTopHeight = $scrollTop + $nav.height() + $header.height()+1;
		}

		// 给对应的tap按钮加类名  想一下怎么简写 有的话告诉我
		if ($scrollTopHeight < parseInt(arr[1])) {
			$('.e-football-tap li').eq(0).addClass('is-active').siblings().removeClass('is-active');
		} else if ($scrollTopHeight > parseInt(arr[1]) && $scrollTopHeight < parseInt(arr[2])) {
			$('.e-football-tap li').eq(1).addClass('is-active').siblings().removeClass('is-active');
		} else if($scrollTopHeight > parseInt(arr[2]) && $scrollTopHeight < parseInt(arr[3])){
			$('.e-football-tap li').eq(2).addClass('is-active').siblings().removeClass('is-active');
		} else if ($scrollTopHeight > parseInt(arr[3]) && $scrollTopHeight < parseInt(arr[4])) {
			$('.e-football-tap li').eq(3).addClass('is-active').siblings().removeClass('is-active');
		} else if($scrollTopHeight > parseInt(arr[4]) && $scrollTopHeight < parseInt(arr[5])){
			$('.e-football-tap li').eq(4).addClass('is-active').siblings().removeClass('is-active');
		} else if($scrollTopHeight > parseInt(arr[5])){
			$('.e-football-tap li').eq(5).addClass('is-active').siblings().removeClass('is-active');
		}
	});
})
