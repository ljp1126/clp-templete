$(function () {
    // 换图 + 懒加载
    $.spice.lazyLoad('img[lazysrc]', {
        attr: 'lazysrc'
    });
    $.spice.tools.changeImageSrc({
        callBack: function (img, self) {
            $.spice.lazyLoad('img[lazysrc]', {
                attr: self.opt.lazyData,
                prestrain: 1
            });
        }
    });

	// mobile header 滚动效果
    var windowTopHeaderLP = 0;
    $(window).on('scroll.headerScrollLP', function() {
        var scrolls = $(this).scrollTop(),
			$navPanal = $('.e-nav-panal'),
			navPanalFlagOffsetTop = Math.floor($navPanal.parents('.nav-panal').offset().top),
			navPanalH = $navPanal.outerHeight(true),
			$articleVideo = $('.article-video'),
			articleVideoOffsetTop = Math.floor($articleVideo.offset().top),
			$header = $('.header-fixed'),
			headerH = $header.outerHeight(true),
			moreRunningOffsetTop = Math.floor($('.article-more-running').offset().top),
			headerbannerH = $('.header-banner-box').outerHeight(true),
			headerBanner = $('.header-banner-box').hasClass('header-banner-show')

        if (scrolls >= windowTopHeaderLP) {
            windowTopHeaderLP = scrolls;
			if ((scrolls-1) >= (articleVideoOffsetTop - navPanalH)) {
				$navPanal.addClass('nav-fixed').css({
					'bottom': 'inherit',
					'top': 0
				})
			}
			if ((scrolls-1) >= moreRunningOffsetTop) {
				$navPanal.addClass('none')
			}


        } else {
			windowTopHeaderLP = scrolls;
			if (headerBanner === true) {
				headerH = $header.outerHeight(true) + headerbannerH;
			} else {
				headerH = $header.outerHeight(true)
			}
			$navPanal.addClass('nav-fixed').css({
				'bottom': 'inherit',
				'top': headerH
			})

			if ((scrolls-1) <= navPanalFlagOffsetTop) {
				$navPanal.removeClass('nav-fixed').css({
					'bottom': '0',
					'top': ''
				})
			}else{
				if ((scrolls-1) <= moreRunningOffsetTop) {
					$navPanal.removeClass('none')
				}
			}

        }
    }).trigger('scroll.headerScrollLP');
	// mobile header 滚动效果 end


    // 视频
    $('.e-lp-video-btn').on('tap', function (e) {
        e.preventDefault();
        var _this = $(this),
            videoCode = _this.data('videoCode');

        openVideo(videoCode, 'true');
    });
    // 视频 end


	// 锚点
	$('.e-nav-panal a').on('tap', function () {
		var _this = $(this),
			_thisData = _this.data('text'),
			$articleMap = $('.article-' + _thisData),
			articleMapOffsetTop =  Math.floor($articleMap.offset().top);

		console.log('_thisData: ', _thisData, articleMapOffsetTop);

		$('html,body').animate({
			'scrollTop': (_thisData === 'woman') ? (articleMapOffsetTop - 100) : (articleMapOffsetTop + 100)
		})
	})

});
