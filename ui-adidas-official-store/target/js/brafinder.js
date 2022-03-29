$(function() {
	var _w = $.spice.getWindowWidth(),
		_h = $(window).height();

	$.spice.kvScroll('.events-scroll-series-item', {
		type: 'scroll-loop',
		autoPlay: false,
		loop: true,
		dot: {
			style: 'dot'
		}
	});

	$('.scroll-container').on('touchstart touchmove touchend', function() {
		if (_w < 768) {
			event.stopPropagation();
		}
	});

	// 展开 收缩
	$('.brafinder-introduce dl dt').on('tap', function() {
		var _this = $(this),
			_nextDd = _this.next('dd'),
			_childIcon = $(this).find('.icon');
		if (_nextDd.is(":visible")) {
			_nextDd.slideUp(200);
			_childIcon.removeClass('icon-arrow-up').addClass('icon-arrow-right');
		} else {
			_this.parent().find('dd').slideUp(200);
			_this.parent().find('.icon').removeClass('icon-arrow-up').addClass('icon-arrow-right');
			_nextDd.slideDown(200);
			_childIcon.removeClass('icon-arrow-right').addClass('icon-arrow-up');
		}
	});
	$('.brafinder-style-detail dt').on('tap', function() {
		var _this = $(this),
			_nextDd = _this.next('dd'),
			_childIcon = $(this).find('.icon');
		if (_w < 991) {
			return false;
		}
		if (_nextDd.is(":visible")) {
			_nextDd.slideUp(200);
			_childIcon.removeClass('icon-white-up').addClass('icon-white-down');
		} else {
			_nextDd.slideDown(200);
			_childIcon.removeClass('icon-white-down').addClass('icon-white-up');
		}
	});

	// 点击滚动
	$('.brafinder-style .brafinder-series-list li').on('tap', function() {
		var _this = $(this),
			_thisIndex = _this.index(),
			_listIndex = _this.closest('.brafinder-series-list').index('.brafinder-series-list'),
			_scorll = $('.brafinder-style-detail dd').eq(_listIndex).find('.article-series-item').eq(_thisIndex),
			_dtHeight = $('.brafinder-style-detail dd').eq(_listIndex).prev('dt').height();
		// 防止_scorll已被隐藏
		if (_scorll.is(":visible")) {
			$('html, body').animate({
				scrollTop: _scorll.offset().top - $('.header-fixed').height() - _dtHeight
			}, 500);
		}
	});

	/*mobile 图片正反面切换*/
	$('.switch-view').on('tap', function() {
		var $this = $(this);
		if ($this.hasClass('front')) {
			$this.removeClass('front').addClass('back');
			$this.siblings('a').find('.front').hide().siblings('.back').stop().fadeIn();
		} else {
			$this.removeClass('back').addClass('front');
			$this.siblings('a').find('.back').hide().siblings('.front').stop().fadeIn();
		}
	});


	//size 悬浮
	if (_w > 1024) {
		setTimeout(function() {
			$('.size-guide-box').removeClass('size-guide-fixed').show();
		}, 1500);
	}
	$(window).scroll(function() {
		var sizeOffsetT = $('.brafinder-main').offset().top,
			headerH = $('.header-fixed').height(),
			wH = $(window).scrollTop();
		if (_w > 1024) {
			$('.size-guide-box')[wH > sizeOffsetT - headerH - 57 ? 'addClass' : 'removeClass']('size-guide-fixed');
		} else {
			$('.size-guide-box')[wH > sizeOffsetT - headerH + 57 ? 'addClass' : 'removeClass']('size-guide-fixed');
			$('.brafinder-style')[wH > sizeOffsetT - headerH + 57 ? 'addClass' : 'removeClass']('brafinder-style-top');
		}
	}).scroll();

	/*弹层相关效果*/
	$('.events-size-guid').on('tap', function() {
		$('.size-dialog').fadeIn();
		if (_w < 768) {
			$('.size-dialog').height(_h - 60);
			$('html,body').css({
				'overflow': 'hidden',
				'position': 'fixed',
				'height': '100' + '%'
			});
		}
	}).trigger('tap');

	$('.size-dialog .dialog-close').on('tap', function() {
		$('.size-dialog').fadeOut();
		$('html,body').removeAttr('style');
	});
	$('.size-tabs-title li').on('tap', function() {
		var $thisIndex = $(this).index();
		$(this).addClass('is-active').siblings().removeClass('is-active');
		$('.size-tabs-content .size-description:eq(' + $thisIndex + ')').addClass('is-active').siblings().removeClass('is-active');
	});
	$('.size-selector-box .value-btn').on('tap', function() {
		var _this = $(this),
			$selectorBox = _this.parents('.size-selector-box'),
			$swiperObj = $('.events-size-selector', $selectorBox);

		$('.size-selector').removeAttr('style');
		$(this).siblings('.size-selector').show().animate({
			width: '285px'
		}, 200, function() {
			sizeCarousel($swiperObj, 3, 3);
		});
	});
	$('.size-selector .swiper-slide').on('tap', function() {
		var $this = $(this);
		$this.parents('.size-selector').animate({
			width: '0'
		}, 300, function() {
			$(this).hide();
		});
		$this.parents('.size-selector').siblings('.value-btn').find('span').html($this.html());


		var $parentText = $this.parents('.size-select-content'),
			textArr = [];
		$('.size-selector-box:not(.e-size-selector-m)', $parentText).each(function(index, el) {
			textArr.push($('.value-btn span', el).text())
		});
		console.log('您选择的上胸围' + textArr[0] + '厘米' + "下胸围" + textArr[1] + '厘米');
		
		if (textArr[0] !== '请选择' && textArr[1] !== '请选择') {
			$this.parents('.size-description').find('.btn-calculation').removeClass('is-disabled');
		} else {
			$this.parents('.size-description').find('.btn-calculation').addClass('is-disabled');
		}
		
		$(".animation-inner span").html('您的选择   上胸围: ' + textArr[0] + 'cm' + "   下胸围: " + textArr[1] + 'cm')
		
	});


	// mobile 选择尺码
	// $('select', '.e-size-selector-m').each(function(index, el) {
	// 	$(el)[0].selectedIndex = $('option', el).length + 1;
	// });
	$('select', '.e-size-selector-m').on('change', function() {
		var $this = $(this),
			optionValue = $('option:selected', this).attr('value'),
			optionDataVal = $('option:selected', this).attr('data-val');
		$('.dropdown-text', $(this).siblings('.btn')).html(optionValue);

		var $parentText = $this.parents('.size-select-content'),
			textArr = [];
		$('.e-size-selector-m', $parentText).each(function(index, el) {
			textArr.push($('.btn .dropdown-text', el).text())
		});
		if (textArr[0] !== '请选择' && textArr[1] !== '请选择') {
			$this.parents('.size-description').find('.btn-calculation').removeClass('is-disabled');
		} else {
			$this.parents('.size-description').find('.btn-calculation').addClass('is-disabled');
		}
		$(".animation-inner span").html('您的选择   上胸围: ' + textArr[0] + 'cm' + "   下胸围: " + textArr[1] + 'cm').css("font-size","12px")
	})

	// 测量演示弹层
	$('.e-measure-btn').on('tap', function() {
		$('.measurement-demonstration-dialog').fadeIn();
		$('.measurement-demonstration-dialog').height(_h - 60);
		$('html,body').css({
			'overflow': 'hidden',
			'position': 'fixed',
			'height': '100' + '%'
		});
	});
	$('.measurement-demonstration-dialog .e-measurement-demonstration-back').on('tap', function() {
		$('.measurement-demonstration-dialog').fadeOut();
	});



	// 推算尺码
	$('.e-size-estimation').on('tap', function() {
		var _this = $(this);
		if (!_this.hasClass('is-disabled')) {

			// 显示尺码
			$('.recommended-size-title').removeClass('none');
			$('.brafinder-series-list .series-desc').addClass('recommended-size');
			$(".brafinder-style-detail").addClass('show-size');
			$('.size-dialog').fadeOut();
			$('html,body').removeAttr('style');
		}
	});



})

function sizeCarousel(obj, pcShowNum, mobShowNum) {
	var $resGallery = $('.events-guess-you-Iike', obj);
	if (!$resGallery.data('swiper')) {
		new Swiper($resGallery, {
			slidesPerGroup: pcShowNum,
			slidesPerView: "auto",
			centeredSlides: false,
			paginationClickable: true,
			spaceBetween: 0,
			grabCursor: false,
			pagination: '.swiper-pagination',
			prevButton: '.swiper-button-prev',
			nextButton: '.swiper-button-next',
			speed: 300,
			breakpoints: {
				1024: {
					slidesPerGroup: mobShowNum,
					speed: 300
				}
			},
			onInit: function(swiper) {
				$(swiper.container).data('swiper', swiper)
			}
		});
	}
}
