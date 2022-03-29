$(function() {
	// 换图 + 懒加载
	$.spice.lazyLoad('img[lazysrc]', {
		attr: 'lazysrc'
	});
	$.spice.tools.changeImageSrc({
		callBack: function(img, self) {
			$.spice.lazyLoad('img[lazysrc]', {
				attr: self.opt.lazyData,
				prestrain: 1
			});
		}
	});


	// kv
	var kvSwiper = new Swiper('.e-swiper-adicolor-kv', {
		autoplay: 2000,
		speed: 600,
		autoplayDisableOnInteraction: false,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		onInit: function (swiper) {
			$(swiper.container).data('swiper', swiper)
		}
	});

	// 视频点击
	$('.e-lp-video-btn').on('tap', function(e) {
		e.preventDefault();
		var _this = $(this),
			videoCode =_this.data('videoCode');

		openVideo(videoCode, 'true');
	});

	var navSwitchFlag = false;
	// nav
	var navSwiper = new Swiper('.e-swiper-adicolor-nav', {
		// pagination : '.swiper-pagination',
		// centeredSlides: true,
		// autoplay: 2000,
		speed: 600,
		loop: true,
		slidesPerView: 'auto',
		paginationClickable: true,
		autoplayDisableOnInteraction: false,
		onInit: function (swiper) {
			$(swiper.container).data('swiper', swiper);

			var navSwitchTimer = null;
			// 点击选中效果
			$('.swiper-slide', swiper.container).on('tap', function(){
				navSwitchFlag = true;
				clearTimeout(navSwitchTimer);

				var _this = $(this),
					dataIndex = _this.data('swiperSlideIndex');
				$('.swiper-slide', swiper.container).removeClass('is-active');
				$('.swiper-slide[data-swiper-slide-index='+ dataIndex +']', swiper.container).addClass('is-active');

				// $('.swiper-pagination span:eq('+ (dataIndex) +')').trigger('click')

				// 屏幕滚动到相应的位置
				var articleOffsetTop = $('.article-product-box:eq('+ dataIndex +')').offset().top,
					headerH = $('.header-fixed').outerHeight(true),
					$adicolorNav = $('.article-adicolor-nav'),
					$navContent = $('.adicolor-nav-content', $adicolorNav),
					adicolorNavH = $navContent.outerHeight(true);

				$('html,body').animate({
					scrollTop: articleOffsetTop - headerH - adicolorNavH
				}, 500, function(){
					navSwitchTimer = setTimeout(function(){
						navSwitchFlag = false;
					}, 100);
				});

				return false;
			});
		}
	});


	$(window).on('scroll.adicolorNav', function() {
		var windowScrollTop = $(window).scrollTop(),
			headerH = $('.header-fixed').outerHeight(true),
			$adicolorNav = $('.article-adicolor-nav'),
			adicolorNavOffsetTop = $adicolorNav.offset().top,
			$navContent = $('.adicolor-nav-content', $adicolorNav),
			$articleClassification = $('.article-classification'),
			articleClassificationOffsetTop = $articleClassification.offset().top,
			$blankBox = $('.e-blank-box'),
			$navSwiperContainer = $('.e-swiper-adicolor-nav'),
			productBoxIndex;

		if (windowScrollTop >= adicolorNavOffsetTop) {
			$blankBox.css({
				height: $navContent.outerHeight(true),
			});

			$adicolorNav.addClass('nav-fixed');

			$navContent.css({
				top: headerH-1,
			});

			if (windowScrollTop + (window.innerWidth/2) >= articleClassificationOffsetTop) {
				$navContent.addClass('hidden')
			}else{
				$navContent.removeClass('hidden')
			}

		}else{
			$blankBox.css({
				height: 0,
			});

			$adicolorNav.removeClass('nav-fixed');

			$navContent.css({
				top: 0,
			});

			$('.swiper-slide', $navSwiperContainer).removeClass('is-active');
			navSwiper.slideTo(0, 0, false);
		}

		// 滚动页面，联动nav
		if(!navSwitchFlag){
			$('.article-product-box').each(function(index, el){
				if(windowScrollTop > $(el).offset().top - 80 - 250 - ($.spice.getWindowWidth() > 1024 ? 30 : 0)){
					productBoxIndex = $(el).index() - 4
					return productBoxIndex;
				}
			});
			
			$('.swiper-slide', $navSwiperContainer).removeClass('is-active');
			$('.swiper-slide[data-swiper-slide-index='+ productBoxIndex +']', $navSwiperContainer).addClass('is-active');

			navSwiper.slideTo(productBoxIndex, 600, false);
		}

		// 滚动页面，联动nav end


	}).trigger('scroll.adicolorNav');

});
