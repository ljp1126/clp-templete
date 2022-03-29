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


    //吸顶 点击
    $('.fix-box-btn a').on('tap', function () {

        var _this = $(this),
            _thisData = _this.data('text'),
            $articleMap = $('.article-' + _thisData),
            articleMapOffsetTop = Math.floor($articleMap.offset().top),
            windowscroll = $(window).scrollTop(),
            differences = 0,
            $headers = $('.header-fixed'),
            headerHs = $headers.outerHeight(true);
        // $('.fixed-' + _thisData).css('display', 'block').siblings('article-04').css('display', 'none');
        if (windowscroll > articleMapOffsetTop) {
            differences = headerHs
        } else {
            differences = 0;
        }
        $('html,body').animate({
            'scrollTop': articleMapOffsetTop - differences
        }, 600);
    })
    //吸顶 点击  end

    //吸顶
    var windowTop = 0;
    $(window).on('scroll.worldCupScroll', function () {
        var $scrollTop = $(this).scrollTop(),
            headerBannerboxH = 0,
            $article = $('.article-fix'),
            $articleTop = $article.offset().top,
            articleHei = $('.article-fix').outerHeight(true),
            $header = $('.header-fixed'),
            headerH = $header.outerHeight(true),
            article08Hei = $('.article-btn-02').outerHeight(true),
            $article08Top = $('.article-btn-02'),
            article08Top = $article08Top.offset().top;

        if ($(".header-banner-box").hasClass('header-banner-show')) {
            headerBannerboxH = $(".header-banner-box").outerHeight(true);
        } else {
            headerBannerboxH = 0;
        }
        if ($scrollTop > $articleTop + articleHei && $scrollTop < article08Top + article08Hei) {
            $('.fix-box').addClass('fix-box-fixed');
            if ($scrollTop >= windowTop) {
                windowTop = $scrollTop;
                $('.fix-box').animate({ top: 0 }, 0);
            } else {
                windowTop = $scrollTop;
                $('.fix-box').animate({ top: (headerH + headerBannerboxH) }, 0);
            }
        } else {
            $('.fix-box').removeClass('fix-box-fixed').removeAttr('style');
        }

    }).trigger('scroll.worldCupScroll');
    //吸顶 end
});
