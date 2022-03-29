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

    //吸顶点击
    $('.box-clicks a').on('tap', function() {
        var _this = $(this),
            _thisData = _this.data('text'),
            $articleMap = $('.article-' + _thisData),
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
            // differences = 50 + 100 + headerBannerboxHs + 50 + 10
            differences = -headerBannerboxHs + 50 + 10 + headerBannerboxHs + 50
        } else {
            // differences = 50 + headerBannerboxHs + 50
            differences = -headerBannerboxHs + 50 - 10
        }
        $('html,body').animate({
            'scrollTop': articleMapOffsetTop - differences
        }, 600)
    })

    //滚动
    var windowTop = 0;
    $(window).on('scroll.worldCupScroll', function() {
        var $scrollTop = $(this).scrollTop(),
            headerBannerboxH = 0,
            $article = $('.article-box'),
            $articleTop = $article.offset().top,
            articleHei = $('.article-box').outerHeight(true),
            $header = $('.header-fixed'),
            headerH = $header.outerHeight(true),
            article01 = $('.article-01').offset().top + $('.article-01').outerHeight(true) - headerH - 50,
            article02 = $('.article-02').offset().top + $('.article-02').outerHeight(true) - headerH - 50,
            article03 = $('.article-03').offset().top + $('.article-03').outerHeight(true) - headerH - 50,
            article04 = $('.article-04').offset().top + $('.article-04').outerHeight(true) - headerH - 50,
            article05 = $('.article-05').offset().top + $('.article-05').outerHeight(true) - headerH - 50,
            article06 = $('.article-06').offset().top + $('.article-06').outerHeight(true) - headerH - 50,
            article07 = $('.article-07').offset().top + $('.article-07').outerHeight(true) - headerH - 50,
            article09 = $('.article-002').offset().top - headerH - 50;

        if ($(".header-banner-box").hasClass('header-banner-show')) {
            headerBannerboxH = $(".header-banner-box").outerHeight(true);
        } else {
            headerBannerboxH = 0;
        }
        if ($scrollTop > $articleTop) {
            if ($.spice.getWindowWidth() > 1024) {} else {}
            $('.box-clicks').addClass('article-fixed');
            if ($scrollTop >= windowTop) {
                windowTop = $scrollTop;
                $('.box-clicks').animate({
                    top: 0
                }, 0);
            } else {
                windowTop = $scrollTop;
                $('.box-clicks').animate({
                    top: (headerH + headerBannerboxH)
                }, 0)
            }
        } else {
            $('.box-clicks').removeClass('article-fixed').removeAttr('style');
        }
        if ($scrollTop < article09) {
        	$('.article-box .box-clicks a').siblings().removeClass('box-clicks-color');
        	$('.article-box .box-clicks .box-clicks-01').addClass('box-clicks-color');
        } else {
        	$('.article-box .box-clicks a').siblings().removeClass('box-clicks-color');
        	$('.article-box .box-clicks .box-clicks-02').addClass('box-clicks-color');
        }
        // if ($scrollTop < article01 && $scrollTop < article02) {
        //     $('.article-box .box-clicks a').siblings().removeClass('box-clicks-color');
        //     $('.article-box .box-clicks .box-clicks-01').addClass('box-clicks-color');
        // } else if ($scrollTop < article02 && $scrollTop < article03) {
        //     $('.article-box .box-clicks a').siblings().removeClass('box-clicks-color');
        //     $('.article-box .box-clicks .box-clicks-02').addClass('box-clicks-color');
        // } else if ($scrollTop < article03 && $scrollTop < article04) {
        //     $('.article-box .box-clicks a').siblings().removeClass('box-clicks-color');
        //     $('.article-box .box-clicks .box-clicks-03').addClass('box-clicks-color');
        // } else if ($scrollTop < article04 && $scrollTop < article05) {
        //     $('.article-box .box-clicks a').siblings().removeClass('box-clicks-color');
        //     $('.article-box .box-clicks .box-clicks-04').addClass('box-clicks-color');
        // } else if ($scrollTop < article05 && $scrollTop < article06) {
        //     $('.article-box .box-clicks a').siblings().removeClass('box-clicks-color');
        //     $('.article-box .box-clicks .box-clicks-05').addClass('box-clicks-color');
        // } else if ($scrollTop < article06 && $scrollTop < article07) {
        //     $('.article-box .box-clicks a').siblings().removeClass('box-clicks-color');
        //     $('.article-box .box-clicks .box-clicks-06').addClass('box-clicks-color');
        // } else {
        //     $('.article-box .box-clicks a').siblings().removeClass('box-clicks-color');
        //     $('.article-box .box-clicks .box-clicks-07').addClass('box-clicks-color');
        // }


    }).trigger('scroll.worldCupScroll');

    //
    var navSwitchFlag = false;
    if ($.spice.getWindowWidth() > 1024) {
        //     var navSwiper = new Swiper('.e-swiper-adicolor-nav', {
        //     speed: 600,
        //     loop: true,
        //     slidesPerView: 'auto',
        //     paginationClickable: true,
        //     autoplayDisableOnInteraction: false,
        //     onInit: function (swiper) {
        //         $(swiper.container).data('swiper', swiper);

        //         var navSwitchTimer = null;
        //         // 点击选中效果
        //         $('.swiper-slide', swiper.container).on('tap', function(){
        //             navSwitchFlag = true;
        //             clearTimeout(navSwitchTimer);

        //             var _this = $(this),
        //                 dataIndex = _this.data('swiperSlideIndex');
        //             $('.swiper-slide', swiper.container).removeClass('is-active');
        //             $('.swiper-slide[data-swiper-slide-index='+ dataIndex +']', swiper.container).addClass('is-active');

        //             // $('.swiper-pagination span:eq('+ (dataIndex) +')').trigger('click')

        //             // 屏幕滚动到相应的位置
        //             var articleOffsetTop = $('.article-product-box:eq('+ dataIndex +')').offset().top,
        //                 headerH = $('.header-fixed').outerHeight(true),
        //                 $adicolorNav = $('.article-adicolor-nav'),
        //                 $navContent = $('.adicolor-nav-content', $adicolorNav),
        //                 adicolorNavH = $navContent.outerHeight(true);

        //             $('html,body').animate({
        //                 scrollTop: articleOffsetTop - headerH - adicolorNavH
        //             }, 500, function(){
        //                 navSwitchTimer = setTimeout(function(){
        //                     navSwitchFlag = false;
        //                 }, 100);
        //             });

        //             return false;
        //         });
        //     }
        // });
        // var windowTop = 0;
        // $(window).on('scroll.adicolorNav', function() {
        //     var windowScrollTop = $(window).scrollTop(),
        //         headerH = $('.header-fixed').outerHeight(true),
        //         $adicolorNav = $('.article-adicolor-nav'),
        //         adicolorNavOffsetTop = $adicolorNav.offset().top,
        //         $navContent = $('.adicolor-nav-content', $adicolorNav),
        //         $articleClassification = $('.article-foot'),
        //         articleClassificationOffsetTop = $articleClassification.offset().top,
        //         $blankBox = $('.e-blank-box'),
        //         $navSwiperContainer = $('.e-swiper-adicolor-nav'),
        //         productBoxIndex,
        //         headerBannerboxH = 0;
        //         if ($(".header-banner-box").hasClass('header-banner-show')) {
        //         	headerBannerboxH = $(".header-banner-box").outerHeight(true);
        //         } else {
        //         	headerBannerboxH = 0;
        //         }
        //     if (windowScrollTop >= windowTop) {
        //         windowTop = windowScrollTop;
        //         $navContent.animate({
        //             top: 0
        //         }, 0);
        //     } else {
        //         windowTop = windowScrollTop;
        //         $navContent.animate({
        //             top: (headerH + headerBannerboxH)
        //         }, 0)
        //     }

        //     if (windowScrollTop >= adicolorNavOffsetTop) {
        //         $blankBox.css({
        //             height: $navContent.outerHeight(true),
        //         });

        //         $adicolorNav.addClass('nav-fixed');

        // $navContent.css({
        //     top: headerH - 1,
        // });
        //     if (windowScrollTop + (window.innerWidth / 2) >= articleClassificationOffsetTop + 150) {
        //     	$navContent.addClass('hidden')
        //     } else {
        //     	$navContent.removeClass('hidden')
        //     }

        // } else {
        //     $blankBox.css({
        //         height: 0,
        //     });

        //     $adicolorNav.removeClass('nav-fixed');

        // $navContent.css({
        //     top: 0,
        // });

        //     $('.swiper-slide', $navSwiperContainer).removeClass('is-active');
        //     navSwiper.slideTo(0, 0, false);
        //     $navContent.removeAttr('style');
        // }

        // 滚动页面，联动nav
        // if (!navSwitchFlag) {
        //     $('.article-product-box').each(function(index, el) {
        //         if (windowScrollTop > $(el).offset().top - 80 - headerBannerboxH - ($.spice.getWindowWidth() > 1024 ? 30 : 0)) {
        //             productBoxIndex = $(el).index() - 2
        //             return productBoxIndex;
        //         }
        //     });
        //     $('.swiper-slide', $navSwiperContainer).removeClass('is-active');
        //     $('.swiper-slide[data-swiper-slide-index=' + productBoxIndex + ']', $navSwiperContainer).addClass('is-active');

        //     navSwiper.slideTo(productBoxIndex, 600, false);
        // }

        // 滚动页面，联动nav end


        // }).trigger('scroll.adicolorNav');
    } else {
        var navSwiper = new Swiper('.e-swiper-adicolor-nav', {
            speed: 600,
            loop: true,
            slidesPerView: 'auto',
            paginationClickable: true,
            autoplayDisableOnInteraction: false,
            onInit: function(swiper) {
                $(swiper.container).data('swiper', swiper);

                var navSwitchTimer = null;
                // 点击选中效果
                $('.swiper-slide', swiper.container).on('tap', function() {
                    navSwitchFlag = true;
                    clearTimeout(navSwitchTimer);

                    var _this = $(this),
                        dataIndex = _this.data('swiperSlideIndex');
                    $('.swiper-slide', swiper.container).removeClass('is-active');
                    $('.swiper-slide[data-swiper-slide-index=' + dataIndex + ']', swiper.container).addClass('is-active');

                    // $('.swiper-pagination span:eq('+ (dataIndex) +')').trigger('click')

                    // 屏幕滚动到相应的位置
                    var articleOffsetTop = $('.article-product-box:eq(' + dataIndex + ')').offset().top,
                        headerH = $('.header-fixed').outerHeight(true),
                        $adicolorNav = $('.article-adicolor-nav'),
                        $navContent = $('.adicolor-nav-content', $adicolorNav),
                        adicolorNavH = $navContent.outerHeight(true);

                    $('html,body').animate({
                        scrollTop: articleOffsetTop - headerH - adicolorNavH
                    }, 500, function() {
                        navSwitchTimer = setTimeout(function() {
                            navSwitchFlag = false;
                        }, 100);
                    });

                    return false;
                });
            }
        });
        var windowTop = 0;
        $(window).on('scroll.adicolorNav', function() {
            var windowScrollTop = $(window).scrollTop(),
                headerH = $('.header-fixed').outerHeight(true),
                $adicolorNav = $('.article-adicolor-nav'),
                adicolorNavOffsetTop = $adicolorNav.offset().top,
                $navContent = $('.adicolor-nav-content', $adicolorNav),
                $articleClassification = $('.article-foot'),
                articleClassificationOffsetTop = $articleClassification.offset().top,
                $blankBox = $('.e-blank-box'),
                $navSwiperContainer = $('.e-swiper-adicolor-nav'),
                productBoxIndex,
                headerBannerboxH = 0;
            if ($(".header-banner-box").hasClass('header-banner-show')) {
                headerBannerboxH = $(".header-banner-box").outerHeight(true);
            } else {
                headerBannerboxH = 0;
            }
            if (windowScrollTop >= windowTop) {
                windowTop = windowScrollTop;
                $navContent.animate({
                    top: 0
                }, 0);
            } else {
                windowTop = windowScrollTop;
                $navContent.animate({
                    top: (headerH + headerBannerboxH)
                }, 0)
            }

            if (windowScrollTop >= adicolorNavOffsetTop) {
                $blankBox.css({
                    height: $navContent.outerHeight(true),
                });

                $adicolorNav.addClass('nav-fixed');

                // $navContent.css({
                //     top: headerH - 1,
                // });
                if (windowScrollTop + (window.innerWidth / 2) >= articleClassificationOffsetTop) {
                    $navContent.addClass('hidden')
                } else {
                    $navContent.removeClass('hidden')
                }

            } else {
                $blankBox.css({
                    height: 0,
                });

                $adicolorNav.removeClass('nav-fixed');

                // $navContent.css({
                //     top: 0,
                // });

                $('.swiper-slide', $navSwiperContainer).removeClass('is-active');
                navSwiper.slideTo(0, 0, false);
                $navContent.removeAttr('style');
            }

            // 滚动页面，联动nav
            if (!navSwitchFlag) {
                $('.article-product-box').each(function(index, el) {
                    if (windowScrollTop > $(el).offset().top - 80 - ($.spice.getWindowWidth() > 1024 ? 30 : 0)) {
                        productBoxIndex = $(el).index() - 3
                        return productBoxIndex;
                    }
                });
                $('.swiper-slide', $navSwiperContainer).removeClass('is-active');
                $('.swiper-slide[data-swiper-slide-index=' + productBoxIndex + ']', $navSwiperContainer).addClass('is-active');

                navSwiper.slideTo(productBoxIndex, 600, false);
            }

            // 滚动页面，联动nav end


        }).trigger('scroll.adicolorNav');
    }

});