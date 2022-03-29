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

    var swiper1 = new Swiper('.events-scroll-loopm', {
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        autoPlay: true,
        loop: true,
        noSwiping: true,

    });
    var swiper1 = new Swiper('.events-scroll-loopw', {
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        autoPlay: true,
        loop: true,
        noSwiping: true,

    });

    $(".events-banner-close").on('tap', function(){
        $(".header-fixed").removeAttr('style');
        if ($('.e-video-panal').hasClass('nav-fixed') == true){
            $('.e-video-panal').css({
                'top': $('.header-fixed').height()
            })
        }else{
            return fasle;
        }
    })

    //吸顶
	var windowTopHeaderLP = 0,
		flag = false;
    $(window).on('scroll.headerScrollLP', function () {
        var scrolls = $(this).scrollTop(),
            $navPanal = $('.e-video-panal'),
            $header = $('.header-fixed'),
            headerH = $header.outerHeight(true),
            videoPanal = $('.article-video').offset().top+50,
            articleWomanH = $('.article-woman').outerHeight(true),
            articleWoman = $('.article-woman').offset().top,
            headerBannerboxH = 0;
        if ($(".header-banner-box").hasClass('header-banner-show')){
            headerBannerboxH = $(".header-banner-box").outerHeight(true)
        }else{
            headerBannerboxH = 0;
        }

        if (scrolls > videoPanal && scrolls < articleWoman + articleWomanH) {
            $navPanal.addClass('top-btn-content-hei nav-fixed');
            if (scrolls >= windowTopHeaderLP) {
				windowTopHeaderLP = scrolls;
				if(!flag){
					$navPanal.animate({top:0},0)
					flag = true;
				}
            } else {
				windowTopHeaderLP = scrolls;
				if(flag){
					$navPanal.animate({top:(headerH + headerBannerboxH)},0)
					flag = false;
				}
            }
        }else{
			$navPanal.removeClass('top-btn-content-hei nav-fixed');
			setTimeout(function() {
				$navPanal.removeAttr('style');
			},10)
        }
    }).trigger('scroll.headerScrollLP');


    // 锚点
    $('.e-video-panal a').on('tap', function () {
        var _this = $(this),
            _thisData = _this.data('text'),
            $articleMap = $('.article-' + _thisData + '-kv'),
            articleMapOffsetTop = Math.floor($articleMap.offset().top);

        console.log('_thisData: ', _thisData, articleMapOffsetTop);

        $('html,body').animate({
            'scrollTop': (_thisData === 'woman') ? (articleMapOffsetTop - 100) : (articleMapOffsetTop - 100)
        })
    })


    if ($.spice.getWindowWidth() < 1024){
        $('.article-man-kv').removeClass('swiper-no-swiping')
        $('.article-woman-kv').removeClass('swiper-no-swiping')
    }

});
