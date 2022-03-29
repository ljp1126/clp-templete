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

    //轮播
    var swiper1 = new Swiper('.swiper-container-kv', {
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        autoPlay: true,
        loop: true,
        noSwiping: true,
        speed: 2000,
        autoplay: 2000,
        autoplayDisableOnInteraction: false

    });
    var swiper2 = new Swiper('.swiper-container-kv-02', {
        prevButton: '.swiper-button-prev1',
        nextButton: '.swiper-button-next1',
        autoPlay: true,
        loop: true,
        noSwiping: true,
        speed: 2000,
        autoplay: 2000,
        autoplayDisableOnInteraction: false

    });

    //吸顶点击
    $('.article-fixed-size a').on('tap', function() {
        var _this = $(this),
            _thisData = _this.data('text'),
            $articleMap = $('.article-' + _thisData),
            articleMapOffsetTop = Math.floor($articleMap.offset().top),
            windowscroll = $(window).scrollTop(),
            differences = 0,
            $headers = $('.header-fixed'),
            headerHs = $headers.outerHeight(true);
        if ($(".header-banner-box").hasClass('header-banner-show')) {
            headerBannerboxHs = $(".header-banner-box").outerHeight(true);
        } else {
            headerBannerboxHs = 0;
        }
        if (windowscroll > articleMapOffsetTop) {
            differences = headerBannerboxHs + headerHs + 50 
        } else {
            differences = 50
        }
        $('html,body').animate({
            'scrollTop': articleMapOffsetTop - differences
        }, 600)
    })

    //滚动
    var windowTop = 0;
    $(window).on('scroll.worldCupScrollCLPcli', function() {
        var $scrollTop = $(this).scrollTop(),
            headerBannerboxH = 0,
            $article = $('.article-fixed'),
            $articleTop = $article.offset().top,
            articleHei = $('.article-fixed').outerHeight(true),
            $header = $('.header-fixed'),
            headerH = $header.outerHeight(true),
            $articlewoman = $('.article-woman'),
            articlewomanTop = $articlewoman.offset().top;
        if ($(".header-banner-box").hasClass('header-banner-show')) {
            headerBannerboxH = $(".header-banner-box").outerHeight(true);
        } else {
            headerBannerboxH = 0;
        }
        if ($scrollTop > $articleTop + articleHei) {
            $('.article-fixed-size').addClass('article-fixed-size-fix');
            if ($scrollTop >= windowTop) {
                windowTop = $scrollTop;
                $('.article-fixed-size').animate({
                    top: 0
                }, 0);
            } else {
                windowTop = $scrollTop;
                $('.article-fixed-size').animate({
                    top: (headerH + headerBannerboxH)
                }, 0)
            }
        } else {
            $('.article-fixed-size').removeClass('article-fixed-size-fix').removeAttr('style');
        }
        if ($scrollTop > articlewomanTop - 60) {
        	$('.article-fixed-size a').siblings().removeClass('active');
        	$('.article-fixed-size .article-fixed-size-02').addClass('active');
        } else {
        	$('.article-fixed-size a').siblings().removeClass('active');
        	$('.article-fixed-size .article-fixed-size-01').addClass('active');
        }

    }).trigger('scroll.worldCupScrollCLPcli');

});
