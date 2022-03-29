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

    //吸顶
    $('.article-02-fix a').on('tap', function () {
       
        var _this = $(this),
            _thisData = _this.data('text'),
            $articleMap = $('.fixed-' + _thisData),
            articleMapOffsetTop = Math.floor($articleMap.offset().top),
            windowscroll = $(window).scrollTop(),
            differences = 0;
        $('.fixed-' + _thisData).css('display', 'block').siblings('article-04').css('display', 'none');
        if (windowscroll > articleMapOffsetTop){
            differences = 100 + 50
        }else{
            differences = 0;
        }
        if ($.spice.getWindowWidth() > 1024) {
            $('html,body').animate({
                'scrollTop': articleMapOffsetTop - differences
            }, 600)
        }else{
            $('.header-banner-box').css({ 'opacity': '0' });
            $('.header-fixed').css({ 'opacity': '0' });
            $('html,body').animate({
                'scrollTop': articleMapOffsetTop - differences
            }, 100)
        }
    })
    //吸顶 end

    //滚动
    var windowTop = 0,
        flag = false;
    $(window).on('scroll.worldCupScroll', function () {
        var $scrollTop = $(this).scrollTop(),
            headerBannerboxH = 0,
            $article = $('.article-02'),
            $articleTop = $article.offset().top,
            articleHei = $('.article-02').outerHeight(true),
            $header = $('.header-fixed'),
            headerH = $header.outerHeight(true),
            article08Hei = $('.article-08').outerHeight(true),
            $article08Top = $('.article-08'),
            article08Top = $article08Top.offset().top;

        if ($(".header-banner-box").hasClass('header-banner-show')) {
            headerBannerboxH = $(".header-banner-box").outerHeight(true);
        } else {
            headerBannerboxH = 0;
        }
        if ($scrollTop > $articleTop + articleHei && $scrollTop < article08Top + article08Hei - 150) {
            $('.article-02-fix').addClass('article-fixed');
            if ($scrollTop >= windowTop) {
                windowTop = $scrollTop;
                if (!flag) {
                    $('.article-02-fix').animate({ top: 0}, 0);
                    flag = true;
                }
                if ($.spice.getWindowWidth() < 1024) {
                    setTimeout(function () {
                        $('.header-banner-box').css({ 'opacity': '1' });
                        $('.header-fixed').css({ 'opacity': '1' });
                    }, 100);
                }
            } else {
                windowTop = $scrollTop;
                if (flag) {
                    $('.article-02-fix').animate({ top: (headerH + headerBannerboxH)},0)
                    flag = false;
                }
                if ($.spice.getWindowWidth() < 1024) {
                    setTimeout(function () {
                        $('.header-banner-box').css({ 'opacity': '1' });
                        $('.header-fixed').css({ 'opacity': '1' });
                    }, 100);
                }
            }
        } else {
            $('.article-02-fix').removeClass('article-fixed').removeAttr('style');
        }
        
    }).trigger('scroll.worldCupScroll');
});
