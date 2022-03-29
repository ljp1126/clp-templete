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
    
    // 吸顶效果
    var windowTopHeaderLP = 0,
        navSwitchFlag = false;
    $(window).on('scroll.headerScrollLP', function () {
        var scrolls = $(this).scrollTop(),
            $navPanal = $('.e-nav-panal'),
            navPanalFlagOffsetTop = Math.floor($navPanal.parents('.nav-panal').offset().top),
            navPanalH = $navPanal.outerHeight(true),
            $articleVideo = $('.article-one'),
            articleVideoOffsetTop = Math.floor($articleVideo.offset().top),
            $header = $('.header-fixed'),
            headerH = $header.outerHeight(true),
            moreRunningOffsetTop = Math.floor($('.article-ten').offset().top),
            headerbannerH = $('.header-banner-box').outerHeight(true),
            headerBanner = $('.header-banner-box').hasClass('header-banner-show')

        if (scrolls >= windowTopHeaderLP) {
            windowTopHeaderLP = scrolls;
            if ((scrolls - 1) >= (articleVideoOffsetTop - navPanalH)) {
                $navPanal.addClass('nav-fixed').css({
                    'bottom': 'inherit',
                    'top': '0%'
                })
            }
            if ((scrolls - 1) >= moreRunningOffsetTop) {
                $navPanal.addClass('none')
            }


        } else {
            windowTopHeaderLP = scrolls;
            if (headerBanner === true){
                headerH = $header.outerHeight(true) + headerbannerH;
            }else{
                headerH = $header.outerHeight(true)   
            }
            $navPanal.addClass('nav-fixed').css({
                'bottom': 'inherit',
                'top': headerH
            })

            if ((scrolls - 1) <= navPanalFlagOffsetTop) {
                $navPanal.removeClass('nav-fixed').css({
                    'bottom': '5%',
                    'top': ''
                })
            } else {
                if ((scrolls - 1) <= moreRunningOffsetTop) {
                    $navPanal.removeClass('none')
                }
            }

        }
        if (!navSwitchFlag) {
            $.each(['.article-one', '.article-two', '.article-three', '.article-four', '.article-five', '.article-six', '.article-seven', '.article-eight', '.article-nine', '.article-ten'], function (index, el) {
                var elOffsetTop = Math.floor($(el).offset().top)
                if (scrolls >= elOffsetTop - navPanalH - 100) {
                    // $('.e-nav-panal .top-btn-content > a:eq(' + index + ')').children('span').addClass('block').siblings('a').children('span').removeClass('none')
                    $('.e-nav-panal .top-btn-content > a:eq(' + index + ')').siblings('a').children('span').addClass('none');
                    $('.e-nav-panal .top-btn-content > a:eq(' + index + ')').children('span').removeClass('none').addClass('blonk;');
                }
                // return false;
            })
        }
    }).trigger('scroll.headerScrollLP');

    // 视频
    $('.e-lp-video-btn').on('tap', function (e) {
        e.preventDefault();
        var _this = $(this),
            videoCode = _this.data('videoCode');

        openVideo(videoCode, 'true');
    });
    // 视频 end

    //锚点
    $('.e-nav-panal a').on('tap', function () {
        var _this = $(this),
            _thisData = _this.data('text'),
            $thisicon = _this.children('span'),
            $thisiconblonk = _this.siblings('a').children('span'),
            $articleMap = $('.article-' + _thisData),
            articleMapOffsetTop = Math.floor($articleMap.offset().top);
        console.log('_thisData: ', _thisData, articleMapOffsetTop);

        $thisiconblonk.addClass('none');
        $thisicon.removeClass('none').addClass('blonk');

        $('html,body').animate({
            // 'scrollTop': (_thisData === 'woman') ? (articleMapOffsetTop - 100) : (articleMapOffsetTop + 100)
            'scrollTop': (articleMapOffsetTop-100)
        })
    })

});
