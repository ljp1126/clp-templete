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

    // 视频
        $('.e-lp-video-btn').on('tap', function(e) {
            e.preventDefault();
            var _this = $(this),
                videoCode =_this.data('videoCode');

            openVideo(videoCode, 'true');
        });
    // 视频 end

	// mobile header 滚动效果
	var windowTopHeaderLP = 0;
	$(window).on('scroll.headerScrollLP', function() {
		var scrolls = $(this).scrollTop(),
			$shhmNav = $('.e-shhm-nav-box'),
			shhmNavFlagOffsetTop = Math.floor($shhmNav.parents('.article-shhm-nav').offset().top),
			shhmNavH = $shhmNav.outerHeight(true),
			$header = $('.header-fixed'),
			headerH = $header.outerHeight(true),
			footerOffsetTop = Math.floor($('.footer').offset().top);

		if (scrolls >= windowTopHeaderLP) {
			windowTopHeaderLP = scrolls;
			if ((scrolls-1) >= shhmNavH) {
				$shhmNav.addClass('nav-fixed').css({
					'top': 0
				})
				$('.article-shhm-nav').css({
					'height': $shhmNav.outerHeight(true)
				})
			}
			if ((scrolls-1) >= footerOffsetTop - window.innerHeight) {
				$shhmNav.addClass('none')
			}



		} else {
			windowTopHeaderLP = scrolls;
			$shhmNav.addClass('nav-fixed').css({
				'top': headerH
			})

			if ((scrolls-1) <= shhmNavFlagOffsetTop) {
				$shhmNav.removeClass('nav-fixed').css({
					'top': ''
				})
				$('.article-shhm-nav').css({
					'height': ''
				})
			}else{
				if ((scrolls-1) <= footerOffsetTop - window.innerHeight) {
					$shhmNav.removeClass('none')
				}
			}

		}
	}).trigger('scroll.headerScrollLP');
	// mobile header 滚动效果 end

	// 锚点
	$('.e-shhm-nav-box a').on('tap', function () {
		var _this = $(this),
			_thisData = _this.data('text'),
			$articleMap = $('.article-' + _thisData),
			articleMapOffsetTop =  Math.floor($articleMap.find('.pro-list-tit').offset().top),
			$shhmNavBox = _this.parents('.shhm-nav-box');

		// console.log('_thisData: ', _thisData, articleMapOffsetTop, articleMapOffsetTop - $shhmNavBox.outerHeight(true));
		_this.addClass('is-active').siblings().removeClass('is-active');
		$('html,body').animate({
			'scrollTop': articleMapOffsetTop - $shhmNavBox.outerHeight(true)
		})
	})

});
