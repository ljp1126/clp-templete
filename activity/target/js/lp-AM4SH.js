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

    //点击tab 1
    $('.article-tab a').on('tap', function () {
        var _this = $(this),
            _thisData = _this.data('text'),
            articletabs = $('.article-ganged'),
            articletabTop = articletabs.offset().top,
            articletabHei = $('.article-tab').outerHeight(true);
        if (_thisData == '06'){
            return false;
        }
        $('.article-tab a').children('div:first-child').css({ 'display': 'block' });
        $('.article-tab a').children('div:last-child').css({ 'display': 'none' });
        _this.children('div:first-child').css({'display':'none'});
        _this.children('div:last-child').css({'display': 'block'});
        $('.ganged-' + _thisData).css('display', 'block').siblings().css('display', 'none');
        // console.log(articletabTop)
        $('html,body').animate({
            'scrollTop': articletabTop - articletabHei
        }, 600)
    })

    //点击tab 2
    $('.step-box-content a').on('tap', function () {
        var _this = $(this),
            _thisData = _this.data('text');
        $('.step-box-content a').children('div:first-child').css({ 'display': 'block' });
        $('.step-box-content a').children('div:last-child').css({ 'display': 'none' });
        _this.children('div:first-child').css({ 'display': 'none' });
        _this.children('div:last-child').css({ 'display': 'block' });
        $('.step-' + _thisData).css('display', 'block').siblings().css('display', 'none');
    })

    // 图片hover放大
    $('.ganged-detail-one div img,.ganged-detail-two div img,.ganged-detail-three div img').on('mouseenter', function () {
        $(this).css({ 'transition': 'transform 7.5s linear', 'transform': 'scale(1.3)' });
        $(this).parent().parent().find('i').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(180deg)' })
    });

    // 图片hover复原
    $('.ganged-detail-one div img,.ganged-detail-two div img,.ganged-detail-three div img').on('mouseleave', function () {
        $(this).css({ 'transition': 'none', 'transform': 'none' });
        $(this).parent().parent().find('i').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(-180deg)' });
    }); 


    $('.e-video-open').on('tap', function (e) {
        var _this = $(this),
            videoCode = _this.data('video-code'),
            $videoContent = _this.parents('.video-wrap').find('.video-content');

        // 请求视频源地址
        var bannerVideoId = "78DE5C3F52893B8C9C33DC5901307461";
        var url = base + "/indexCCVideo.json";
        var data = loxia.syncXhrGet(url, {
            'bannerVideoId': bannerVideoId
        });
        var videoUrl = data.mp4VideoUrl;
        // console.log(videoUrl)
        // var videoUrl = 'https://cm14-ccm1-2.play.bokecc.com/flvs/ca/QxEZr/ubD3sLfbMV-30.mp4?t=1534931109&key=FC3837929E3195269F9AE273E4948883';

        if ($videoContent.is(':empty')) {
            $videoContent.html('<video src="' + videoUrl + '" controls preload="meta"></video>').fadeIn();

            $('video', $videoContent)[0].addEventListener('canplaythrough', function () {
                console.log('视频准备就绪，开始播放');
                this.play()
            });

            $('video', $videoContent)[0].addEventListener('ended', function () {
                $videoContent.fadeOut();
            });
        } else {
            $videoContent.fadeIn();
            $('video', $videoContent)[0].play();
        }
    });

    //吸顶
    if ($.spice.getWindowWidth() > 1024) {
        var windowTop = 0;

        $(window).on('scroll.worldCupScroll', function () {
            var $scrollTop = $(this).scrollTop(),
                headerBannerboxH = 0,
                $article = $('.article-ganged'),
                $articleTop = $article.offset().top,
                articleHei = $('.article-tab').outerHeight(true),
                $header = $('.header-fixed'),
                headerH = $header.outerHeight(true),
                $article08Top = $('.ganged-detail-three'),
                article08Top = $article08Top.offset().top;

            if ($(".header-banner-box").hasClass('header-banner-show')) {
                headerBannerboxH = $(".header-banner-box").outerHeight(true);
            } else {
                headerBannerboxH = 0;
            }
            if ($scrollTop > $articleTop + articleHei && $scrollTop < article08Top) {
                $('.article-tab').addClass('article-fixed');
                if ($scrollTop >= windowTop) {
                    windowTop = $scrollTop;
                    $('.article-tab').animate({ top: 0 }, 0);
                } else {
                    windowTop = $scrollTop;
                    $('.article-tab').animate({ top: (headerH + headerBannerboxH) }, 0);
                }
            } else {
                $('.article-tab').removeClass('article-fixed').removeAttr('style');
            }
        }).trigger('scroll.worldCupScroll');
    }
});
