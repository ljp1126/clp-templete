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

    // 视频
    $('.e-lp-video-btn').on('tap', function (e) {
        e.preventDefault();
        var _this = $(this),
            videoCode = _this.data('videoCode');

        openVideo(videoCode, 'true');
    });
    // 视频 end

    //轮播
    var swiper1 = new Swiper('.swiper-container-kv', {
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        preventClicks: false,
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination',
        prevButton: '.swiper-button-prev2',
        nextButton: '.swiper-button-next2',
        initialSlide: 0,
        speed: 1000,
        autoplay: 3000,
        loop: true,
    });
    //轮播 end

    //吸顶
    $('.fix-box a').on('tap', function () {
        var _this = $(this),
            _thisData = _this.data('text'),
            $articleMap = $('.article-video-' + _thisData),
            articleMapOffsetTop = Math.floor($articleMap.offset().top),
            windowscroll = $(window).scrollTop(),
            differences = 0,
            headerBannerboxHs = 0;
        if ($(".header-banner-box").hasClass('header-banner-show')) {
            headerBannerboxHs = $(".header-banner-box").outerHeight(true);
        } else {
            headerBannerboxHs = 0;
        }
        if (windowscroll > articleMapOffsetTop) {
            differences = 100 + headerBannerboxHs;
            console.log('shang')
        } else {
            differences = 40;
        }
        if ($.spice.getWindowWidth() > 1024) {
            $('html,body').animate({
                'scrollTop': articleMapOffsetTop
            }, 600)
        } else {
            $('.header-banner-box').css({ 'opacity': '0' });
            $('.header-fixed').css({ 'opacity': '0' });
            $('html,body').animate({
                'scrollTop': articleMapOffsetTop - differences
            }, 100)
        }
    })
    //吸顶 end

    //滚动
    var windowTop = 0;
    $(window).on('scroll.worldCupScroll', function () {
        var $scrollTop = $(this).scrollTop(),
            headerBannerboxH = 0,
            $article = $('.article-fix'),
            $articleTop = $article.offset().top,
            articleHei = $('.article-fix').outerHeight(true),
            $header = $('.header-fixed'),
            headerH = $header.outerHeight(true),
            article08Hei = $('.article-foot').outerHeight(true),
            $article08Top = $('.article-foot'),
            article08Top = $article08Top.offset().top;

        if ($(".header-banner-box").hasClass('header-banner-show')) {
            headerBannerboxH = $(".header-banner-box").outerHeight(true);
        } else {
            headerBannerboxH = 0;
        }
        if ($scrollTop > $articleTop + articleHei && $scrollTop < article08Top + article08Hei - 150) {
            $('.fix-box').addClass('fix-box-fixed');
            if ($scrollTop >= windowTop) {
                windowTop = $scrollTop;
                $('.fix-box-fixed').animate({ top: 0 }, 0);
                if ($.spice.getWindowWidth() < 1024) {
                    setTimeout(function () {
                        $('.header-banner-box').css({ 'opacity': '1' });
                        $('.header-fixed').css({ 'opacity': '1' });
                    }, 100);
                }
            } else {
                windowTop = $scrollTop;
                $('.fix-box-fixed').animate({ top: (headerH + headerBannerboxH) }, 0)
                if ($.spice.getWindowWidth() < 1024) {
                    setTimeout(function () {
                        $('.header-banner-box').css({ 'opacity': '1' });
                        $('.header-fixed').css({ 'opacity': '1' });
                    }, 100);
                }
            }
        } else {
            $('.fix-box').removeClass('fix-box-fixed').removeAttr('style');
        }
    }).trigger('scroll.worldCupScroll');
    //滚动 end
});
